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

	<div class="slider_wrapper">
		<div id="date_str" class="bold">Now</div>
		<input type="range" min="-51" max="0" value="0" id="datepick" />
	</div>
</body>
</html>
