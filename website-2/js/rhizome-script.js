window.onload = (event) => { 

const draw = SVG().addTo('#svg-container').size('100%', '100%')

const rhizomeCloud = document.querySelector("#rhizome-cloud-container")
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


//fetch data from the literature review json file and write them as rhizome items on the screen (at a random point)
    //fetch data by chatGPT
    fetch('data/literature-review.json')
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<data.length;i++){

            //create a new div for every literature review item with a specific data attribute and random position
            let newDiv = document.createElement("div")

            console.log(data[i].dataAtt)
            
            // add a rhizome grid class and their specific data attribute (name)
            newDiv.classList.add("rhizome-grid-item");
            newDiv.setAttribute(`data-att`,`${data[i].dataAtt}`);

            // set random position in x,y 
            let leftPos = Math.floor(Math.random() * window.innerWidth) + 'px';
            let topPos = Math.floor(Math.random() * window.innerHeight) + 'px';

            newDiv.style.position = "fixed"
            newDiv.style.transition = "transform 1s"
            newDiv.style.left =  leftPos;
            newDiv.style.top = topPos;

            // create an empty h1 and append it to the new div
            let title = document.createElement("h1");
            newDiv.appendChild(title)
          
            //append new div to the rhizome cloud
            rhizomeCloud.appendChild(newDiv)

            //append a hover div (pullquote and button) on the previously created div
            let container = document.querySelector(`[data-att="${data[i].dataAtt}"]`)
            let newDivHoverScreen = document.createElement("div")

            newDivHoverScreen.classList.add("rhizome-item-hover-screen");
            container.appendChild(newDivHoverScreen)

            //put a h2 and button in all hover screen
            let hoverScreenContainer = document.querySelector(`[data-att="${data[i].dataAtt}"]`).querySelector(".rhizome-item-hover-screen")
            let pullquote = document.createElement("h2");
            let btn = document.createElement("button")
    
            hoverScreenContainer.appendChild(pullquote)
            hoverScreenContainer.appendChild(btn)

            //Populate all elements with data from json file
            container.querySelector("h1").innerText = data[i].title;
            container.querySelector("h2").innerText = data[i].pullquote
            container.querySelector("button").innerText = `Learn more`

            let centercoords = getElCenter(container);
            data[i].xPos = centercoords.x; 
            data[i].yPos = centercoords.y;

            //hover state + draggable + button click to change state
            container.addEventListener('mousedown',handleMouseDown);
            container.addEventListener('mouseup',handleMouseUp);
            document.addEventListener('mousemove',handleMouseMove);
            // On mouse enter, make title disappear and pullquote appear
            container.addEventListener("mouseenter", handleMouseEnter)
            //On mouse leave, make pullquote disappear and title appear
            container.addEventListener("mouseleave", handleMouseLeave)       
            

            //draw lines between rhizomes
        
        }

        drawRhizomeLinks(data);

    })
    .catch(error => console.error(error));

  
function getElCenter(el){
// console.log(el)
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
  }
  // Handle mouse up event
  function handleMouseUp(event) {
    mouseDown = false;
  }
  // Handle mouse move event
  function handleMouseMove(event) {

    if (event.target.classList.contains("rhizome-grid-item")){
    
    if (mouseDown) {
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      event.target.style.left = (elementX + deltaX) + 'px';
      event.target.style.top = (elementY + deltaY) + 'px';

    drawBackgroundShape(event.target)
    }
    }

  }

  function drawBackgroundShape(el){

    // console.log(el)
   coords = getElCenter(el);
    // console.log(coords)    

    // polygon.plot([[coords.x+50,coords.y], [coords.x+100,coords.y+50], [coords.x+50,coords.y+100], [coords.x,coords.y+50]]) 


  }

function handleSVGmouseMove(event){
// console.log(event.target)
}

function drawRhizomeLinks(data){

    let rhizomeItems = document.querySelectorAll(".rhizome-grid-item");

    console.log(data)
    for (let i = 0; i<data.length;i++){
        if (data[i].link.includes('visual-complexity')){
            let target = document.querySelector('[data-att="visual-complexity"]')
            targetCoords = getElCenter(target);
            console.log(targetCoords)

            drawLine(data[i].xPos, data[i].yPos, targetCoords.x, targetCoords.y)
        }
    }
    // if (data.link.includes('visual-complexity')){
    //     console.log("visual complexity link")
    // }

    // let coords = getElCenter(container);
    
    // let polygon = draw.polygon(`${coords.x+50},${coords.y} ${coords.x+100},${coords.y+50} ${coords.x+50},${coords.y+100} ${coords.x},${coords.y+50}`)
    // polygon.fill('#f06')
}

function drawLine(x1, y1, x2, y2){
    console.log(x1, y1, x2, y2)
    draw.line(x1, y1, x2, y2).stroke({ width: 1, color:'black' })

    // line.plot(50, 30, 100, 150)     

}


}//window onload



