document.addEventListener("DOMContentLoaded", async () => {

// Variables globales pour la gestion des modales

let modalOpen = false
let openedByTxtModifier = false
let modal = null
let modalAddPhoto = null

  // Fonction pour filtrer les œuvres par catégorie

async function filterWorksByCategories(idCategories) {
    const dataWorks = await getWorks()
    const filteredWorks = dataWorks.filter(work => work.categoryId === idCategories)
    console.log(filteredWorks)
    console.log(idCategories)
    return filteredWorks
}
 // Fonction pour récupérer les œuvres depuis l'API

async function getWorks () {
    const response = await fetch ("http://localhost:5678/api/works")
    let data = await response.json ()
    console.log(data)
    return data
}
 // Fonction pour afficher les œuvres dans la galerie

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

 // Fonction pour récupérer et afficher les œuvres au chargement

async function displayWorksOnLoad () {
    const dataWorks = await getWorks()
    await displayWorks(dataWorks)
}

// Fonction pour récupérer les catégories depuis l'API
async function getCategories () {
    const response = await fetch ("http://localhost:5678/api/categories")
    return await response.json ()
}

 // Fonction pour afficher les catégories et configurer les filtres
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

 // Suite de la fonction pour configurer les filtres
  
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
    }

 // Code pour l'aspect au clic des boutons

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

// Appel initial pour afficher les œuvres et les catégories

displayWorksOnLoad ()
displayWorks (getWorks())
displayCategories ()

 // Fonction de déconnexion

function logout() {
    localStorage.removeItem("authToken")
    window.location.href = "login__page.html"
}

   // Gestion du lien de connexion/déconnexion

const loginLink = document.querySelector("#login__link")
loginLink.addEventListener("click", logout)
const authToken = localStorage.getItem("authToken")
if (authToken) {

      // Affichage des icônes d'édition si l'utilisateur est authentifié

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
 // Affichage des œuvres et des icônes d'édition

displayWorksOnLoad ()
displayIcon ()

  // Fonction pour gérer l'ouverture de la modale principale

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
  // Fonction pour gérer la fermeture des modales

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
        modalContain.classList.remove("hidden")
    }

   // Réinitialiser la valeur de l'input file
  
   if (fileInput) {
    fileInput.value = ''
    }
  
    // Enlever le contenu ajouté après l'input

    const imgPreview = document.querySelector(".img__preview")
    const rulesPhoto = document.querySelector(".rules__photo")
    const btnPhoto = document.querySelector(".btn__photo")

    if (imgPreview) {
        imgPreview.classList.remove("img__preview")
        imgPreview.classList.add("img__none")
        imgPreview.src = "./assets/icons/picture-svgrepo-com 1.png"
    }
    if (rulesPhoto) {
        rulesPhoto.classList.remove("hidden")
    }
    if (btnPhoto) {
        btnPhoto.classList.remove("hidden")
    }
  }
  }

  // Fonction pour gérer l'ouverture de la modale addPhoto

  function openAddPhotoModal() {
    modalAddPhoto = document.querySelector(".modal--photo__contain")
      if (modalAddPhoto) {
        modalAddPhoto.style.display = "flex"
        modalAddPhoto.style.zIndex = 1005
        document.body.classList.add("modal__open")
        modalOpen = true
        const modalContain = document.querySelector(".modal__contain")
        if (modalContain) {
            modalContain.classList.add("hidden")
        }
      const title = document.querySelector(".title__projects")
      if (title) {
      title.value = ''
       }
      const categorySelect = document.querySelector(".categories__scroll")
       if (categorySelect) {
        categorySelect.value = ""
       }
      }
}

   // Gestion des événements de clic pour les modales

 const btnModifier = document.querySelector(".txt__modifier")
 btnModifier.addEventListener("click", openModal) 
 const spanClose = document.querySelector(".fa-xmark")
 spanClose.addEventListener("click", closeModal)
 const spanClosePhoto = document.querySelector(".xmark__modal--photo")
 spanClosePhoto.addEventListener("click", closeModal)
const spanArrowLeft = document.querySelector(".fa-arrow-left")

  spanArrowLeft.addEventListener("click", () => {
      closeModal()
      openModal()
  })

 const btnAddPhoto = document.querySelector(".btn__add--photo")
 btnAddPhoto.addEventListener("click", openAddPhotoModal)

  const btnPhoto = document.querySelector(".btn__photo")
  const fileInput = document.getElementById("fileInput")
  const btnValidate = document.querySelector(".btn__validate")
  let selectedFile

  btnPhoto.addEventListener("click", () => {
      fileInput.click()
  })
 // EventListener de l'input file 


  fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0]
      if (file) {
         selectedFile = file
          console.log("Fichier sélectionné:", file)
          const reader = new FileReader()
          reader.onload = function(e) {
              const imgPreview = document.querySelector(".img__none")
              const rulesPhoto = document.querySelector(".rules__photo")
              rulesPhoto.classList.add("hidden")
              btnPhoto.classList.add("hidden")
              imgPreview.src = e.target.result
              imgPreview.classList.add("img__preview")
              imgPreview.classList.remove("img__none") 
          }
          reader.readAsDataURL(file)
      }
  })
  btnValidate.addEventListener("click", async () => {
          closeModal ()
          await sendDatatoAPI ()
  })

console.log(getCategories ())

  // Création de la fonction displayCategoriesInSelect

async function displayCategoriesInSelect() {
      const categorySelect = document.querySelector(".categories__scroll")
       const categories = await getCategories ()
       categorySelect.innerHTML = ''
       categories.forEach(category => {

        //Ajoute les options au menu déroulant

           let option = document.createElement("option")
            option.textContent = category.name 
            option.value = category.id
            categorySelect.appendChild(option)
            categorySelect.appendChild(option)
  })
}
// Appel initial pour charger les catégories dans le menu déroulant

displayCategoriesInSelect()

 // Fonction pour envoyer les données à l'API et ajouter une nouvelle œuvre

 async function sendDatatoAPI () {
    const title = document.querySelector(".title__projects").value
    const categorySelect = document.querySelector(".categories__scroll")
    const selectedCategory = categorySelect.value
    if (selectedFile && title && selectedCategory) {
        const formData = new FormData()
        formData.append("image", selectedFile)
        formData.append("title", title)
        formData.append("category", selectedCategory)

        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                 Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
                body: formData,
            })
            if (!response.ok) {
              const errorResponse = await response.json()
              console.error("Erreur lors de l'ajout de l'œuvre:", errorResponse)
              alert(`Erreur : ${errorResponse.message || response.statusText}`)
          } else {
              const newWork = await response.json()
              console.log("Nouvelle œuvre ajoutée:", newWork)
              addWorkToGallery(newWork)
              displayWorksOnLoad ()
          }
      } catch (error) {
          console.error("Erreur lors de l'ajout de l'œuvre:", error)
          alert("Erreur lors de l'ajout de l'œuvre. Veuillez réessayer.")
      }
  } else {
      alert("Veuillez sélectionner un fichier, entrer un titre et une catégorie.")
  }
 }

  // Fonction pour ajouter une nouvelle œuvre à la galerie

  function addWorkToGallery(work) {
    const projectsMake = document.querySelector(".projects__sub")
    const baliseDiv = document.createElement("div")
    const baliseImg = document.createElement("img")
    const baliseI = document.createElement("i")

    baliseImg.classList.add("img__modal")
    baliseDiv.setAttribute("data-id", work.id)
    baliseDiv.classList.add("trash__container")
    baliseI.classList.add("fa-solid", "fa-trash-can")

    baliseImg.src = work.imageUrl
    baliseImg.alt = work.title

    baliseDiv.appendChild(baliseImg)
    baliseDiv.appendChild(baliseI)
    projectsMake.appendChild(baliseDiv)

    baliseI.addEventListener("click", async () => {
      await deleteWorkById(work.id)
    })
}

  // Ferme la modale lorsqu'on clique en dehors      


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

  // Ajoute les figures de la galerie au contenus des projets

  const projectsMake = document.querySelector(".projects__sub")
  const galleryFigures = document.querySelectorAll(".gallery figure")
  galleryFigures.forEach((figure) => {
    projectsMake.appendChild(figure)
  })
  
   // Fonction pour supprimer une œuvre par son ID

  async function deleteWorkById(workId) {
    try {
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE', 
        headers: {"Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      })
         displayWorksOnModal ()
         displayWorksOnLoad ()
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'œuvre :', error)
    }
  }

  // Fonction pour afficher les œuvres dans la modale

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

  // Multiplications des icônes trash

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
  // Affiche les œuvres dans la modale

  displayWorksOnModal(await getWorks ())
}

// Affiche les œuvres et les catégories dans la console
console.log (await getWorks ())
console.log (await getCategories ())
})