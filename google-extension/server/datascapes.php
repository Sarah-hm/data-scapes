<?php
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
  if(isset($_POST['productName'])){

   $productName = $_POST['productName'];
   $url = $_POST ['url'];
   $price = $_POST['price'];
   $currentImgs = $_POST['currentImgs'];
   $journalEntry = $_POST['journalEntry'];


   //If you use fopen() on a file that does not exist, it will create it,
   //given that the file is opened for writing (w) or appending (a).
   $theFile = fopen("journalInput.txt", "a") or die("Unable to open file!");

  fwrite($theFile, "productName:".$productName."\n");
  fwrite($theFile, "url:".$url."\n");
  fwrite($theFile,  "price:".$price."\n");
  fwrite($theFile,  "currentImgs:".$currentImgs."\n");
  fwrite($theFile,  "journalEntry:".$journalEntry."\n");


  fclose($theFile);
  echo("WE HAVE SUCCESSFULLY read the vars AND saved to the file ... ");
   // you must exit
exit;
}

}
?>
