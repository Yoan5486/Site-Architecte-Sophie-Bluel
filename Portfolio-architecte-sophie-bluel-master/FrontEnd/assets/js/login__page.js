let btnConnect = document.querySelector(".btn__connect")

btnConnect.addEventListener("click", async () =>{
    const idConnection = {
        email: document.querySelector ("#e-mail").value,
        password: document.querySelector("#password").value
    }
    console.log(idConnection)

const chargeUtile = JSON.stringify(idConnection)

await fetch ("http://localhost:5678/api/users/login", {
     method: "POST", 
     headers: {
        "Content-Type" : "application/json", 
        "Access-Control-Allow-Origin" : "*"
     },
    body: chargeUtile

}).then(function (response) {
    console.log(response)
})


})
