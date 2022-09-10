import { Requests } from "../../scripts/requests.js"

class PageLoginRegister{

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
}

PageLoginRegister.makeLogin(Requests)
PageLoginRegister.makeRegister(Requests)
