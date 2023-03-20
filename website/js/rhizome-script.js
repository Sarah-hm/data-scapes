window.onload = (event) => { 

let datascapesContainer = document.querySelector("#data-scapes-container");
let datascapesContainerOverlays = document.querySelectorAll(".rhizome-grid-item")




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
     console.log(el.getAttribute("data-url"))
     el.addEventListener("click", ()=>{
        window.location.href = `${el.getAttribute("data-url")}`
     })
    })

}//window onload

function sendTodatascapesContainer(){
 window.location.href = 'index.html';
}