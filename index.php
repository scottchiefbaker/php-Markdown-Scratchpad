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
		<!-- https://unicode-table.com/en/1F517/ -->
		<h2><span class="format_table pointer" title="Align table data in input">M</span>arkdown Scratchpad <a class="external_link" title="Markdown cheatsheet" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">&#128279;</a></h2>

		<span id="input_button" class="button tab tab-inactive">Input</span>
		<span id="preview_button" class="button tab tab-inactive">Preview</span>
		<span id="save_icon" class="icon hidden">&#128190;</span>

		<textarea class="input" placeholder="Input"></textarea>
		<div class="preview markdown-body" placeholder=""></div>
	</div>

	<div class="slider_wrapper">
		<div id="date_str" class="bold">Now</div>
		<input type="range" min="-51" max="0" value="0" id="datepick" />
	</div>
</body>
</html>
