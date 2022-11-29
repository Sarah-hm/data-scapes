
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
        
        //remove the button to generate product
        $(".generateProduct").remove()

        //Writes the information in the extension popup
        $("#currentProductName").html(`<h3 id = "productName"> ${response.productName} </h3>`)

        $("#currentPrice").html(`<h4 id = "productPrice">${response.price}</h4>`)

        let currentImgs = [];
        for (let i = 0; i < response.allImgs.length; i++){
            
            //Go through all the images and only take the one with a specific dimensions to avoid repeats
            if(response.allImgs[i].includes("220x293")){
                currentImgs.push(response.allImgs[i])
            }
        }
// $("#currentProductMainImg").html(`<img src="${response.mainImg}" alt = "${response.name}" id = "mainImg">`)

        for (let i = 0; i < currentImgs.length; i++){
        $("#currentProductMainImg").append(`<img src ="https:${currentImgs[i]}" id = "img${[i]}" class ="currentImgs">`);
        }        

        $("#currentProductTextInput").html(`<textarea id = "productTextarea" placeholder = "write your entry here" > </textarea>`)

        $("#currentSubmitButton").html(`<button id = "submitButton"> submit </button>`)


//When you click submit, the information is stored and sent to the function that sends it to backgroun
        $("#submitButton").on("click", function(){
            //Get the value inside the textArea
           let currentJournalEntry = $("#productTextarea").val()

           console.log(currentJournalEntry);

           //push the response from shein + journal entry to the function (to send to background.js)
            //console.log(response, currentJournalEntry)
            submitJournalEntry(response, currentJournalEntry, currentImgs);
        })


      })
      });
})//generate product




//if the journal button is clicked, create a new tab with the extension url (journal.html)
document.getElementById("journalButton").addEventListener("click", function(){
    var newURL = "chrome-extension://apkdppfalbdncflefignfacofnkmfkdo/journal.html";
    chrome.tabs.create({ url: newURL });
});


//Send information to background. js (product info + journal entry)
function submitJournalEntry(response, journalEntry, currentImgs){
    console.log("message from popup ::");
    console.log(response)
    console.log(journalEntry)
    console.log(currentImgs)
    chrome.runtime.sendMessage({name: "fromPopupToBackground", productName:response.productName, mainImg:response.mainImg, url:response.url, price:response.price, currentImgs:currentImgs, journalEntry: journalEntry }, function (response) {
    })
}//submit journal entry
  


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
