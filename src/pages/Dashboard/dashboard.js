
import { Toast } from "../../scripts/toast.js"

class Dashboard{
    static logout(){
        const btnLogout = document.querySelector("#logout")
        btnLogout.addEventListener("click", () =>{
            Toast.create("Logout realizado com sucesso", "green")
            setTimeout(()=>{
                window.location.replace("../../../index.html")
            }, 2500)
        })
    }
}

Dashboard.logout()