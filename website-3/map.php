<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DATA_SCAPES</title>
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

<div id="map" >

</div>
<div id="sliders-container">
  <div class="toggleMenu">
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
  </div>
    <div class="slider">
      <h1>n-l</h1><input type="range">
    </div>
    <div class="slider">
      <h1>mrct</h1><input type="range">
    </div>
  </div>

</body>

</html>