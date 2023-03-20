window.onload = (event) => { 

let datascapesContainer = document.querySelector("#data-scapes-container");
let datascapesContainerOverlays = document.querySelectorAll(".title-overlay-zoom-out")




datascapesContainerOverlays.forEach((el) => {
    console.log(el)
    el.addEventListener("mouseenter", ()=>{
       el.querySelector("h1").style.color = "rgba(0,0,0,0)"
       setTimeout(()=>{
        el.querySelector("h2").style.color = "rgba(0,0,0,1)"
       }, 750)
    })
    el.addEventListener("mouseleave", ()=>{
        el.querySelector("h2").style.color = "rgba(0,0,0,0)"
        setTimeout(()=>{
         el.querySelector("h1").style.color = "rgba(0,0,0,1)"
        }, 750)
     })


    })



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