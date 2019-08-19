<?php

require("Parsedown.php");
require("db_query.class.php");

$dsn = "sqlite:///home/bakers/database/markdown-scratchpad.sqlite";
$dbq = new DBQuery($dsn);

$input     = trim($_GET['input'] ?? "");
$threshold = $_GET['threshold']  ?? 60 * 10;
$action    = $_GET['action'];

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

		$sql = "DELETE FROM MarkdownHistory WHERE MarkdownTime = -1;";
		$ok  = $dbq->query($sql);
	}

	$sql = "INSERT INTO MarkdownHistory (MarkdownStr, MarkdownTime) VALUES (?,?);";
	$id  = $dbq->query($sql, [$str, $time]);

	return $id;
}

function get_last_x(int $num) {
	global $dbq;

	$sql = "SELECT * FROM MarkdownHistory ORDER BY MarkdownTime DESC LIMIT ?;";

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
