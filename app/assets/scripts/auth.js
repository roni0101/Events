
var Auth = (function () {

	var user = null;

	// CACHE DOM

	var $doc = $(document);
	var $nav = $('.navbar');

	var $createWdw = $('#wdw-create-event');
	var $loginWdw = $('#wdw-login');
	var $registerWdw = $('#wdw-register');
	var $eventWdw = $('#wdw-event');

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
				var user = JSON.stringify(response.user);
				error.hide();
				$nav.find('ul').empty().append(navUlMember);
				localStorage.eventAcc = '{"logedin":"yes", "user":' + user + '}';
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

		var error = $registerWdw.find('.form-error');
		error.hide();

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
			
			if(response.status === "fail"){
				error.show();
			}else{
				var user = JSON.stringify(response.user);
				error.hide();
				$nav.find('ul').empty().append(navUlMember);
				localStorage.eventAcc = '{"logedin":"yes", "user":' + user + '}';
				Setup.switchWindow('account');
			}

		});
		
	}

	function logout() {
		if(localStorage.eventAcc){
			localStorage.eventAcc = "";
			$nav.find('ul').empty().append(navUl);
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


	var urlSignForEvent = api + 'user/sign-for-event.php';
	function signForEvent(e) {
		var btn = $(e.target);
		var eventId = btn.attr('data-id');
		var user = JSON.parse(localStorage.eventAcc).user;
		var userId = user.id;
		

		$.ajax({
			url:urlSignForEvent,
			method:"POST",
			dataType:"JSON",
			data:{
				"userId":userId,
				"eventId":eventId
			}
		}).done(function (response) {
			$eventWdw.find('[data-status]').css('display', 'none');
			$eventWdw.find('[data-status="signed"]').css('display', 'block');
			var userLS = JSON.parse(localStorage.eventAcc);
			userLS.user = response.user;
			localStorage.eventAcc = JSON.stringify(userLS);
			Events.addMember(eventId);
		});
	}


	var urlSignOfEvent = api + 'user/sign-of-event.php';
	function signOfEvent(e) {
		var btn = $(e.target);
		var eventId = btn.attr('data-id');
		var user = JSON.parse(localStorage.eventAcc).user;
		var userId = user.id;
		

		$.ajax({
			url:urlSignOfEvent,
			method:"POST",
			dataType:"JSON",
			data:{
				"userId":userId,
				"eventId":eventId
			}
		}).done(function (response) {
			$eventWdw.find('[data-status]').css('display', 'none');
			$eventWdw.find('[data-status="logged"]').css('display', 'block');
			var userLS = JSON.parse(localStorage.eventAcc);
			userLS.user = response.user;
			localStorage.eventAcc = JSON.stringify(userLS);
			Events.removeMember(eventId);
		});
	}



	// Public functions



	// Event listeners

	$doc.on('click', '.act-create-event', createEvent);
	$doc.on('click', '.action-login', login);
	$doc.on('click', '.action-logout', logout);
	$doc.on('click', '.action-register', register);
	$doc.on('click', '.action-sign-for-event', signForEvent);
	$doc.on('click', '.action-sign-of-event', signOfEvent);



	return {
		init:init
	}



})();
