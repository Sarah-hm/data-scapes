// A whole bunch of stuff you probably don't want to mess with
// that just maintains the integrity of the extension in terms
// of the browser function, making the icon toggle, and telling
// the content script whether it can run.
  
  function setPaused(paused) {
    localStorage.setItem('paused', paused);
    updateBadge(paused);
  }
  
  // Set the extension to pause on install
  
  chrome.runtime.onInstalled.addListener(function() {
    setPaused(true);
  });
  

  // Receive messages from the content script
  
//   chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     console.log("we are listening")
//     if (message.name == "isPaused?") {
//       sendResponse({value: localStorage.getItem('paused')});
//     }
//     if(message.name =="fromPopup"){
//         console.log("received from popup")
       
//         chrome.runtime.sendMessage({name: "fromBackground"}, function (response) {
      
//             console.log("message from background ::");
//             console.log(response);
        
//           })
//     //   console.log("a message was received");
//     //   sendResponse({value: "message is passing"});
  
//     //   const dataOne = new FormData();
//     //   dataOne.append('username', 'abc123');
//     //                fetch('https://hybrid.concordia.ca/srosenbe/phpTestForChrome/fromChrome.php', {
//     //                method: 'post',
//     //               body: dataOne,
//     //                     }).then(function(r) {
//     //                             return r.text();
//     //                     }).then(function(data) {
//     //                       console.log("1222222");
//     //                       console.log(data);
//     //                   });
//         } // if message
//   });
  
  // Set the badge to be correct.,
  
//   updateBadge(localStorage.getItem('paused') == true);