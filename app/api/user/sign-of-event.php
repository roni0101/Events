<?php
header("Access-Control-Allow-Origin: *");


//userid
//eventid
$userId = $_POST['userId'];
$eventId = $_POST['eventId'];



// Get all users 
$urlUsers = "../../assets/data/users.json";
$arrUsers = file_get_contents($urlUsers);
$arrUsers = json_decode($arrUsers);
$usersLength = count($arrUsers);

$user;

// Loop trought users
for($i = 0; $i < $usersLength; $i++){
	$user = $arrUsers[$i];
	$dbUserId = $user->id;

	// Pick the correct user based on user id
	if( $dbUserId == $userId ){
		$arrEventId = [$eventId];
		// Remove event id to array of event ids 
		$arrEvents = $arrUsers[$i]->eventsList;
		$arrEvents = array_diff($arrEvents, $arrEventId);
		$arrUsers[$i]->eventsList = $arrEvents;
		$user = $arrUsers[$i];
		break;
	}
}

// Get events
$urlEvents = "../../assets/data/events.json";
$arrEvents = file_get_contents($urlEvents);
$arrEvents = json_decode($arrEvents);
$eventsLength = count($arrEvents);
// Loop events

for( $i = 0; $i < $eventsLength; $i++){
	$event = $arrEvents[$i];
	$dbEventId = $event->id;

	if( $dbEventId == $eventId){

		$event->members = $event->members - 1;
		$arrEvents[$i] = $event;
		break;
	}
}
// Save events to file
file_put_contents($urlEvents, json_encode($arrEvents, JSON_PRETTY_PRINT));


// Save to file
$arrUsers = json_encode($arrUsers, JSON_PRETTY_PRINT);
file_put_contents($urlUsers, $arrUsers);

echo '{"response":"success", "user":' . json_encode($user) . '}';

?>