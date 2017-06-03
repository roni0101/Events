
<?php  
header("Access-Control-Allow-Origin: *");

$user = json_decode('{}');

$result = json_decode('{}');
$result->status = "success";
$result->user = "";

// get first name, last name ,email and passwrod from POST

$email = $_POST["email"];
$password = $_POST["password"];
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];



// Get users from ../db/users/users.json

$fileUsers = "../../db/users/users.json";
$arrUsers = json_decode( file_get_contents($fileUsers));

// Check if email already exists 

$length = count($arrUsers);
for($i = 0; $i < $length; $i++ ){
	$dbUser = $arrUsers[$i];
	$dbEmail = $dbUser->email;

	if( $email == $dbEmail){
		$result->status = "fail";

		echo json_encode($result);
		return;
	}
}


$user = json_decode('{}');
$user->id = uniqid();
$user->email = $email;
$user->password = $password;
$user->firstName = $firstName;
$user->lastName = $lastName;
$user->isAdmin = false;
$user->eventsList = [];


// Push object to array of users

array_push($arrUsers, $user);

// Stringify the array and save it back to ../db/users/users.json

file_put_contents($fileUsers, json_encode($arrUsers, JSON_PRETTY_PRINT));

// Return $result

$result->user = $user;

echo json_encode($result);


?>
