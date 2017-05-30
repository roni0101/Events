<?php
header("Access-Control-Allow-Origin: *");


//userid
//eventid
$userId = $_POST['userId'];
$eventId = $_POST['eventId'];

// Get all users 
$urlUsers = "../../db/users/users.json";
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

		// Add event id to array of event ids 
		array_push($arrUsers[$i]->eventsList, $eventId);
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
		$event->members++;
		$arrEvents[$i] = $event;
		break;
	}
}
// Save events to file
file_put_contents($urlEvents, json_encode($arrEvents, JSON_PRETTY_PRINT));


// Save users to file
$arrUsers = json_encode($arrUsers, JSON_PRETTY_PRINT);
file_put_contents($urlUsers, $arrUsers);

echo '{"response":"success", "user":' . json_encode($user) . '}';

?>