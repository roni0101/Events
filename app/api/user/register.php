
<?php  


$user = json_decode('{}');

$result = json_decode('{}');
$result->status = "";
$result->response = "";

// get first name, last name ,email and passwrod from POST
/// If you want use GET first just to test it
// get user from ../db/users/users.json


// Check if email already exists 

// if email exist set status  to fail and response to "Email already exist"
// stringify result and return it;

// if everything is OK - set status to success 
// generate unique id 
// add data to user object
// Follow the following object design
/*
	{
		"id":"2",
		"email":"email2",
		"password":"password2",
		"firstName": "John2",
		"lastName": "Doe2"
	}
*/

// Push object to array of users
// Stringify the array and save it back to ../db/users/users.json
// Return $result



?>
