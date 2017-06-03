<?php 
header("Access-Control-Allow-Origin: *");

// get data form post
// get event id 
$eventId = $_POST['eventId'];

// get all events from DB
$fileEvents = "../../assets/data/events.json";
$arrEvents = file_get_contents($fileEvents);
$arrEvents = json_decode($arrEvents);
$eventsCount = count($arrEvents);


// Loop events
for ($i=0; $i < $eventsCount; $i++) { 
	$event = $arrEvents[$i];
	$dbEventId = $event->id;

	if($dbEventId == $eventId){

		// Delete event based on ID 
		array_splice($arrEvents, $i, 1);
		break;
	}
}


// Save back to DB
$arrEvents = json_encode($arrEvents, JSON_PRETTY_PRINT);

file_put_contents($fileEvents, $arrEvents);

// Return all events 
echo $arrEvents;

?>