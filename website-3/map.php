<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DATA_SCAPES</title>
    <link rel="icon" type="image/x-icon" href="assets/ds-logo.png">
    <!-- CSS  -->
    <link rel="stylesheet" href="style/rhizome-style.css" />
    <link rel="stylesheet" href="style/ds-style.css" />
    <!-- LEAFLET CSS + SCRIPT -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
     integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
     crossorigin=""/>

     <script type="module">

      //To be added in the class I add the D3s in 
    </script>

     <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
     integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
     crossorigin=""></script>

     <script src="js/myCustomMap.js"></script>
     <script type = "module"src="js/ds-script.js"></script>

        <!-- css class for different zoom lvls -->  

     <!-- Leaflet plug-ins -->
    <!-- <script src = "libraries/Leaflet.Antimeridian/dist/leaflet.antimeridian-src.js" ></script> -->
     <!-- <script scr="libraries/leaflet.zoomcss.js"></script>      inutile  -->
    <!-- Ajax : will try to make it useless :) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- Google maps -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTBA5GXAPNgRhVIvAxsgsuZpn2ezBGeCY&map_ids=4436878dd8c920c0"></script>
    <!-- svg.js -->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.1.2/svg.min.js"
      integrity="sha512-I+rKw3hArzZIHzrkdELbKqrXfkSvw/h0lW/GgB8FThaBVz2e5ZUlSW8kY8v3q6wq37eybIwyufkEZxe4qSlGcg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>

    <!-- All my lil javascript, classes, and suches -->
    <!-- <script src="js/rhizome-script.js"></script> -->
 
    <script src="js/Rhizome-item.js"></script>
    <script src="js/line.js"></script>
  
</head>
<body>
<div class = "infoIcon" id="ds-info-Icon"><?xml version="1.0" ?><svg id = "ds-info-box-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path  d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg></div>


<div id="map" >

</div>
<div id="sliders-container">
  <div class="toggleMenu">
  <svg id="layersMenuIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
  </div>
  <div id="sliders-subcontainer">
  <div class="slider">
      <h1>n-l</h1>
      <div class="infoIcon"><?xml version="1.0" ?><svg id = "nl-info-box-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path  d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg></div>
      <input type="range" value = "0"min = "0" max ="50" id = "native-land-slider">
    </div>
    <div class="slider">
      <h1>mrct</h1>
      <div class="infoIcon"><?xml version="1.0" ?><svg id = "mrct-info-box-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path  d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg></div>
      <input type="range" value="0" min = "0" max ="100" id = "mercator-slider">
    </div>
  </div>
  </div>
  
  <div class="info-box" id = "nl-info-box">
  <div class="closeButton">X</div>
    <div class="info-box-inner-container">
    </div>
  </div>

  <div class="info-box" id = "mrct-info-box">
  <div class="closeButton">X</div>
    <div class="info-box-inner-container"> </div>
</div>

    <div class="info-box" id = "ds-info-box">
    <div class="info-box-inner-container"></div>
  </div>
  
</body>

</html>