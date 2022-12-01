$(document).ready(function(){

    fetch('https://hybrid.concordia.ca/s_hontoy/data_scapes/datascapes_send.php', {
    method: 'get',
          }).then(function(r) {
                  return r.json();
          }).then(function(data) {
            console.log("we receive the data from php");
            writeDataOnBoard(data);
        });

//open the participate section when clicking on the participate button 
$(".participateButton").on("click", function(){
    console.log("button has been clicked")
    $(".participateSection").css("height", "50vh")
    $(this).css("display", "none")
})
//close participate button to close dialogue box
$(".closeParticipateButton").on("click", function(){
    console.log("button has been clicked")
    $(".participateSection").css("height", "0px")
    setTimeout(()=>{
    $(".participateButton").css("display","inline")}, 1000
    )
  
})




})

function writeDataOnBoard(data){
    console.log(data)


    for (let i = 0; i< data.length - 1; i++){
        $(".journalBoard").prepend(`<div class = "singleJournalEntry" id = "journalEntry${[i]}" 
        <h2 class = "singleProductName"> ${data[i].productName} </h2>
        <h3 class = "singlePrice"> ${data[i].price} </h3>
        </div>`)

        //open the img container div
        $(`#journalEntry${[i]}`).append(`<div class = imgsContainer>`)
        let splitImgs = data[i].currentImgs.split(",");
        for (let y = 0; y < splitImgs.length; y++){
            $(`#journalEntry${[i]}`).find(".imgsContainer").append(`<img src="https:${splitImgs[y]}" alt="product Image is no longer available">`)
        }

        //close img container div
        $(`#journalEntry${[i]}`).append(`<div class = textJournalEntry> <p>${data[i].journalEntry}</p> </div>`)
    }
}

