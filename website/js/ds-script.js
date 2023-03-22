window.onload = (event) => { 

let datascapesContainer = document.querySelector("#data-scapes-container");
let datascapesContainerOverlays = document.querySelectorAll(".title-overlay-zoom-out")
let blackoutScreen = document.querySelector("#black-out-screen")
let scrollinstruc = document.querySelector("#scroll-instruction")

//Make scroll instruction appear after a few seconds
setTimeout(()=>{
    scrollinstruc.style.color="rgba(0,0,0,1)"
}, 1000)
blackoutScreen.style.backgroundColor = "rgba(0,0,0,0)";
setTimeout(()=>{
    blackoutScreen.style.display = "none"
})

document.addEventListener("scroll", () =>{
console.log("scrolled")
datascapesContainer.style.transform = "scale(0.25)"
scrollinstruc.style.display = "none"
datascapesContainerOverlays.forEach((el) => {
console.log(el);
el.style.opacity = "1"
})

blackoutScreen.style.display = "inline"
blackoutScreen.style.blackgroundColor = "rgba(0,0,0,1)"
// body.style.background = "black"
setTimeout(sendToRhizomeCloud, 2000)
})

}//window onload

function sendToRhizomeCloud(){
 window.location.href = 'rhizomeCloud.html';
}