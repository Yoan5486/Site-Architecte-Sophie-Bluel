async function getWorks () {
    const response = await fetch ("http://localhost:5678/api/works")

    return await response.json ()
}

async function displayWorks () {
    const dataWorks = await getWorks ()
    let containerWorks = document.querySelector(".gallery")
    for (let i = 0; i < dataWorks.length; i++) { 
        let baliseFigure = document.createElement("figure")
        let baliseImg = document.createElement("img")
        let baliseFigcaption = document.createElement("figcaption")
        containerWorks.appendChild (baliseFigure) 
        baliseFigure.appendChild (baliseImg)
        baliseFigure.appendChild (baliseFigcaption)
        baliseImg.setAttribute ("src", dataWorks[i].imageUrl)
        baliseImg.setAttribute("alt", dataWorks[i].title)
        baliseFigcaption.textContent = dataWorks[i].title
    }
    console.log(dataWorks)
}

displayWorks ()

async function getCategories () {
    const response = await fetch ("http://localhost:5678/api/categories")

    return await response.json ()
}


async function displayCategories () {
    const dataCategories = await getCategories ()
    let containerCategories = document.querySelector(".container__filter")
    let baliseTous = document.createElement("button")
    containerCategories.appendChild(baliseTous)
    baliseTous.textContent = "Tous"
    baliseTous.classList.add ("button__categories--tous")
    for (let i = 0; i < dataCategories.length; i++) {
        let baliseButton  = document.createElement("button")
        containerCategories.appendChild(baliseButton)
        baliseButton.textContent = dataCategories[i].name
        baliseButton.classList.add ("buttons__categories")
    }

let baliseButton2 = document.querySelector(".button__categories")    
containerCategories.appendChild(baliseButton2)


baliseTous.addEventListener("click", () => {
    set (has)/*creation d'une fonction ?
    baliseTous.classList.add ("button__categories--tous:hover")*/
    document.button.insertAdjacentElement('hover', baliseTous)
    baliseTous.classList.remove ("button__categories--tous")
})
  
baliseButton2.addEventListener("click", () => {
    baliseButton2.classList.add ("button__categories:hover")
    baliseButton2.classList.remove ("button__categories")
})

    console.log(baliseTous)
    console.log(baliseButton)
    console.log(dataCategories)
}

displayCategories ()


console.log (getWorks ())
console.log(getCategories ())