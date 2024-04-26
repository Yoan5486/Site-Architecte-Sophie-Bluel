let btnConnect = document.querySelector(".btn__connect")

btnConnect.addEventListener("click", async () =>{
    const idConnection = {
        email: document.querySelector ("#e-mail").value,
        password: document.querySelector("#password").value
    }
    console.log(idConnection)

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
    console.log("Authentification réussie")
    
    } else {
     const errorMessage = document.createElement("p");
     errorMessage.textContent = "Identifiant ou/et mot de passe incorrect."
     errorMessage.style.color = "red"
     const container = document.querySelector(".error__container")
     container.innerHTML = ""
     container.appendChild(errorMessage)
    }
} catch (error) {
console.error("Erreur lors de la requête:", error)
}

})
