$(document).ready(function() {
	init_buttons();
	init_slider();
	init_format_table();

	load_most_recent();
});

function init_format_table() {
	$(".format_table").on("click", function() {
		markdown_table_cleanup(".input");
	});
}

function set_clickable(elem, clickable) {
	if (clickable) {
		$(elem).css("cursor", "pointer");
		$(elem).removeClass("tab-inactive").addClass("tab-active");
	} else {
		$(elem).css("cursor", "not-allowed");
		$(elem).removeClass("tab-active").addClass("tab-inactive");
	}
}

function load_most_recent() {
	var url = "ajax/ajax.php";
	var opts = {
		data: {
			action: 'get_most_recent',
		},
		success: function(x) {
			if (x.error_message) {
				$("#datepick").prop('disabled', true);

				set_clickable($("#input_button"), false);
				set_clickable($("#preview_button"), false);

				$("#input_button").off("click");
				$("#preview_button").off("click");

				var msg = "Error: " + x.error_message;
				alert(msg);
			} else {
				var mh = marked(x.MarkdownStr);
				$(".preview").html(mh);

				$(".input").val(x.MarkdownStr);

				$(".input").hide();
				$(".preview").show();

				set_clickable($("#input_button"), true);
				set_clickable($("#preview_button"), false);
			}
		},
	};

	$.ajax(url, opts);
}

function init_buttons() {
	$("#preview_button").on("click", function() {
		var input = $(".input").val();
		var time  = parseInt(new Date().getTime() / 1000);

		var preview_visible = $(".preview:hidden").length == 1;
		if (!preview_visible) {
			return false;
		}

		var url = "ajax/ajax.php";
		var opts = {
			data: {
				input: input,
				unixtime: time,
			},
			success: function(x) {
				console.log(x);
				if (x.saved) {
					$("#save_icon").removeClass("hidden").show();
					$("#save_icon").fadeOut(400);
				}

				var mh = marked(input);
				$(".preview").html(mh);

				show_preview();
			},
		};

		$.ajax(url, opts);
	});

	$("#input_button").on("click", function() {
		show_input();
	});
}

function show_input() {
	set_clickable($("#input_button"), false);
	set_clickable($("#preview_button"), true);

	$(".input").show();
	$(".preview").hide();
}

function show_preview() {
	set_clickable($("#input_button"), true);
	set_clickable($("#preview_button"), false);

	$(".input").hide();
	$(".preview").show();
}

function init_slider() {
	$("#datepick").on("input", function() {
		var now   = parseInt(new Date().getTime() / 1000);
		var weeks = $(this).val();

		var unixtime = now + ((86400 * 7) * weeks);
		var datetime = new Date(unixtime * 1000);

		var year  = datetime.getFullYear();
		var month = pad(datetime.getMonth(), 2);
		var day   = pad(datetime.getDate(), 2);

		var date_str = year + "-" + month + "-" + day;

		//console.log(weeks, datetime);
		$("#date_str").html(date_str);
	});
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function markdown_table_cleanup(elem) {
	var str                = $(elem).val();
	var lines              = str.split("\n");
	var ret                = "";
	var table_data         = [];
	var prev_is_table_line = false;

	show_input();

	for (var i = 0; i < lines.length; i++) {
		var is_last_line  = ((i + 1) === lines.length);
		var line          = lines[i];
		var is_table_line = (line.match(/^\|/) !== null);

		// If it's a table line just gather the data for outputting later
		if (is_table_line) {
			var line  = line.replace(/(^\||\|$)/g, '');      // Remove trailing and leading |
			var parts = line.split(/\|/).map(e => e.trim()); // Trim() each part
			table_data.push(parts);

			// If it's the last line and we have table data output it
			if (is_last_line && table_data) {
				ret += format_table(table_data);
			}
			// If it's a transition from table to non-table time to output
		} else if ((prev_is_table_line && !is_table_line)) {
			ret += format_table(table_data);
			ret += line + "\n";

			table_data = [];
			// None table line so we just spit out what we got in
		} else {
			ret += line + "\n";
		}

		prev_is_table_line = is_table_line;
	}

	$(elem).val(ret);

	return ret;
}

function format_table(table_data) {
	var ret = "";
	var columns = table_data[0].length;
	var max_len = [];

	// Calculate the max length of each column
	for (var row = 0; row < table_data.length; row++) {
		for (var col = 0; col < columns; col++) {
			var item_len    = table_data[row][col].length;
			var max_len_col = max_len[col] || 0;

			if (item_len > max_len_col) {
				max_len[col] = item_len;
			}
		}
	}

	// Each column gets a max length
	// console.log(max_len);

	// Loop through the data and format the items with padding as appropriate
	for (var row = 0; row < table_data.length; row++) {
		for (var col = 0; col < columns; col++) {
			var col_len = max_len[col];
			var item    = table_data[row][col];

			if (table_data[row][col].match(/^---/)) {
				item = "-".repeat(col_len);
			}

			//table_data[row][col] = item.padStart(col_len); // Right align
			table_data[row][col] = item.padEnd(col_len); // Left align
		}
	}

	//console.log(table_data);

	// Now that the items are all clean we spit out the final data
	for (var row = 0; row < table_data.length; row++) {
		ret += "| " + table_data[row].join(" | ") + " |\n";
	}

	return ret;
}
