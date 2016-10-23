var domain = "http://fac96201.ngrok.io";
var url = domain + "/api/v1";

$(document).ready(function() {

	if (!window.localStorage.getItem("TossApp-TaskState")) {
		window.localStorage.setItem("TossApp-TaskState", JSON.stringify({}));
	}

	function localSet(key, value) {
		var storage = window.localStorage.getItem("TossApp-TaskState");
		storage = JSON.parse(storage);
		storage[key] = value;
		window.localStorage.setItem("TossApp-TaskState", JSON.stringify(storage));
		return true;
	}

	function localGet(key) {
		var storage = window.localStorage.getItem("TossApp-TaskState");
		storage = JSON.parse(storage);
		return storage[key];
	}

	$(".app-back>button").click(function(e) {
		window.history.back();
		e.preventDefault();
	});

	function taskBreadcrumbs() {
		$(".app-task-breadcrumbs>a").each(function() {
			var step = $(this).attr("task-step");
			if (localGet(step)) {
				$(this).css("color", "green");
			}
		});
	}

	function taskValidate() {
		var steps = ["what", "who", "when", "where"];
		var count = 0;
		steps.forEach(function(step) {
			if (localGet(step)) {
				count++;
			}
		});
		return (count == 4);
	}

	if ($("#app-task-input")) {
		var step = $("#app-task-input").attr("task-step");
		if (localGet(step)) {
			$("#app-task-input").val(localGet(step));
		}
		taskBreadcrumbs();
		
		if (step == "what") {
			$("#app-task-input").change(function() {

			});
		}

		else if (step == "when") {
			$("#app-task-input").on("input change", function() {
				$("#app-task-time").text($("#app-task-input").val() + " minutes from now");
			});
		}
	}

	$(".app-task-back>button").click(function(e) {
		var step = $(this).attr("task-step");
		if (step == "what") {
			window.localStorage.removeItem("TossApp-TaskState");
			window.location.href = "./main.html";
		}
		else if (step == "who") {
			window.location.href = "./whatTask.html";
		}
		else if (step == "when") {
			window.location.href = "./whoTask.html";
		}
		else if (step == "where") {
			window.location.href = "./whenTask.html";
		}
		e.preventDefault();
	});

	$(".app-task-next>button").click(function(e) {
		var step = $(this).attr("task-step");
		if (step == "what") {
			localSet(step, $("#app-task-input").val());
			window.location.href = "./whoTask.html";
		}
		else if (step == "who") {
			localSet(step, $("#app-task-input").val());
			window.location.href = "./whenTask.html";
		}
		else if (step == "when") {
			localSet(step, $("#app-task-input").val());
			window.location.href = "./whereTask.html";
		}
		else if (step == "where") {
			localSet(step, $("#app-task-input").val());
			window.location.href = "./confirmTask.html";
		}
		e.preventDefault();
	});

	$("#tossSignUpButton").click(function(e) {
		if ($("#tossSignUpPassword").val() === $("#tossSignUpConfirmPassword").val()) {
			var data = {
				email: $("#tossSignUpEmail").val(),
				first_name: $("#tossSignUpFirstName").val(),
				last_name: $("#tossSignUpLastName").val(),
				username: $("#tossSignUpUsername").val(),
				password: $("#tossSignUpPassword").val()
			};

			$.post(url + "/accounts/", data, function(data) {
				console.log(data);
			}).done(function(resp) {
				window.location.href = "./index.html";
			});
		}
		e.preventDefault();
	});

	if ($("#tossConfirmTaskButton")) {
		if (!taskValidate()) {
			$("#tossConfirmTaskButton").prop("disabled", "true");
		}
	}

	$("#tossLoginButton").click(function(e) {
		var data = {
			username: $("#tossLoginUsername").val(),
			password: $("#tossLoginPassword").val()
		};

		$.post(url + "/accounts/login/", data, function(data) {
			//console.log(data);
		}).done(function(resp) {
			if (resp["token"]) {
				localSet("token", resp["token"]);
				localSet("username", data["username"]);
				window.location.href = "./main.html";
			}
			else {
				console.log("Invalid login.");
			}
		});
		//
		e.preventDefault();
	});
});