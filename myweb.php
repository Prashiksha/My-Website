<?php
echo "<center>";

echo "<body style='background: linear-gradient(to left, lightblue, white, lightblue);'>";

$connection = mysqli_connect("Server_name", "user_name", "password"); // Establishing Connection with Server
$db = mysqli_select_db($connection, "DB_name"); // Selecting Database from Server

if(isset($_POST['submit']))
{ // Fetching variables of the form which travels in URL
	$fname = $_POST['first'];
	$lname = $_POST['last'];  // use POST so that data is not seen in URL
	$mobile = $_POST['mobile'];
		if(empty($mobile)){
			$mobile = 0;	
		}
	$email = $_POST['email'];


	if($fname !=''||$email !='')
	{
		//Insert Query of SQL
		$query = mysqli_query($connection, "insert into myweb (FirstName, LastName, Mobile, Email) 
												values ('$fname', '$lname', '$mobile', '$email')");
		
		/*To see the error
		if(!mysqli_query($connection,"INSERT INTO myweb (FirstName, LastName, Mobile, Email) 
										VALUES ('{$fname}', '{$lname}', '{$mobile}', '{$email}')"))
			{
				die(mysqli_error($connection));
			}*/   //was inserting values twice in the table

		echo "<br/><br/><span>	
							<h2>
								Your data is recorded successfully...!!
								<br><br>
							</h2>
						</span>";
	}

	else{
		echo "<h2>Insertion Failed <br/> Some Fields are Blank....!!</h2>";
	}
}

$result = mysqli_query($connection,"select * from myweb WHERE FirstName = '$fname' && LastName = '$lname';");

$json_response = array();  
// fetch data in array format  
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {   //store the data in array's ASSOCIATIVE INDICES
	// Fetch data of name Column and store in array of row_array

	$row_array[Name] = $row[FirstName]; 
	$row_array[Surname] = $row[LastName]; 
	$row_array[Phone] = $row[Mobile]; 
	$row_array[Email] = $row[Email]; 

	//push the values in the array  
	array_push($json_response,$row_array);  //array_push(array_name, values) pushes the new values at the end of  array 
}  
echo json_encode($json_response); // returns decoded json value of array
mysqli_free_result($result); //frees the memory associated with the result

mysql_close($connection); // Closing Connection with Server

echo "</center>";
?>
