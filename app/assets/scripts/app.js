var App = (function () {
	
	// Init
	function init() {
		console.log('Init App');

		// Get event template and events data from Preloader
		var tempEvent = Preload.getSource('event-item.html');
		var dataEvents = Preload.getSource('events.json');


		// Populate template with data
		dataEvents.forEach(function (event) {
			
			var layoutEvent = tempEvent.replace('{{ NAME }}', event.name);

			// Append to list 
			
		});

		// Check if user is loged in


		if( localStorage.eventAcc ){

			var userAccout = JSON.parse( localStorage.eventAcc );
			
			if(userAccout.logedin == "yes"){
				console.log("loged in");
				// Append User status
				// Display data based on that 
			}
		}

		// Run app
		
	}

	function run() {
		console.log('app running...');
	}

	return {
		init:init
	}


})();