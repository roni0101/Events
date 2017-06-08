<?php
header("Access-Control-Allow-Origin: *");

$email = $_POST['email'];

$urlUser = '../../assets/data/users.json';

$arrUsers = json_decode( file_get_contents($urlUser) );
$usersCount = count( $arrUsers );

for($i = 0; $i < $usersCount; $i++){

	$user = $arrUsers[$i];
	$dbUserEmail = $user->email;

	// check if user exist

	if( $dbUserEmail == $email ){
		
		// Make the user an admin
		$arrUsers[$i]->isAdmin = true;
		break;
	}
}

$arrUsers = json_encode($arrUsers, JSON_PRETTY_PRINT);

file_put_contents($urlUser, $arrUsers);

// return all users 
echo $arrUsers;

?>