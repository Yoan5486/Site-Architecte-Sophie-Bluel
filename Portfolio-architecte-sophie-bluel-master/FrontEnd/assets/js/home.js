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

    let data = await response.json ()
    console.log(data)
    return data
}


async function displayWorks (data) {
    console.log(data)
    let containerWorks = document.querySelector(".gallery")
    containerWorks.innerHTML = ''
    for (let i = 0; i < data.length; i++) { 
        let baliseFigure = document.createElement("figure")
        let baliseImg = document.createElement("img")
        let baliseFigcaption = document.createElement("figcaption")
        baliseFigure.setAttribute("data-id", data[i].id)
        containerWorks.appendChild (baliseFigure) 
        baliseFigure.appendChild (baliseImg)
        baliseFigure.appendChild (baliseFigcaption)
        baliseImg.setAttribute ("src", data[i].imageUrl)
        baliseImg.setAttribute("alt", data[i].title)
        baliseFigcaption.textContent = data[i].title
    }

}

displayWorks (getWorks ())
async function displayWorksOnLoad () {
    const dataWorks = await getWorks()
    await displayWorks(dataWorks)
}


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
    baliseTous.classList.add ("all__buttons")
    baliseTous.classList.add ("button__selected")

    baliseTous.addEventListener("click", async () => {
        displayWorksOnLoad ()
    })
console.log (dataCategories)
    for (let i = 0; i < dataCategories.length; i++) {
        let baliseButton  = document.createElement("button")
        containerCategories.appendChild(baliseButton)
        baliseButton.textContent = dataCategories[i].name
        baliseButton.classList.add ("buttons__categories")
        baliseButton.classList.add ("all__buttons")
        baliseButton.setAttribute ("categories__id", dataCategories[i].id)
        baliseButton.addEventListener("click", async (event) => {
            const idCategories = event.target.getAttribute ("categories__id") 
            const filteredWorks = await filterWorksByCategories(parseInt (idCategories))
            let containerWorks = document.querySelector(".gallery")
            containerWorks.innerHTML = ''
            console.log(idCategories)
            displayWorks (filteredWorks)
        })
    }
let allButtons = document.querySelectorAll(".all__buttons")
allButtons.forEach((button) => {
    button.addEventListener("click", () => {
       allButtons.forEach((btn) => {
        btn.classList.remove('button__selected')
    })
    button.classList.add('button__selected')
    })
})
    }  



 
displayWorks (getWorks())
displayCategories ()


function logout() {
    localStorage.removeItem("authToken")
    window.location.href = "login__page.html"
}

const loginLink = document.querySelector("#login__link")
loginLink.addEventListener("click", logout)
const authToken = localStorage.getItem("authToken")
if (authToken) {
    
    loginLink.textContent = "logout"
    async function displayIcon() {
        const banner = document.createElement("div")
        banner.classList.add("banner")
        const modeEdition = document.createElement("span")
        modeEdition.textContent = "Mode édition"
        modeEdition.classList.add("txt__mode--edition")
        banner.appendChild(modeEdition)
        const iconContainer = document.createElement("div")
        iconContainer.classList.add("icon__container")
        banner.appendChild(iconContainer)
        const icon = document.createElement("i")
        icon.classList.add("fa-regular", "fa-pen-to-square")
        iconContainer.appendChild(icon)
        const txtModifier = document.createElement("span")
        txtModifier.textContent = "modifier"
        txtModifier.classList.add("txt__modifier")
        const logotxtModifier = document.createElement("i") 
        logotxtModifier.classList.add("fa-regular", "fa-pen-to-square", "logo__txt--modifier")
        txtModifier.appendChild(logotxtModifier)
        const txtMesprojets = document.querySelector("#portfolio h2")
        txtMesprojets.appendChild(txtModifier)
        document.body.insertBefore(banner, document.body.firstChild)
}

displayIcon ()
 const modal = document.getElementById("modal")
 const btnModifier = document.querySelector(".txt__modifier")

 const spanClose = document.querySelector(".modal__close")

 btnModifier.addEventListener("click", () => {
    if (!modalOpen) {
        modal.style.display = "block"
        modalOpen = true
      }
 })

 spanClose.addEventListener("click", () => {
    if (modalOpen) {
        modal.style.display = "none"
        modalOpen = false
      }
 })

 window.addEventListener("click", (event) => {
   if (event.target === modal) {
     modal.style.display = "none"
     modalOpen = false
   }
 })   

const projectsMake = document.querySelector(".projects__sub")
  const galleryFigures = document.querySelectorAll(".gallery figure")
  galleryFigures.forEach((figure) => {
    projectsMake.appendChild(figure)
  })
  
  const trashIcon = document.querySelector(".trash__icon")
  trashIcon.addEventListener("click", async () => {
    const workId = workData.id
      await deleteWorkById(workId)
      baliseFigure.remove()
  })
  baliseFigure.appendChild(trashIcon)
  return baliseFigure

  async function deleteWorkById(workId) {
    try {
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE'
      })
      const dataDelete = await response.json()
      console.log(dataDelete)
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'œuvre :', error)
    }
  }

}

displayWorksOnLoad ()


console.log (await getWorks ())
console.log (await getCategories ())

})