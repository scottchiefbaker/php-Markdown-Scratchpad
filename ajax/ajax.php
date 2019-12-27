<?php

require("Parsedown.php");
require("db_query.class.php");

$config  = @parse_ini_file("config.ini");
if ($config === false) {
	error_out("Unable to load configuration file: config.ini\n\nCopy config.ini.sample to config.ini and try again");
}

$db_file = $config['db_path'];
if (!is_readable($db_file)) {
	error_out("Unable to read database: $db_file\n\nDatabase may need to be created. Refer to installation instructions");
}

if (!is_writable($db_file)) {
	error_out("Unable to write to $db_file.\n\nDatabase updates will not work");
}

$dir = dirname($db_file);
if (!is_writable($dir)) {
	error_out("Unable to write to $dir.\n\nDatabase updates will not work");
}

///////////////////////////////////////////////////////////

$dsn = "sqlite://$db_file";
$dbq = new DBQuery($dsn);

$input     = trim($_GET['input'] ?? "");
$action    = $_GET['action'];
$threshold = $_GET['threshold']  ?? $config['write_threshold'] ?? 3600; // One hour

///////////////////////////////////////////////////////////

$p    = new Parsedown();
$html = $p->text($input);

// Save "current"
$saved = save_text($input, -1);
$saved = !!$saved;

$x = get_last_x(1);

$last_str  = $x[0]['MarkdownStr'];
$last_time = intval($x[0]['MarkdownTime']);
$time      = time();

if ($action === "get_most_recent") {
	$ret = get_most_recent();
	$ret['html'] = $p->text($ret['MarkdownStr']);

	json_output($ret);
}

$diff     = $time - $last_time;
$is_new   = ($last_str !== $input);
$archived = false;

// If enough time has passed we archive the entry
if ($is_new && ($diff > $threshold) && strlen(trim($input)) > 0) {
	$ok = save_text($input, $time);

	$archived = !!$ok;
}

$ret['html']     = $html;
$ret['saved']    = $saved;
$ret['archived'] = $archived;

json_output($ret);

function save_text($str, $time) {
	global $dbq;

	if (!$str) {
		return null;
	}

	if ($time == -1) {
		$x        = get_most_recent();
		$cur_text = $x['MarkdownStr'];
		if ($str === $cur_text) {
			return false;
		}

		$sql = "UPDATE MarkdownHistory SET MarkdownStr = ? WHERE MarkdownTime = -1;";
		$ok  = $dbq->query($sql, [$str]);

		return $ok;
	}

	$sql = "INSERT INTO MarkdownHistory (MarkdownStr, MarkdownTime) VALUES (?,?);";
	$id  = $dbq->query($sql, [$str, $time]);

	return intval($id);
}

function get_last_x(int $num) {
	global $dbq;

	$sql = "SELECT * FROM MarkdownHistory WHERE MarkdownTime > 0 ORDER BY MarkdownTime DESC LIMIT ?;";

	$ret = $dbq->query($sql, [$num]);

	return $ret;
}

function get_most_recent() {
	global $dbq;

	$sql = "SELECT * FROM MarkdownHistory WHERE MarkdownTime = -1;";
	$ret = $dbq->query($sql, "one_row");

	return $ret;
}

// Convert a PHP data structure to JSON and optionally send it to the browser
function json_output($hash,$return = 0) {
	$output = json_encode($hash);

	if ($return) {
		return $output;
	} else {
		header('Content-type: application/json'); // http://tools.ietf.org/html/rfc4627
		print $output;
		exit;
	}
}

function error_out($str) {
	$x = [
		'error_count'   => 1,
		'error_message' => $str,
	];

	json_output($x);
}
