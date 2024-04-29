document.addEventListener("DOMContentLoaded", async () => {
    async function filterWorksByCategories(idCategories) {
    const dataWorks = await getWorks()
    const filteredWorks = dataWorks.filter(work => work.categoryId === idCategories)
    console.log(filteredWorks)
    console.log(idCategories)
    return filteredWorks
}

async function getWorks () {
    const response = await fetch ("http://localhost:5678/api/works")
    const data = await response.json ()
    console.log(data)
    return data
}

async function getCategories () {
    const response = await fetch ("http://localhost:5678/api/categories")

    return await response.json ()
}

async function displayWorksOnLoad () {

    try {
     const dataWorks = await getWorks();
            displayWorks(dataWorks)
         }
        catch (error) {
             console.error("Erreur lors du chargement des travaux:", error)
         }
}

function displayWorks(data) {
    const containerWorks = document.querySelector(".gallery")
    containerWorks.innerHTML = ''
   data.forEach(work => {
        const baliseFigure = document.createElement("figure")
        const baliseImg = document.createElement("img")
        const baliseFigcaption = document.createElement("figcaption")
        baliseImg.setAttribute ("src", work[i].imageUrl)
        baliseImg.setAttribute("alt", work[i].title)
        baliseFigcaption.textContent = work[i].title
        baliseFigure.appendChild (baliseImg)
        baliseFigure.appendChild (baliseFigcaption)
        containerWorks.appendChild (baliseFigure) 
    
   })
}

async function displayCategories () {
    try {
    const dataCategories = await getCategories ()
    const containerCategories = document.querySelector(".container__filter")
    const baliseTous = document.createElement("button")
    baliseTous.textContent = "Tous"
    baliseTous.classList.add ("button__categories--tous", "all__buttons", "button__selected")
    containerCategories.appendChild(baliseTous)
    baliseTous.addEventListener("click", async () => {
        displayInitialWorks()
    })

   dataCategories.forEach(category => {
        const baliseButton  = document.createElement("button")
        baliseButton.textContent = category.name
        baliseButton.classList.add ("buttons__categories", "all__buttons")
        baliseButton.setAttribute ("categories__id", category.id)
        containerCategories.appendChild(baliseButton)
  
    baliseButton.addEventListener("click", async () => {
    const allButtons = document.querySelectorAll(".all__buttons")
    allButtons.forEach(btn => btn.classList.remove('button__selected'))
    baliseButton.classList.add('button__selected')
    const idCategories = parseInt(button.getAttribute("categories__id"))
    const filteredWorks = await filterWorksByCategories(idCategories)
    displayWorks (filteredWorks)
    }) 
 })
} catch (error) {
    console.error("Erreur lors du chargement des catégories:", error)
}
}



async function displayInitialWorks() {
    try {
        const dataWorks = await getWorks()
        displayWorks(dataWorks)
    } catch (error) {
        console.error("Erreur lors du chargement des travaux initiaux:", error);
    }
  }

displayInitialWorks()
displayCategories()

function logout() {
    localStorage.removeItem("authToken")
    window.location.href = "login__page.html"
}
const loginLink = document.querySelector("#login__link")
loginLink.addEventListener("click", logout)
const authToken = localStorage.getItem("authToken")
if (authToken) {
    
    loginLink.textContent = "logout"
    const banner = document.createElement("div")
    banner.style.backgroundColor = "black"
    banner.style.height = "59px"
    banner.style.display = "flex"
    banner.style.alignItems = "center"
    banner.style.justifyContent = "center"
    const modeEdition = document.createElement("span")
    modeEdition.textContent = "Mode édition"
    modeEdition.classList.add("txt__mode--edition")
    banner.appendChild(modeEdition)
    const icon = document.createElement("i")
    icon.classList.add("fa-regular", "fa-pen-to-square")
    banner.appendChild(icon)
    const txtModifier = document.createElement("span")
    txtModifier.appendChild(icon)
    txtModifier.textContent = "modifier"
    txtModifier.style.fontSize = "14px"
    txtModifier.style.fontFamily = "work-sans"
    const txtMesprojets = document.querySelector("#portfolio h2")
    txtMesprojets.appendChild(txtModifier)
    document.body.insertBefore(banner, document.body.firstChild)
}
 
console.log (await getWorks ())
console.log (await getCategories ())

})