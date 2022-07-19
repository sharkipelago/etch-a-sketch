const container = document.getElementById("container");
const header = document.getElementById("header-text");
const containerSize = 720;

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function highlight(event){
    element = event.target;
    if (element.classList.contains("active")){
        if (parseInt(element.getAttribute("data-hover-amount")) === 0){
            return;
        }

        const newHoverAmount = parseInt(element.getAttribute("data-hover-amount")) - 1;
        if (newHoverAmount === 0){
            element.style.backgroundColor = "#000000";
            return;
        }
        element.style.backgroundColor = darken(element.getAttribute("data-rgb"), newHoverAmount)
        element.setAttribute("data-hover-amount", newHoverAmount);
    }
    else{
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
        element.style.backgroundColor = randomColor;
        element.classList.add("active");
        element.setAttribute("data-rgb", randomColor);
        element.setAttribute("data-hover-amount", 10);
    }

}

function darken(hex, multiplier){
    let rgb = hexToRgb(hex);
    return `rgb(${(rgb.r/10) * multiplier}, ${(rgb.g/10) * multiplier}, ${(rgb.b/10) * multiplier})`;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createSquares(size){
    removeAllChildNodes(container);

    for (let i = 0; i < size; i++){
        const row = document.createElement("div");
        row.classList.add("row")
        for (let j = 0; j < size; j++){
            const newSquare = document.createElement("div");
            newSquare.classList.add("square");
            newSquare.style.width = `${containerSize/size}px`;
            newSquare.style.height = `${containerSize/size}px`;
            newSquare.addEventListener("mouseover", highlight)
            row.appendChild(newSquare);
        }
        container.appendChild(row);
    }
}



function gridSizePrompt(){
    let response = prompt("Enter grid size between 0 and 100", "16");
    let text;
    if(response == null){
        return;
    }
    else if (isNaN(response)) {
        text = "Please enter a real number";
    } 
    else if (parseInt(response) < 0 || parseInt(response)> 100){
        text = "Please enter a number between 0 and 100"
    }
    else {
        text = `${response} x ${response}`;
        createSquares(parseInt(response));
    }
    header.textContent = text;
}

function setUpButton(){
    const newGridButton = document.getElementById("new-grid-btn");
    newGridButton.addEventListener("click", gridSizePrompt)    

}


setUpButton();
createSquares(16);
