window.onload = (event) => { 



const draw = SVG().addTo('#svg-container').size('100%', '100%')

const rhizomeCloud = document.querySelector("#rhizome-cloud-container")
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
            data[i].xPos = Math.floor(Math.random() * window.innerWidth) + 'px';
            data[i].yPos = Math.floor(Math.random() * window.innerHeight) + 'px';

            newDiv.style.left =  data[i].xPos;
            newDiv.style.top = data[i].yPos;

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

            //hover state + draggable + button click to change state
            container.addEventListener('mousedown',handleMouseDown);
            container.addEventListener('mouseup',handleMouseUp);
            document.addEventListener('mousemove',handleMouseMove);
            // On mouse enter, make title disappear and pullquote appear
            container.addEventListener("mouseenter", handleMouseEnter)
            //On mouse leave, make pullquote disappear and title appear
            container.addEventListener("mouseleave", handleMouseLeave)       
            

            //draw lines between rhizomes
            drawLines(container);
            

        }
    })
    .catch(error => console.error(error));


function drawLines(el){
    let coords = getElCenter(el);
    
    let polygon = draw.polygon(`${coords.x+50},${coords.y} ${coords.x+100},${coords.y+50} ${coords.x+50},${coords.y+100} ${coords.x},${coords.y+50}`)
    polygon.fill('#f06')


}



draw.on('mousemove', handleSVGmouseMove);

//For earch rhizome items, interact with them on hover and link them to their specific url
rhizomeItems.forEach((el) => {

    let coords = getElCenter(el);
    // console.log(coords)

    let polygon = draw.polygon(`${coords.x+50},${coords.y} ${coords.x+100},${coords.y+50} ${coords.x+50},${coords.y+100} ${coords.x},${coords.y+50}`)
    polygon.fill('#f06')


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
    // console.log(event.target)
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

    polygon.plot([[coords.x+50,coords.y], [coords.x+100,coords.y+50], [coords.x+50,coords.y+100], [coords.x,coords.y+50]]) 


  }



function handleSVGmouseMove(event){
// console.log(event.target)
}


}//window onload



