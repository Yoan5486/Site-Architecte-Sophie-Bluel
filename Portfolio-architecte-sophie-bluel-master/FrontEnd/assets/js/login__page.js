function displayErrorMessage(message) {
    const errorMessage = document.createElement("p")
    errorMessage.textContent = message
    errorMessage.style.color = "red"
    const container = document.querySelector(".error__container")
    container.innerHTML = ""
    container.appendChild(errorMessage)
}

async function login(email, password) {
    const idConnection = {
        email: email,
        password: password
    }

const chargeUtile = JSON.stringify(idConnection)

try {
    const response = await fetch ("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {
           "Content-Type" : "application/json", 
           "Access-Control-Allow-Origin" : "*"
        },
       body: chargeUtile
   
   })

   if (response.ok) {
    const data = await response.json()
    const authToken = data.token
    localStorage.setItem("authToken", authToken)
    console.log("Authentification réussie")
    window.location.href = "index.html"
    
    } else {
     displayErrorMessage("Identifiant ou/et mot de passe incorrect.")
    }

} catch (error) {
console.error("Erreur lors de la requête:", error)
}
}

    const authToken = localStorage.getItem("authToken")
    console.log(authToken)
    if (authToken) {
        console.log("Utilisateur connecté !")
       window.location.href = "index.html"
    } else {
        console.log("Utilisateur non connecté")
        displayErrorMessage("Veuillez vous connecter pour accéder à cette page.")
        
    }
    

const btnConnect = document.querySelector(".btn__connect")

if (btnConnect){
    btnConnect.addEventListener("click", async () => {
        const emailInput = document.querySelector("#e-mail").value
        const passwordInput = document.querySelector("#password").value

        await login(emailInput, passwordInput)
    })
}
