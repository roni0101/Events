var App = (function () {


	// CACHE DOM

	var $wdwEvents = $('#wdw-events');
	var $wdwSingleEvent = $('#wdw-event');
	var $eventPage = $wdwSingleEvent.find('.container');
	
	var $searchInput = $wdwEvents.find('[name="event-name"]');
	var $eventsList = $('.event-list');

	var $nav = $('.navbar');
	

	// DATA 

	var dataEvents;
	var tempEvent;

	// Init
	function init() {

		Auth.init();

		// Get event template and events data from Preloader
		tempEvent = Preload.getSource('event-item.html');
		dataEvents = Preload.getSource('events.json');

		var navUl = Preload.getSource('nav-ul.html');
		var navUlMember = Preload.getSource('nav-ul-member.html');


		// Populate template with data
		displayAllEvents();

		// Check if user is loged in


		if( localStorage.eventAcc ){

			var userAccout = JSON.parse( localStorage.eventAcc );
			
			if(userAccout.logedin == "yes"){

				$nav.find('ul').append(navUlMember)
				// Append User status



				// Display data based on that 
			}else{
				$nav.find('ul').append(navUl);
			}
		}else{
			$nav.find('ul').append(navUl);
		}

		// Run app
		
	}

	function displayAllEvents(nameToMatch) {

		var matchTitle = nameToMatch || "";
		var matchTitleLength = matchTitle.length;

		$eventsList.empty();

		dataEvents.forEach(function (event) {

			if(matchTitle === "" || matchTitle.toLowerCase() === event.title.slice(0, matchTitleLength).toLowerCase() ){

				var layoutEvent = tempEvent.replace('{{ TITLE }}', event.title);
				layoutEvent = layoutEvent.replace('{{ TIME }}', event.time);
				layoutEvent = layoutEvent.replace('{{ DATE }}', event.date);
				layoutEvent = layoutEvent.replace('{{ MEMBERS }}', event.members);
				layoutEvent = layoutEvent.replace('{{ ORGANIZER }}', event.organizer);
				layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);
				layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);


				// Append to list 
				$eventsList.append(layoutEvent);
			}
			
		});
	}

	function run() {
		console.log('app running...');
	}



	function searchForEvent() {
		var eventName = $searchInput.val();
		var nameLength  = eventName.length;
		displayAllEvents(eventName);
	}


	function displayEvent(e) {

		var eventId = $(e.currentTarget).attr('data-id');
		var tempEvent = Preload.getSource('event.html');

		$.getJSON('assets/data/events.json', function (response) {
			var arrEvents = response;
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
					layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);
					layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);
					layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);

					layoutEvent = $(layoutEvent);

					if(localStorage.eventAcc){

						var userData = JSON.parse(localStorage.eventAcc);
						
						if( userData.logedin == 'yes'){
							var user = userData.user;
							var userEventList = user.eventsList;
							// Loop users events list
							var userIsGoing = false;

							for(var c = 0; c < userEventList.length; c++){
								var userEventId = userEventList[c];
								
								if( userEventId === event.id){
									layoutEvent.find('[data-status="signed"]').css('display', 'block');
									userIsGoing = true;
									break;
								}
							}

							if(!userIsGoing){
								layoutEvent.find('[data-status="logged"]').css('display', 'block');
							}
						}else{
							layoutEvent.find('[data-status="not-logged"]').css('display', 'block');
						}
					}else{
						layoutEvent.find('[data-status="not-logged"]').css('display', 'block');
					}

					// Append 
					$eventPage.append(layoutEvent);
					break;
				}

			}
		});

		$eventPage.empty();



		// Swtich wdw to event
		Setup.switchWindow('event');
	}


	// EVENT LISTENERS

	$(document).on('click', '.event-item', displayEvent);
	$(document).on('keyup', $searchInput, searchForEvent);




	return {
		init:init
	}


})();