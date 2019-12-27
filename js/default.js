$(document).ready(function() {
	init_buttons();
	init_slider();
	load_most_recent();
});

function set_clickable(elem, clickable) {
	if (clickable) {
		$(elem).css("cursor", "pointer");
		$(elem).css("color", "black");
	} else {
		$(elem).css("cursor", "not-allowed");
		$(elem).css("color", "lightgrey");
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

		set_clickable($("#input_button"), true);
		set_clickable($("#preview_button"), false);

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

				$(".input").hide();
				$(".preview").show();
			},
		};

		$.ajax(url, opts);
	});

	$("#input_button").on("click", function() {
		set_clickable($("#input_button"), false);
		set_clickable($("#preview_button"), true);

		$(".input").show();
		$(".preview").hide();
	});
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
