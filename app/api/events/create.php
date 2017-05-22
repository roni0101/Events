<?php 
header("Access-Control-Allow-Origin: *");

// get date form post

$objEvent = json_decode('{}');

$objEvent->id = uniqid().uniqid();
$objEvent->title =        $_POST["title"];
$objEvent->organizer =    $_POST["organizer"];
$objEvent->description =  $_POST["description"];
$objEvent->date =         $_POST["date"];
$objEvent->time =         $_POST["time"];
$objEvent->seats =        $_POST["seats"];
$objEvent->members =      0;
$objEvent->location =     $_POST["location"];


// get json file
$fileEvents = '../../assets/data/events.json';

$arrEvents = json_decode( file_get_contents($fileEvents) );

array_push($arrEvents, $objEvent);
$strEvents = json_encode($arrEvents, JSON_PRETTY_PRINT);
file_put_contents($fileEvents, $strEvents);

echo json_encode($objEvent);

?>