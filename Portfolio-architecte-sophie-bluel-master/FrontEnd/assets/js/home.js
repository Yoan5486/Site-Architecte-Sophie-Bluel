document.addEventListener("DOMContentLoaded", async () => {
 
let modalOpen = false

let openedByTxtModifier = false
  
let modal = null

let modalAddPhoto = null

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
    baliseTous.classList.add ("button__categories--tous", "all__buttons", "button__selected")
    baliseTous.addEventListener("click", async () => {
        await displayWorksOnLoad ()
    })

  console.log (dataCategories)
  let datalist = document.getElementById("options")
    for (let i = 0; i < dataCategories.length; i++) {
        let baliseButton  = document.createElement("button")
        containerCategories.appendChild(baliseButton)
        baliseButton.textContent = dataCategories[i].name
        baliseButton.classList.add ("buttons__categories", "all__buttons")
        baliseButton.setAttribute ("categories__id", dataCategories[i].id)
        baliseButton.addEventListener("click", async (event) => {
            const idCategories = event.target.getAttribute ("categories__id") 
            const filteredWorks = await filterWorksByCategories(parseInt (idCategories))
            let containerWorks = document.querySelector(".gallery")
            containerWorks.innerHTML = ''
            console.log(idCategories)
            displayWorks (filteredWorks)
        })
      let option = document.createElement("option")
      option.value = dataCategories[i].name
      datalist.appendChild(option)
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


displayWorksOnLoad ()
 
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
displayWorksOnLoad ()

displayIcon ()

async function openModal() {
  if (!modal) {
      modal = document.querySelector(".modal")
        if (modal) {
          modal.style.display = "block"
          document.body.classList.add("modal__open")
          modalOpen = true
          openedByTxtModifier = true
      }
    }
}

 function closeModal() {
  if (modal) {
      modal.style.display = "none"
      document.body.classList.remove("modal__open")
      modalOpen = false
      openedByTxtModifier = false
      modal = null
      if (modalAddPhoto) {
        modalAddPhoto.style.display = "none"
        modalAddPhoto.style.zIndex = 990
        modalAddPhoto = null
    }
    const modalContain = document.querySelector(".modal__contain")
    if (modalContain) {
        modalContain.classList.remove("first--modal__hidden")
    }
  }
  }

  function openAddPhotoModal() {
    modalAddPhoto = document.querySelector(".modal--photo__contain")
      if (modalAddPhoto) {
        modalAddPhoto.style.display = "flex"
        modalAddPhoto.style.zIndex = 1005
        document.body.classList.add("modal__open")
        modalOpen = true
        const modalContain = document.querySelector(".modal__contain")
        if (modalContain) {
            modalContain.classList.add("first--modal__hidden")
        }
      }
    
}
 const btnModifier = document.querySelector(".txt__modifier")

 btnModifier.addEventListener("click", openModal) 

 const spanClose = document.querySelector(".fa-xmark")

 spanClose.addEventListener("click", closeModal)

 const spanClosePhoto = document.querySelector(".xmark__modal--photo")

  spanClosePhoto.addEventListener("click", closeModal)

const spanArrowLeft = document.querySelector(".fa-arrow-left");

  spanArrowLeft.addEventListener("click", () => {
      closeModal()
      openModal()
  })

 const btnAddPhoto = document.querySelector(".btn__add--photo")

 btnAddPhoto.addEventListener("click", openAddPhotoModal)

 window.addEventListener("click", (event) => {
  const modal = document.querySelector(".modal")
  if (modalOpen && modal && !modal.contains(event.target)) {
    if (!openedByTxtModifier) {
      closeModal()
  } else {
      openedByTxtModifier = false
  }
  }
  })

 const projectsMake = document.querySelector(".projects__sub")
  const galleryFigures = document.querySelectorAll(".gallery figure")
  galleryFigures.forEach((figure) => {
    projectsMake.appendChild(figure)
  })
  

  async function deleteWorkById(workId) {
    try {
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE', 
        headers: {"Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      })
         displayWorksOnModal ()
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'œuvre :', error)
    }
  }
  async function displayWorksOnModal () {
    const projectsMake = document.querySelector(".projects__sub")
    projectsMake.innerHTML = ''
    let dataWorks = await getWorks () 
    for (let i = 0; i < dataWorks.length; i++) { 
      let baliseDiv = document.createElement("div")
      let baliseImg = document.createElement("img")
      let baliseI = document.createElement("i")
      baliseImg.classList.add("img__modal")
      baliseDiv.setAttribute("data-id", dataWorks[i].id)
      projectsMake.appendChild(baliseDiv) 
      baliseDiv.appendChild(baliseImg)
      baliseDiv.classList.add("trash__container")
      baliseI.classList.add("fa-solid", "fa-trash-can")
      baliseDiv.appendChild (baliseI)
      baliseImg.setAttribute ("src", dataWorks[i].imageUrl)
      baliseImg.setAttribute("alt", dataWorks[i].title)
  }
  const trashIcons = document.querySelectorAll(".fa-trash-can")
  console.log(trashIcons)
    trashIcons.forEach((icon) => {
      icon.addEventListener("click", async () => {
          const workId = icon.parentNode.getAttribute("data-id")
          await deleteWorkById(workId)
      })
      console.log(deleteWorkById)
  })
  }

  displayWorksOnModal(await getWorks ())
}





console.log (await getWorks ())
console.log (await getCategories ())

})
