window.onload = (event) => { 

const draw = SVG().addTo('#svg-container').size('100%', '100%')

const rhizomeGrid = document.querySelector("#rhizome-grid")
let rhizomeItems = document.querySelectorAll(".rhizome-grid-item");
let blackoutScreen = document.querySelector("#black-out-screen")
let rhizomeLines = [];
const newSvg = document.createElement(`svg`);

//Draggable
let mouseDown = false;
let mouseX = 0;
let mouseY = 0;
let elementX = 0;
let elementY = 0;

// blackoutScreen.style.backgroundColor = "rgba(0,0,0,1)"
// setTimeout(()=>{
// blackoutScreen.style.display = "none"
// }, 1500)

//For earch rhizome items, interact with them on hover and link them to their specific url
rhizomeItems.forEach((el) => {
   
//Draw lines from the center of all elements once;
let elCenter = getElCenter(el);
let newLine = {el:el, xPos:elCenter.x, yPos:elCenter.y}
rhizomeLines.push(newLine);


    el.addEventListener('mousedown',handleMouseDown);
    el.addEventListener('mouseup',handleMouseUp);
    document.addEventListener('mousemove',handleMouseMove);
    // On mouse enter, make title disappear and pullquote appear
    el.addEventListener("mouseenter", handleMouseEnter)
    //On mouse leave, make pullquote disappear and title appear
    el.addEventListener("mouseleave", handleMouseLeave)

    //when clicked, send user to whatever url attributed to the grid-item clicked
    el.querySelectorAll("button").forEach((btn) =>{
        btn.addEventListener("click", ()=>{
            // console.log("clicked")
        if(!el.classList.contains("grid-item-open-transition")){
            el.querySelector("h1").style.color = "rgba(0,0,0,0)"
            el.querySelector("h2").style.color = "rgba(0,0,0,0)"
        
            el.classList.add("grid-item-open-transition");
    
            setTimeout(()=>{
            el.classList.add("grid-item-focus")
            },750)
           
        } else {
            el.classList.remove("grid-item-open-transition");
            el.classList.add("grid-item-closed")
        }  
         })
        })
    })
    


//Create rhizome lines
    for (let i=0; i<rhizomeLines.length;i++){
        let x1 = rhizomeLines[0].xPos;
        let y1 = rhizomeLines[0].yPos;
        let x2 = rhizomeLines[i].xPos;
        let y2 = rhizomeLines[i].yPos;


        draw.line(x1, y1, x2, y2).stroke({ width: 1, color:'black' })
        // line.plot(50, 30, 100, 150)     
        }
    
function getElCenter(el){
console.log(el)
    let rect = el.getBoundingClientRect();
    let x = rect.left + rect.width/2; 
    let y = rect.top + rect.height/2; 
    return {x, y}
    }


//handle mouse enter (hover effect)
function handleMouseEnter(event){
    if (!event.target.classList.contains("grid-item-open")){
        event.target.classList.add("rhizome-grid-item-hover")
        event.target.querySelector("h1").style.color = "rgba(0,0,0,0)"
        setTimeout(()=>{
            event.target.querySelector(".rhizome-item-hover-screen").style.opacity = "1"
        }, 750)
    }
}
function handleMouseLeave(event){
    if (!event.target.classList.contains("grid-item-open")){
        event.target.classList.remove("rhizome-grid-item-hover")
        event.target.querySelector(".rhizome-item-hover-screen").style.opacity = "0";
        setTimeout(()=>{
        event.target.querySelector("h1").style.color = "rgba(0,0,0,1)"
        }, 750)
    }
}

// 3 following hadnlers from chatGPT: 
    // Handle mouse down event
function handleMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
    elementX = event.target.offsetLeft;
    elementY = event.target.offsetTop;

    //redraw the svg lines; 
    redrawSVG(event);
  }
  // Handle mouse up event
  function handleMouseUp(event) {
    mouseDown = false;
  }
  // Handle mouse move event
  function handleMouseMove(event) {
    if (mouseDown) {
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      event.target.style.left = (elementX + deltaX) + 'px';
      event.target.style.top = (elementY + deltaY) + 'px';
    }
  }

  function redrawSVG(){}
}//window onload



