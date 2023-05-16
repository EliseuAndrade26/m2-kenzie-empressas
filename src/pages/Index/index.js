import { Requests } from "../../scripts/requests.js"
import { Toast } from "../../scripts/toast.js"
import { CompiniesCard } from "../../scripts/companiesCard.js"

class PageLoginRegister{

    static autoLogin(){
        const token = localStorage.getItem("Kenpressas:token")
        const isAdmin = localStorage.getItem("Kenpressas:admin")
        if(token){
            Toast.create("auto-Login realizado com sucesso", "green")
            if(isAdmin === "false"){
                setTimeout(()=>{
                    window.location.replace("./src/pages/dashboards/dashboard-no-admin/dashboard.html")
                }, 2500)
            } else {
                setTimeout(()=>{
                    window.location.replace("./src/pages/dashboards/dashboard-admin/dashboard.html")
                }, 2500)
            }
        }
    }

    static async makeLogin(requests){
        document.querySelector(".form__login").addEventListener("submit", async (event) =>{
            event.preventDefault()
            const email = document.querySelector("#login__email")
            const password = document.querySelector("#login__password")

            const body = {
                email: email.value,
                password: password.value
            }

            await requests.login(body)
        })
    }
    
    static async makeRegister(requests){
        document.querySelector(".form__register").addEventListener("submit", async (event) =>{
            event.preventDefault()
            const name = document.querySelector("#register__name")
            const email = document.querySelector("#register__email")
            const password = document.querySelector("#register__password")
            const devLevel = document.querySelector("#select__profissional__level")
    
            const body = {
                password: password.value,
                email: email.value,
                professional_level: devLevel.value,
                username: name.value
            }
    
            await requests.createUser(body)
        })
    }

    static async companies(requests){
        const companiesList = await requests.showCompanies()
        CompiniesCard.makeCardLogin(companiesList)
    }
}

PageLoginRegister.autoLogin()
PageLoginRegister.makeLogin(Requests)
PageLoginRegister.makeRegister(Requests)
PageLoginRegister.companies(Requests)