<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
echo($_POST['latitude']);
// need to process
 $latitude = $_POST['latitude'];
 $longitude = $_POST['longitude'];
 //run if there is a files array

   //package the data and echo back
    /* make  a new php object*/
    $myPackagedData=new stdClass();
    $myPackagedData->latitude = $latitude ;
    $myPackagedData->longitude = $longitude ;

     /* Now we want to JSON encode these values as a JSON string ..
     to send them to $.ajax success  call back function... */
    $myJSONObj = json_encode($myPackagedData); //if it's not encoded in JSON, javascript won't be able to read it (doesnt read php)
    // echo $myJSONObj;

    $theFile = fopen("data/geolocationData.txt", "a") or die("Unable to open file!");

    fwrite($theFile, $myJSONObj);
    //write a new line after!
    fwrite($theFile,"\n");
    fclose($theFile);
    // echo $myJSONObj;
    exit;
}//POST
?>