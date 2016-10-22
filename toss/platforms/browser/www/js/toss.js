var url = "http://c6f24a13.ngrok.io/api";
$(document).ready(function() {
	$(".app-back>button").click(function() {
		window.history.back();
	});
	$(".app-back-main>button").click(function() {
		window.location.href = "/main.html";
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

			$.post(url + "/v1/accounts/", data, function(data) {
				console.log(data);
			}).done(function(resp) {
				window.location.href = "/main.html";
			});
		}
		e.preventDefault();
	});

	$("#tossLoginButton").click(function(e) {
		var data = {
			username: $("#tossLoginUsername").val(),
			password: $("#tossLoginPassword").val()
		};

		//
		e.preventDefault();
	});
});