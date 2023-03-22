window.onload = (event) => { 

let rhizomeItems = document.querySelectorAll(".rhizome-grid-item");
let blackoutScreen = document.querySelector("#black-out-screen")


blackoutScreen.style.backgroundColor = "rgba(0,0,0,1)"
setTimeout(()=>{
blackoutScreen.style.display = "none"
}, 1500)


//For earch rhizome items, interact with them on hover and link them to their specific url
rhizomeItems.forEach((el) => {
    console.log(el)
    // On mouse enter, make title disappear and pullquote appear
    el.addEventListener("mouseenter", ()=>{
       el.querySelector("h1").style.color = "rgba(0,0,0,0)"
       setTimeout(()=>{
        el.querySelector("h2").style.color = "rgba(0,0,0,1)"
       }, 750)
    })
    //On mouse leave, make pullquote disappear and title appear
    el.addEventListener("mouseleave", ()=>{
        el.querySelector("h2").style.color = "rgba(0,0,0,0)"
        setTimeout(()=>{
         el.querySelector("h1").style.color = "rgba(0,0,0,1)"
        }, 750)
     })
//  when clicked, send user to whatever url attributed to the grid-item clicked
     el.addEventListener("click", ()=>{

        el.querySelector("h1").style.color = "rgba(0,0,0,0)"
        el.querySelector("h2").style.color = "rgba(0,0,0,0)"
        el.classList.toggle("grid-item-open");
        setTimeout(()=>{
         window.location.href = `${el.getAttribute("data-url")}`
        }, 1000)
       
     })
    })

}//window onload
