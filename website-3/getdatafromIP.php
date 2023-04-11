<?php
if($_SERVER['REQUEST_METHOD'] == 'GET')
{
   // var_dump(getUserIpAddr());

$testIPAddress = '192.30.255.112';
// // set IP address and API access key


// == Sabine's, should be changed == 
 $access_key = '46c490322a32c1fb91cdb8b034ed44ca';

// Initialize CURL:
$ch = curl_init('http://api.ipapi.com/'.$testIPAddress.'?access_key='.$access_key.'');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Store the data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$api_result = json_decode($json, true);

// Output the "calling_code" object inside "location"
//echo $api_result['location']['calling_code'];
echo(json_encode($api_result));
}


function getUserIpAddr(){ 
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){ 
        $ip = $_SERVER['HTTP_CLIENT_IP']; 
    }
        elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){ 
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR']; }
            else{ 
                $ip = $_SERVER['REMOTE_ADDR']; } 
            return $ip; 
        } 
?>