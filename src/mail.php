<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];

	if (empty($name)) {
		echo json_encode(array('response' => false, 'error' => 'Name is empty.'));
		exit();
	} else if (empty($email)) {
		echo json_encode(array('response' => false, 'error' => 'E-mail is empty.'));
		exit();
	} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		echo json_encode(array('response' => false, 'error' => 'Invalid E-mail address.'));
		exit();
	} else if (empty($phone)) {
		echo json_encode(array('response' => false, 'error' => 'Phone is empty.'));
		exit();
	} else if (empty($message)) {
		echo json_encode(array('response' => false, 'error' => 'Message is empty.'));
		exit();
	}

	$headers = 'From: Matheus Godinho <me@matheusgodinho.co.uk>'. "\r\n" .
    		   'Reply-To: matheuspbg@gmail.com'. "\r\n" .
    		   'X-Mailer: PHP/'. phpversion().
    		   'MIME-Version: 1.0\r\n'."\r\n".
			   'Content-Type: text/html; charset=ISO-8859-1'."\r\n";

   	$content  = "<b>Name:</b> ".ucfirst($name)."<br />";
    $content .= "<b>Email:</b> ".$email."<br />";
    $content .= "<b>Phone:</b> ".$phone."<br />";
    $content .= "<b>Message:</b><br />";
    $content .= "<p style=\"margin: 0;\">".nl2br($message)."</p>";

	$email = mail("matheuspbg@gmail.com", "Contact form matheusgodinho.co.uk", $content, $headers);

	if ($email) {
		echo json_encode(array('response' => true));
	} else {
		echo json_encode(array('response' => false, 'error' => 'Error at send form.'));
	}
?>