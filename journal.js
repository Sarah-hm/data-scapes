chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("we are listening in the journal")
    // if (message.name == "isPaused?") {
    //   sendResponse({value: localStorage.getItem('paused')});
    // }
    if(message.name =="sentToJournal"){


        console.log(message.subject)

        // document.getElementsByClassName("currentProduct")[0].innerHTML
    

        } // if message
  });