$(document).ready(function() {
	init_buttons();
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
	set_clickable($("#input_button"), true);
	set_clickable($("#preview_button"), false);

	var url = "ajax/ajax.php";
	var opts = {
		data: {
			action: 'get_most_recent',
		},
		success: function(x) {
			console.log(x);

			var mh = marked(x.MarkdownStr);
			$(".preview").html(mh);

			$(".input").val(x.MarkdownStr);

			$(".input").hide();
			$(".preview").show();
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
