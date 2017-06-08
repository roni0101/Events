<?php
header("Access-Control-Allow-Origin: *");

$userId = $_POST['id'];

$urlUser = '../../assets/data/users.json';

$arrUsers = json_decode( file_get_contents($urlUser) );
$usersCount = count( $arrUsers );

for($i = 0; $i < $usersCount; $i++){

	$user = $arrUsers[$i];
	$dbUserId = $user->id;

	// check if user exist

	if( $dbUserId == $userId ){
		
		// Make the user an admin
		$arrUsers[$i]->isAdmin = false;
		break;
	}
}

$arrUsers = json_encode($arrUsers, JSON_PRETTY_PRINT);

file_put_contents($urlUser, $arrUsers);

// return all users 
echo $arrUsers;

?>