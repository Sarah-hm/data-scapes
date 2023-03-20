window.onload = (event) => { 

let datascapesContainer = document.querySelector("#data-scapes-container");
let datascapesContainerOverlay = document.querySelector("#title-overlay-zoom-out")


datascapesContainer.addEventListener("click", () =>{
console.log("scrolled")
datascapesContainer.style.transform = "scale(0.25)"
datascapesContainerOverlay.style.opacity = "1"
//body.style.background = "black"
setTimeout(sendTodatascapesContainer, 2000)
})

}//window onload

function sendTodatascapesContainer(){
 window.location.href = 'index.html';
}