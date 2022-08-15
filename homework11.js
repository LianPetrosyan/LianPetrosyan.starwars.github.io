let planets = document.getElementById("planets")
let spaceships = document.getElementById("spaceships")
let vehicles = document.getElementById("vehicles")
let people = document.getElementById("people")
let films = document.getElementById("films")
let species = document.getElementById("species")
let divForData = document.getElementsByClassName("for-data")[0]

planets.addEventListener("click", onClick)
spaceships.addEventListener("click", onClick)
vehicles.addEventListener("click", onClick)
people.addEventListener("click", onClick)
films.addEventListener("click", onClick)
species.addEventListener("click", onClick)

let rootURL = "https://swapi.dev/api/"
let clickedEl = document.querySelectorAll('.clicked')[0]
let data

function onClick(){
    if(clickedEl === undefined){
        this.classList.add("clicked")
        clickedEl = document.querySelector('.clicked')
        drawOnClick()
    }
    else{
        clickedEl.classList.remove("clicked")
        this.classList.add("clicked")
        clickedEl = this
        drawOnClick()
    }
}

async function drawOnClick(){
    divForData.innerHTML = ""
    let response = await fetch(`${rootURL}${clickedEl.innerHTML.toLowerCase()}`)
    data = await response.json()
    data.results.forEach(el => {
        let names = document.createElement("h2")
        names.append(el.name || el.title)
        names.classList.add("data-names")
        divForData.append(names)
        names.addEventListener("click", drawInfo)
    })
}

function drawInfo(e){
    divForData.innerHTML = ""
    let dataDetails = data.results.find(el=> el.name || el.title === e.target.innerText)
    for (let [key, val] of Object.entries(dataDetails)){
        let dataDetailsInfo = document.createElement("li")
        dataDetailsInfo.append(`${key.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())} : ${val}`)
        divForData.append(dataDetailsInfo)
        dataDetailsInfo.classList.add("data-details")
    }
}