
var Auth = (function () {

	var api = 'http://localhost/Interface-exam/Events/app/api/';

	// CACHE DOM
	$createWdw = $('#wdw-create-event');


	var user = null;

	var urlLogin =  api + 'user/login.php';

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


	// Event listeners

	var $doc = $(document);

	$doc.on('click', '.act-create-event', createEvent);


	return{
		createEvent:createEvent
	}
	



})();
