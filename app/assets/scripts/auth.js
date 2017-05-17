
var Auth = (function () {

	var user = null;

	var urlLogin = 'http://localhost/Interface-exam/Events/app/api/user/login.php';

	function login(email, password){

		var userEmail = email || "";
		var userPassword = password || "";

		$.ajax({
			method:"POST",
			url:urlLogin,
			dataType:"JSON",
			data:{
				"email": userEmail,
				"password": userPassword
			}
		}).done(function (response) {
			user = response.user;
		}).fail(function (argument) {
			console.log(argument);
		});

	}


return {
	login:login
}

})();

var user = Auth.login();