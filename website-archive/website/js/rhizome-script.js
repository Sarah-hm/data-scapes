window.onload = (event) => { 

const draw = SVG().addTo('#svg-container').size('100%', '100%')

const rhizomeGrid = document.querySelector("#rhizome-grid")
let rhizomeItems = document.querySelectorAll(".rhizome-grid-item");
let blackoutScreen = document.querySelector("#black-out-screen")
let rhizomeLines = [];
const newSvg = document.createElement(`svg`);

// blackoutScreen.style.backgroundColor = "rgba(0,0,0,1)"
// setTimeout(()=>{
// blackoutScreen.style.display = "none"
// }, 1500)

//For earch rhizome items, interact with them on hover and link them to their specific url
rhizomeItems.forEach((el) => {
   
    //Change title to pullquote and make div bigger when mouseover
    // el.addEventListener("mouseover", ()=>{
    //    if (!el.classList.contains("grid-item-open")){
    //         el.classList.toggle("rhizome-grid-item-hover")
    //     }
    // })

//Calculate rhizome Lines links coordinates and push them in array
let elCenter = getElCenter(el);
console.log(elCenter.x, elCenter.y)

let newLine = {el:el, xPos:elCenter.x, yPos:elCenter.y}
rhizomeLines.push(newLine);
console.log(rhizomeLines);




    // On mouse enter, make title disappear and pullquote appear
    el.addEventListener("mouseenter", ()=>{
        if (!el.classList.contains("grid-item-open")){
            el.classList.add("rhizome-grid-item-hover")
            el.querySelector("h1").style.color = "rgba(0,0,0,0)"
            setTimeout(()=>{
             el.querySelector("h2").style.color = "rgba(0,0,0,1)"
            }, 750)
        }
    })
    //On mouse leave, make pullquote disappear and title appear
    el.addEventListener("mouseleave", ()=>{
        if (!el.classList.contains("grid-item-open")){
            el.classList.remove("rhizome-grid-item-hover")
            el.querySelector("h2").style.color = "rgba(0,0,0,0)"
            setTimeout(()=>{
             el.querySelector("h1").style.color = "rgba(0,0,0,1)"
            }, 750)
        }
     })
//  when clicked, send user to whatever url attributed to the grid-item clicked
     el.addEventListener("click", ()=>{

        let elGridPlacement = el.getAttribute("data-url");

    
    if(!el.classList.contains("grid-item-open-transition")){
        el.querySelector("h1").style.color = "rgba(0,0,0,0)"
        el.querySelector("h2").style.color = "rgba(0,0,0,0)"
    
       
        el.classList.add("grid-item-open-transition");

        setTimeout(()=>{
        el.classList.remove(`${elGridPlacement}`)
        el.classList.add("grid-item-focus")
        },750)
       
    } else {
        el.classList.remove("grid-item-open-transition");

        el.classList.add("grid-item-closed")
        // el.classList.add(`${elGridPlacement}`)
    }

       
     })
    })

    //Create rhizome lines
    for (let i=0; i<rhizomeLines.length;i++){



    let x1 = rhizomeLines[0].xPos;
    let y1 = rhizomeLines[0].yPos;
    let x2 = rhizomeLines[1].xPos;
    let y2 = rhizomeLines[1].yPos;



    draw.line(x1, x2, y1, y2).stroke({ width: 1, color:'black' })
    // line.plot(50, 30, 100, 150)
    
    
    }


    function getElCenter(el){
    
            console.log(el)
            let rect = el.getBoundingClientRect();
            let x = rect.left + rect.width/2; 
            let y = rect.top + rect.height/2; 
            return {x, y}
    
    }

}//window onload


