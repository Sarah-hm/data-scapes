window.addEventListener("load", () => {
    console.log("hello")
    // === Declare variables: ===
    //colors
    
    let lightGrey = "rgba(241,241,242,1)"
    let grey = "rgba(128,129,132,1)";
    let black = "rgba(35,31,32,1)";

    let green = "rgba(43,182,115,1)";
    let pink = " rgba(236,0,140,1)";
    let orange = "rgba(240,90,40,1)";
    let purple = "rgba(127,63,151,1)";
    let yellow = "rgba(255,221,21,1)";

    let allColors = [green,pink,orange,purple,yellow];

    //html elements
    const headerSubtitle = document.querySelector("#headerSubtitle");
    let headerBtns = document.querySelectorAll(".header-btn");

    let styleguideBtn = document.querySelector(".styleguide-btn")
    let styleguideSection = document.querySelector("#styleguide-section")

    console.log(headerSubtitle)
    headerSubtitle.addEventListener("mouseover",() => {
  
        let randomColor = Math.floor(Math.random() * allColors.length);
        let newColor = allColors[randomColor];
        headerSubtitle.style.color = newColor;
        })

        headerBtns.forEach(function(el){ 
            let btn = el.getAttribute('id')
            console.log(btn)
            el.addEventListener('mouseenter',() => {
                console.log("mouse is enter")
                let randomColor = Math.floor(Math.random() * allColors.length);
                let newColor = allColors[randomColor];
                el.style.border = `solid 4px ${newColor}`;

            }) //Clicked visualization button 
            el.addEventListener('mouseleave',() => {
                let newColor = grey;
                el.style.border = `solid 4px ${newColor}`;
            }) //Clicked visualization button 
        })

    // styleguideBtn.addEventListener(`click`, ()=>{
    //     styleguideSection.classList.toggle("header-section-open")
    // })


  });