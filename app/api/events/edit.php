<?php 
header("Access-Control-Allow-Origin: *");

// get date form post

$eventId = $_POST['id'];

// get events file
$fileEvents = '../../assets/data/events.json';

$arrEvents = json_decode( file_get_contents($fileEvents) );
$eventsCount = count($arrEvents);

for ($i=0; $i < $eventsCount; $i++) { 
	$objEvent = $arrEvents[$i];
	$dbEventId = $objEvent->id;

	if($eventId == $dbEventId){
		$objEvent->title =        $_POST["title"];
		$objEvent->organizer =    $_POST["organizer"];
		$objEvent->description =  $_POST["description"];
		$objEvent->date =         $_POST["date"];
		$objEvent->time =         $_POST["time"];
		$objEvent->seats =        $_POST["seats"];
		$objEvent->location =     $_POST["location"];

		$arrEvents[$i] = $objEvent;
		break;
	}

}


$strEvents = json_encode($arrEvents, JSON_PRETTY_PRINT);
file_put_contents($fileEvents, $strEvents);

echo $strEvents;

?>