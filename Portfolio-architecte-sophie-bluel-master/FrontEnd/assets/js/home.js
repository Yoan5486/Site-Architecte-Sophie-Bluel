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
    let containerCategories = document.querySelector("#portfolio")
    for (let i = 0; i < dataCategories.lenght; i++) {
        let baliseButton  = document.createElement("button")
        containerCategories.appendChild(baliseButton)
        baliseButton.setAttribute("", dataCategories[i].name) 

    }
    console.log(dataCategories)
}

displayCategories ()


console.log (getWorks ())
console.log(getCategories ())