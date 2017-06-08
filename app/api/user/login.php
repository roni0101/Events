<?php
header("Access-Control-Allow-Origin: *");

$email = $_POST['email'];
$password = $_POST['password'];

// $email = 'email';
// $password ='password';

$strUsers = file_get_contents("../../assets/data/users.json");

$listUsers = json_decode($strUsers);
$listLength = count($listUsers);

$result = json_decode('{}');
$result->status = "fail";

for ($i=0; $i < $listLength ; $i++) { 
	$user = $listUsers[$i];

	$dbPassword = $user->password;
	$dbEmail = $user->email;

	if( $dbPassword == $password && $dbEmail == $email){
		$result->status = "success";
		$result->user = $user;
		break;
	}
}



$result = json_encode($result);

echo $result;

?>