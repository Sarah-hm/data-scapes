
console.log("we are in the popup")


//When client click "generate product" button, popup fetches the information from content_script.js and writes it in the popup
$(".generateProduct").on("click", function(){
    console.log("button clicked")

    //if the active tab in the current window is used
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        //handshake with content_script so it sends back product information 
        chrome.tabs.sendMessage(tabs[0].id,{name: "fromPopup"}, function (response) {
        
        console.log("message from content ::");
        //response contains all the information fetched in content_script from the product page (mainImg, price, name, url)
        console.log(response);
        
        //remove the button to generate product
        $(".generateProduct").remove()
        
        //Writes the information in the extension popup
        $("#currentProductName").html(`<h1 id = "productName"> ${response.name} </h1>`)

        $("#currentProductMainImg").html(`<img src="${response.mainImg}" alt = "${response.name}" id = "mainImg">`)

        $("#currentProductTextInput").html(`<textarea placeholder = "write your entry here" > </textarea>`)
      })
      });
})

//if the journal button is clicked, create a new tab with the extension url (journal.html)
document.getElementById("journalButton").addEventListener("click", function(){
    var newURL = "chrome-extension://apkdppfalbdncflefignfacofnkmfkdo/journal.html";
    chrome.tabs.create({ url: newURL });
});



// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     console.log("we are listening in the popup")
//     // if (message.name == "isPaused?") {
//     //   sendResponse({value: localStorage.getItem('paused')});
//     // }
//     if(message.name =="sentToPopup.js"){

//         console.log(message.subject)
    
        //console.log($(".currentProduct"))
    


    //   console.log("a message was received");
    //   sendResponse({value: "message is passing"});
  
    //   const dataOne = new FormData();
    //   dataOne.append('username', 'abc123');
    //                fetch('https://hybrid.concordia.ca/srosenbe/phpTestForChrome/fromChrome.php', {
    //                method: 'post',
    //               body: dataOne,
    //                     }).then(function(r) {
    //                             return r.text();
    //                     }).then(function(data) {
    //                       console.log("1222222");
    //                       console.log(data);
    //                   });
//         } // if message
//   });
