<!DOCTYPE html>
<html>
	<head>
		<title></title>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/default.js"></script>
		<script type="text/javascript" src="js/marked.min.js"></script>

		<script>
			// Vanilla JS here
		</script>

		<link rel="stylesheet" type="text/css" media="screen" href="css/default.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/markdown.css" />
	</head>
<body>
	<div>
		<h2>Markdown Scratchpad</h2>

		<span id="input_button" class="button">Input</span>
		<span id="preview_button" class="button">Preview</span>
		<span id="save_icon" class="icon hidden">&#128190;</span>

		<textarea class="input" placeholder="Input"></textarea>
		<div class="preview markdown-body" placeholder=""></div>
	</div>

	<select>
		<?php foreach (get_recent() as $i) {
			print "\t\t<option>$i</option>\n";
		}
		?>
	</select>
</body>
</html>

<?php

function get_recent() {
	$arr = ["Aug 12th", "Aug 13th", "Aug 14th"];

	return $arr;
}
