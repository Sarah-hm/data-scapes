<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DATA_SCAPES</title>
    <link rel="icon" type="image/x-icon" href="assets/ds-logo.png">
    <link rel="stylesheet" href="style/rhizome-style.css" />
    <script type="module">
      import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
      //To be added in the class I add the D3s in 
    </script>
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
    <script src="js/rhizome-script.js"></script>
    <script src="js/Rhizome-item.js"></script>
    <script src="js/line.js"></script>
    <script src="js/ds-script.js"></script>
</head>
<body>
<div id="black-out-screen"></div>
<div class = "infoIcon" id="rhizome-info-icon"><svg id = "rhizome-info-box-icon" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path  d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg></div>
<div class="info-box" id = "rhizome-info-box">
    <div class="info-box-inner-container">
    <h1>data-scapes' conceptual rhizome</h1>
    <h4>is an exploration of new methodologies of knowledge sharing and information propagation</h4>

    <p>The cloud of nodes that populate data-scapes' landing page <b>are the main inspirations behind the project.</b> They are authors, books, chapters, events or other projects that have fed into what data-scapes is. Not only that, The strings linking some nodes are conceptual bridges between sources; they visualize an overlap of some kind between the two.</p>
    <p>You can explore these ndoes however you want to. <b>Click on one to read more about the resource and how it impacted data-scapes.</b>  If you find the information interesting, feel free to follow the node's linked string to find out how they relate to other resources, or simply pick another one.</p>
    <p><span>Click on the data-scapes' node to continue on to the project's main page.</span> </p>
    <!-- <p>Though diverse, these sources often require levels of attention and specialization </p> -->

    </div>
  </div>

<div class="info-box" id = "ds-info-box">
    <div class="info-box-inner-container">
        <h1>Share your geolocation and go to data-scapes</h1>
  <h4>data-scapes explores the different stories our data say about us; the ones that are collected and the information that can be inferred from the former.</h4>
  <p>When continuing to data-scapes,<span >you will be asked to share your geolocation.</span>  <b>If you accept,</b> information on your latitude and longitude coordinates will be entered in data-scapes' database and impact its visual output. <b>If you decline,</b> public information about your internet provider's closest headquarter's geolocation will be entered instead of your own.</p>
  <p>Further <span>publically found information based on those two data points will be inferred</span>, such as the weather, the timezone, or your streetname.</p>
  <p><span>Other websites are aware of these information, and so much more. </span> <b> Do you want to see how little you know they know?</b> </p>
  <div id="button-ctn">
  <button id="ds-popup-go-back-btn">Go back</button>
  <button id="share-personal-geolocation">Go to data-scapes</button>
  </div>
    </div>
  </div>




<div id="rhizome-cloud-container">
      <div id="svg-container">
      </div>
    </div>
</body>

</html>