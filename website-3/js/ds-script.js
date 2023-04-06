// window.onload = (event) => {
// url: "index.php",
// type: "get", //send it through get method
// data: {getAjaxOnLoad: "fread"}, //parameter (no form data)

fetch("getData.php")
  .then((response) => response.text())
  .then((data) => {
    //Do something with the data
    // console.log(data);
    let parsedJSON = JSON.parse(data);

    console.log(parsedJSON);
  })
  .catch((error) => console.error(error));
//read from text file:
//   $.ajax({
//     url: "index.php",
//     type: "get", //send it through get method
//     data: { getAjaxOnLoad: "fread" }, //parameter (no form data)
//     success: function (response) {
//       //use the JSON .parse function to convert the JSON string into a Javascript object
//       let parsedJSON = JSON.parse(response);

//       //set the empty line array that is going to create the path
//       let line = [];
//       //  console.log(parsedJSON);
//       for (let i = 0; i < parsedJSON.length - 1; i++) {
//         let lati = parseFloat(parsedJSON[i].latitude);
//         let long = parseFloat(parsedJSON[i].longitude);

//         let coords = { lat: lati, lng: long };
//         line.push(coords);
//       }
//       let webPath = new google.maps.Polyline({
//         path: line,
//         strokeColor: "#F2F2F2",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//       });
//       webPath.setMap(map);
//     }, //SUCCESS
//     error: function () {
//       console.log("error occurred");
//     },
//   });
// };
