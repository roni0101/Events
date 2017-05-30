
var Auth = (function () {

	var user = null;

	// CACHE DOM

	var $doc = $(document);
	var $nav = $('.navbar');

	var $createWdw = $('#wdw-create-event');
	var $loginWdw = $('#wdw-login');
	var $registerWdw = $('#wdw-register');

	var navUlMember;
	var navUl;

	function init() {
		navUlMember = Preload.getSource('nav-ul-member.html');
		navUl = Preload.getSource('nav-ul.html');
	}




  // Links for ajax

	var api = 'http://localhost/Interface-exam/Events/app/api/';

	var urlLogin =  api + 'user/login.php';


	// Private functions

	function login(){

		var userEmail = $loginWdw.find('[name="email"]').val();
		var userPassword = $loginWdw.find('[name="password"]').val();

		var error = $loginWdw.find('.form-error');
		error.hide();

		$.ajax({
			method:"POST",
			url:urlLogin,
			dataType:"JSON",
			data:{
				"email": userEmail,
				"password": userPassword
			}
		}).done(function (response) {

			if(response.status === 'success'){
				error.hide();
				$nav.find('ul').remove();
				$nav.append(navUlMember);
				localStorage.eventAcc = '{"logedin":"yes"}';
				Setup.switchWindow('account');
			}else{
				error.show();
			}
		});

	}


	var urlRegister = api + 'user/register.php';

	function register() {

		var userEmail = $registerWdw.find('[name="email"]').val();
		var userPassword = $registerWdw.find('[name="password"]').val();
		var userFirstName = $registerWdw.find('[name="first-name"]').val();
		var userLastName = $registerWdw.find('[name="last-name"]').val();

		console.log(userEmail, userPassword, userFirstName, userLastName);

		$.ajax({
			url:urlRegister,
			method:"POST",
			dataType:"JSON",
			data:{
				"email":userEmail,
				"password":userPassword,
				"firstName":userFirstName,
				"lastName":userLastName,
			}
		}).done(function (response) {
			
			if(response.status === "fail"){}

		});
		
	}

	function logout() {
		if(localStorage.eventAcc){
			localStorage.eventAcc = "";
			$nav.find('ul').remove();
			$nav.append(navUl);
			Setup.switchWindow('home');
		}
	}


	var months = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	function createEvent() {
		
		var title = $createWdw.find('[name=title]').val();
		var organizer = $createWdw.find('[name=organizer]').val();
		var description = $createWdw.find('[name=description]').val();

		var date = $createWdw.find('[name=date]').val();
		date = new Date(date);
		var month = months[date.getMonth()];
		var day = date.getUTCDate();
		date = day + " " + month; 

		var time = $createWdw.find('[name=time]').val();
		var seats = $createWdw.find('[name=seats]').val();
		var location = $createWdw.find('[name=location]').val();

		var url = api + 'events/create.php'

		$.ajax({
			method:"POST",
			url:url,
			dataType:"JSON",
			data:{
				"title":title,
				"organizer":organizer,
				"description":description,
				"date":date,
				"time":time,
				"seats":seats,
				"location":location
			}
		}).done(function (response) {
			console.log(response);
		});

	}


	// Public functions



	// Event listeners

	$doc.on('click', '.act-create-event', createEvent);
	$doc.on('click', '.action-login', login);
	$doc.on('click', '.action-logout', logout);
	$doc.on('click', '.action-register', register);



	return {
		init:init
	}



})();
