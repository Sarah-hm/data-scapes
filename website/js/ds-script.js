window.onload = (event) => { 

let datascapesContainer = document.querySelector("#data-scapes-container");
let datascapesContainerOverlays = document.querySelectorAll(".title-overlay-zoom-out")


document.addEventListener("scroll", () =>{
console.log("scrolled")
datascapesContainer.style.transform = "scale(0.25)"

datascapesContainerOverlays.forEach((el) => {
console.log(el);
el.style.opacity = "1"
})
//body.style.background = "black"
setTimeout(sendToRhizomeCloud, 2000)
})

}//window onload

function sendToRhizomeCloud(){
 window.location.href = 'rhizomeCloud.html';
}