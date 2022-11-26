
        //runs if the url of the page we are in has "shein" in it (and that the client is on the extension)
        if (document.URL.match("shein")) {
            console.log ("We are on the shein website");
        
            //Extract different information about the product from html elements
            //*will be null unless on a specific product page */

            //name of the product
            let productName = document.getElementsByClassName("product-intro__head-name")[0].innerText;
            
            //main product image
            let mainImg = document.getElementsByClassName("productimg-extend__main-image")[0].getElementsByTagName('img')[0].src;

            //have to get other pictures in a for loop where 0 is i:
            let otherImgs = [];

            //price of the item (is only one number as a string with $ (ex: '13.00$')
            let price = document.getElementsByClassName("product-intro__head-price")[0].getElementsByClassName("original")[0].getElementsByClassName("from")[0].innerText;

            //url of the product page 
            let url = window.location.baseURI
            //let url = window.location.href
        
        
        //Send the information extracted to the extension popup (popup.js)
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
           // console.log(message);
            if(message.name ==="fromPopup"){
                console.log("we send the information to the popup")
                //Send the product name, main image, url and price (all strings)
                sendResponse({name:productName, mainImg:mainImg, url:url, price:price});
            }
          });
        
        }//shein




  