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

<button id = "goBackToRhizomeButton"> Go back to the cloud</button>
<div id="map" >

</div>
<div id="sliders-container">
  <div class="toggleMenu">
  <svg id="layersMenuIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
  </div>
  <div id="sliders-subcontainer">
  <div class="slider">
      <h1>n-l layer</h1>
      <div class="infoIcon"><?xml version="1.0" ?><svg id = "nl-info-box-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path  d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg></div>
      <input type="range" value = "0"min = "0" max ="50" id = "native-land-slider">
    </div>
    <div class="slider">
      <h1>mrct layer</h1>
      <div class="infoIcon"><?xml version="1.0" ?><svg id = "mrct-info-box-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path  d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg></div>
      <input type="range" value="0" min = "0" max ="100" id = "mercator-slider">
    </div>
  </div>
  </div>
  
  <div class="info-box" id = "nl-info-box">
    <div class="info-box-inner-container">
      <h1>native-land.ca</h1>
      <p><b>Each shapes situated on the map is a historically native land.</b> Clicking on any of them will send you to its landing page on <a href="https://native-land.ca/">Native-land.ca</a> for you to learn more about that land and its nation. A lot of shapes overlap in time and space, and showcase a another way of approaching a map we are used to seeing arbitrarily cut differently.</p>
      <p>What stories do does shapes tell about the data that's visualized with them?</p>
      <p> 
      The shapes and database they come from are created by <a href="https://native-land.ca/">Native-land.ca</a>, an open-source API. predominantly accounting for nations, treaties and languages in the Americas and currently Anglo-Saxon countries.
      </p>
      <p>
      In their own words, 
      </p>
      <blockquote cite = "https://native-land.ca/">
      "This map does not represent or intend to represent official or legal boundaries of any Indigenous nations. To learn about definitive boundaries, contact the nations in question. Also, this map is not perfect -- it is a work in progress with tons of contributions from the community."
      </blockquote>
    </div>
  </div>

  <div class="info-box" id = "mrct-info-box">
    <div class="info-box-inner-container"> 
    <h1>The Mercator Map Projection</h1>
    <h3>The orange peel problem</h3>
    <p>Geographers have commonly called the issue of having to place a 3D shape (the globe) onto a 2D medium (a flat map) the 'orange peel problem'. Just like a peel, the surface of the earth will have to be split, torn, and distorted in order to fit the desired flat surface of a paper or a screen.</p>
    <p>
    Because of this problem, <b>all maps have been created with some level of distortion</b>, while considering which parts were most important to preserve to scale. 
    </p>
    <h3>the Mercator projection</h3>
    <p>
      <b>The Mercator projection is the most used flat map in the global North.</b> Created in 1569, it places the Greenwich line (UK) at the center of the world. The readability of the map popularized it as the map of choice for water navigation back in the day. While the map stayed faithful to local directions, the lands were increasingly distorted and bigger-than-nature as you moved from the Equateur. This means that continents like Africa, Asia and Central America stay true to size, <b>while Europe, Canada, Russia and Australia become disproportionately enlarged</b>. 
    </p>
    <p>
    Though its general usage has evolved, the Mercator projection has remained our map of choice for most mainstream visualization of mapped information. 
    </p>
    <p>
    <b>What kind of story does the Mercator projection tell</b>about the data that is visualized on it?
    </p>
    </div>
</div>

    <div class="info-box" id = "ds-info-box">
    <div class="info-box-inner-container"></div>
  </div>
  
</body>

</html>