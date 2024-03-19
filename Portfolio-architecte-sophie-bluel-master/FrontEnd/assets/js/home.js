console.log ("test")

async function getWorks () {
    const response = await fetch ("http://localhost:5678/api/works")

    return await response.json ()
}

async function getCategories () {
    const response = await fetch ("http://localhost:5678/api/categories")

    return await response.json ()
}

let dynamicProjects = document.querySelector(".gallery")

let baliseFigure = document.createElement("figure", "img", "figcaption")

baliseFigure.img.setAttribute ("alt", "src")

dynamicProjects.forEach(function getWorks() {

    for (let i = 0; i < array.length; i++) { 
       
    }


});

console.log (getWorks ())
console.log(getCategories ())