<?php
	// variables to storage params
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];

	// check if all fields are correct
	if (empty($name)) {
		echo json_encode(array('response' => false, 'error' => 'Name is empty.'));
		exit();
	} else if (empty($email)) {
		echo json_encode(array('response' => false, 'error' => 'E-mail is empty.'));
		exit();
	} else if (empty($phone)) {
		echo json_encode(array('response' => false, 'error' => 'Phone is empty.'));
		exit();
	} else if (empty($message)) {
		echo json_encode(array('response' => false, 'error' => 'Message is empty.'));
		exit();
	}

	// headers
	$headers = 'From: Matheus Godinho <me@matheusgodinho.co.uk>'. "\r\n" .
    		   'Reply-To: matheuspbg@gmail.com'. "\r\n" .
    		   'X-Mailer: PHP/'. phpversion().
    		   'MIME-Version: 1.0\r\n'."\r\n".
			   'Content-Type: text/html; charset=ISO-8859-1'."\r\n";

   	// my message
   	$my_message  = "<b>Name:</b> ".ucfirst($name)."<br />";
    $my_message .= "<b>Email:</b> ".$email."<br />";
    $my_message .= "<b>Phone:</b> ".$phone."<br />";
    $my_message .= "<b>Message:</b><br />";
    $my_message .= "<p style=\"margin: 0;\">".$message."</p>";

	$my_email = mail("matheuspbg@gmail.com", "Contact form matheusgodinho.co.uk", $my_message, $headers);

	if ($my_email) {
		echo json_encode(array('response' => true));
	} else {
		echo json_encode(array('response' => false, 'error' => 'Error at send form.'));
	}
?>