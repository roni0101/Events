var App = (function () {


	// CACHE DOM

	$eventsList = $('.event-list');

	$eventPage = $('#wdw-event .container');
	
	// Init
	function init() {

		// Get event template and events data from Preloader
		var tempEvent = Preload.getSource('event-item.html');
		var dataEvents = Preload.getSource('events.json');


		// Populate template with data
		dataEvents.forEach(function (event) {
			
			var layoutEvent = tempEvent.replace('{{ TITLE }}', event.title);
			layoutEvent = layoutEvent.replace('{{ TIME }}', event.time);
			layoutEvent = layoutEvent.replace('{{ DATE }}', event.date);
			layoutEvent = layoutEvent.replace('{{ MEMBERS }}', event.members);
			layoutEvent = layoutEvent.replace('{{ ORGANIZER }}', event.organizer);
			layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);

			// Append to list 
			$eventsList.append(layoutEvent);

			
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


	function displayEvent(e) {

		var eventId = $(e.currentTarget).attr('data-id');
		var tempEvent = Preload.getSource('event.html');
		var arrEvents = Preload.getSource('events.json');

		$eventPage.empty();

		for( var i = 0, length = arrEvents.length; i < length; i++ ){

			var event = arrEvents[i];

			if( event.id == eventId ){

				var layoutEvent = tempEvent.replace('{{ TITLE }}', event.title);
				layoutEvent = layoutEvent.replace('{{ DESCRIPTION }}', event.description);
				layoutEvent = layoutEvent.replace('{{ TIME }}', event.time);
				layoutEvent = layoutEvent.replace('{{ DATE }}', event.date);
				layoutEvent = layoutEvent.replace('{{ MEMBERS }}', event.members);
				layoutEvent = layoutEvent.replace('{{ SEATS }}', event.seats);
				layoutEvent = layoutEvent.replace('{{ LOCATION }}', event.location);
				layoutEvent = layoutEvent.replace('{{ ORGANIZER }}', event.organizer);
				layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.eventId);

				// Append 
				$eventPage.append(layoutEvent);
				break;
			}

		}

		console.log(arrEvents);

		// Append data to event



		// Swtich wdw to event
		Setup.switchWindow('event');
	}


	// EVENT LISTENERS

	$(document).on('click', '.event-item', displayEvent);




	return {
		init:init
	}


})();