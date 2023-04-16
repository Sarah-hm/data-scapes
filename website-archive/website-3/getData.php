<?php
//only run in if when page loads (when we got the position)
if($_SERVER['REQUEST_METHOD'] == 'GET')
{

   $theFile = fopen("data/geolocationData.txt", "r") or die("Unable to open file!");

   $outArr = array();
   //$NUM_PROPS = 3;
    //echo("test");
      while(!feof($theFile)) {   //read until eof
        //create an object to send back
        //get the string
          $str = fgets($theFile);
          $outArr[]= json_decode($str);
        }

      fclose($theFile);
        // Now we want to JSON encode these values to send them to $.ajax success.
      $myJSONObj = json_encode($outArr);
     echo $myJSONObj;
      exit;

} //if
?>