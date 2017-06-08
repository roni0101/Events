var App = (function () {


	// CACHE DOM
	var $wdwCpEvents = $('#wdw-control-panel');
	var $cpEventsList = $wdwCpEvents.find('.item-list__content');

	var $wdwEvents = $('#wdw-events');
	var $wdwSingleEvent = $('#wdw-event');
	var $eventPage = $wdwSingleEvent.find('.container');
	
	var $searchInput = $wdwEvents.find('[name="event-name"]');
	var $eventsList = $('.event-list');


	var $nav = $('.navbar');
	

	// DATA 

	var dataAdmins;
	var tempAdmins;

	var dataEvents;
	var tempEvent;

	var cpTempEvent;

	// Init
	function init() {

		Auth.init();

		// Get event template and events data from Preloader
		tempEvent = Preload.getSource('event-item.html');
		dataEvents = Preload.getSource('events.json');

		tempAdmins = Preload.getSource('c-panel-admins.html')
		dataAdmins = Preload.getSource('users.json');

		cpTempEvent = Preload.getSource('c-panel-event.html');

		var navUl = Preload.getSource('nav-ul.html');
		var navUlMember = Preload.getSource('nav-ul-member.html');
		var navUlAdmin = Preload.getSource('nav-ul-admin.html');


		// Populate template with data
		displayAllEvents();

		// Check if user is loged in


		if( localStorage.eventAcc ){

			var userAccout = JSON.parse( localStorage.eventAcc );
			
			if(userAccout.logedin == "yes"){


				// Check if user is an Admin 
				if(userAccout.user.isAdmin){
					$nav.find('ul').append(navUlAdmin);
				}else{
					$nav.find('ul').append(navUlMember);
				}
				// Append User status



				// Display data based on that 
			}else{
				$nav.find('ul').append(navUl);
			}
		}else{
			$nav.find('ul').append(navUl);
		}

		run();
		
	}

	var months = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	var cpList = $('.js-cp-switch');
	var cpListTitle = $('.js-cp-title');

	var btnShowEvents = $('.js-cp-switch-events');
	var btnShowAdmins = $('.js-cp-switch-admins');

	var btnAdd = $('.js-btn-add');


	// Dsiplays admins in control panel
	function displayAdmins(e, data) {

		if(data){
			dataAdmins = data;
		}

		btnShowAdmins.addClass('btn-active ');
		btnShowEvents.removeClass('btn-active').addClass('btn-default');

		cpListTitle.text('Administrators manager');

		btnAdd
			.attr('data-wdw', 'add-admin')
			.removeClass('action-display-create-event-wdw')
			.addClass('action-display-add-admin-wdw');
		
		cpList.empty();

		dataAdmins.forEach(function (user) {

			if(user.isAdmin){
				var cpLayoutAdmin = tempAdmins.replace('{{ USERID }}', user.id);
				cpLayoutAdmin = cpLayoutAdmin.replace('{{ FIRST_NAME }}', user.firstName);
				cpLayoutAdmin = cpLayoutAdmin.replace('{{ LAST_NAME }}', user.lastName);
				cpList.append(cpLayoutAdmin);				
			}
		});
	}

	// Dsiplays events in control panel
	function displayEvents(e) {

		btnShowAdmins.removeClass('btn-active').addClass('btn-default');
		btnShowEvents.addClass('btn-active');
		cpListTitle.text('Events manager');

		btnAdd.attr('data-wdw', 'create-event')
			.removeClass('action-display-add-admin-wdw')
			.addClass('action-display-create-event-wdw');
		
		cpList.empty();

		dataEvents.forEach(function (event) {

			var cpLayouEvent = cpTempEvent.replace('{{ TITLE }}', event.title);
			cpLayouEvent = cpLayouEvent.replace('{{ EVENTID }}', event.id);
			cpLayouEvent = cpLayouEvent.replace('{{ EVENTID }}', event.id);
			cpList.append(cpLayouEvent);
		});
	}




	function displayAllEvents(nameToMatch, data, wdwName ) {

		var matchTitle = nameToMatch || "";
		var matchTitleLength = matchTitle.length;

		if(wdwName){
			if(wdwName == "cp"){
				$cpEventsList.empty();
			}else{
				$eventsList.empty();	
			}

		}else{
			$eventsList.empty();	
			$cpEventsList.empty();
		}

		if(data){
			dataEvents = data;
		}

		dataEvents.forEach(function (event) {

			if(matchTitle === "" || matchTitle.toLowerCase() === event.title.slice(0, matchTitleLength).toLowerCase() ){

				var date = event.date;
				date = new Date(date);
				var month = months[date.getMonth()];
				var day = date.getUTCDate();
				date = day + " " + month; 


				var layoutEvent = tempEvent.replace('{{ TITLE }}', event.title);
				layoutEvent = layoutEvent.replace('{{ TIME }}', event.time);
				layoutEvent = layoutEvent.replace('{{ DATE }}', date);
				layoutEvent = layoutEvent.replace('{{ MEMBERS }}', event.members);
				layoutEvent = layoutEvent.replace('{{ ORGANIZER }}', event.organizer);
				layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);
				layoutEvent = layoutEvent.replace('{{ EVENTID }}', event.id);
			


				var cpLayouEvent = cpTempEvent.replace('{{ TITLE }}', event.title);
				cpLayouEvent = cpLayouEvent.replace('{{ EVENTID }}', event.id);
				cpLayouEvent = cpLayouEvent.replace('{{ EVENTID }}', event.id);


				if(!wdwName){
					$eventsList.append(layoutEvent);
					$cpEventsList.append(cpLayouEvent);
				}else{
					if(wdwName == "cp"){
						$cpEventsList.append(cpLayouEvent);
					}else{
						$eventsList.append(layoutEvent);	
					}					
				}

			}
			
		});
	}

	function run() {
		$('.alert').addClass('alert_hidden');

	}



	function searchForEvent(e) {
		var input = $(e.currentTarget);
		var inputWdw = input.attr('name');

		var wdwName = 'a';
		if(inputWdw == 'cp-event-name'){
			wdwName = 'cp';
		}
		var eventName = input.val();
		displayAllEvents(eventName, false, wdwName);
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
	$(document).on('click', '.js-cp-switch-admins', displayAdmins);
	$(document).on('click', '.js-cp-switch-events', displayEvents);
	$(document).on('keyup', '[name="event-name"]', searchForEvent);
	$(document).on('keyup', '[name="cp-event-name"]', searchForEvent);




	return {
		init:init,
		displayAllEvents:displayAllEvents,
		displayAdmins:displayAdmins
	}


})();