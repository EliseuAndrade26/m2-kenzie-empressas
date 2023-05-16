import { Requests } from "../../scripts/requests.js"
import { Sectors } from "../../scripts/sectors.js"
import { CompiniesCard } from "../../scripts/companiesCard.js"
import { Modal } from "../../scripts/modals.js"
import { Toast } from "../../scripts/toast.js"

export class Dashboard{
    
    static logout(){
        const btnLogout = document.querySelector("#logout")
        btnLogout.addEventListener("click", () =>{
            Toast.create("Logout realizado com sucesso", "green")
            localStorage.clear()
            setTimeout(()=>{
                window.location.replace("../../../../index.html")
            }, 2500)
        })
    }

    static async sectors(requests){
        const sectorsList = await requests.showAllSectors()
        Sectors.makeCard(sectorsList)
    }

    static async changeSector(requests){
        const ul = document.querySelector(".show__sectors")
        ul.addEventListener("click", async event =>{
            const button = event.target
            if(button.tagName === "BUTTON"){
                if(button.id === "refresh"){
                    this.companies(requests)
                } else {
                    const companiesList = await requests.showCompaniesBySector(button.id)
                    await CompiniesCard.makeCardDashboard(companiesList, requests)
                }
            }
        })
    }

    static async search(requests){
        const input = document.querySelector("#input__search")
        input.addEventListener("keyup", async () =>{
            const companiesList = await requests.showCompanies()
            let companiesFound = []
            companiesList.forEach(elem =>{
                if(elem.name.includes(input.value)){
                    companiesFound.push(elem)
                }
            })
            await CompiniesCard.makeCardDashboard(companiesFound, requests)
        } )
    }

    static async companies(requests){
        const companiesList = await requests.showCompanies()
        await CompiniesCard.makeCardDashboard(companiesList, requests)
    }

    static async addCompany(requests){
        const button = document.querySelector("#modal__add__company")
        button.addEventListener("click", async () =>{
            const sectorsList = await requests.showAllSectors()
            await Modal.addNewCompany(sectorsList)
        })
    }

    

    static async showCompanyInformation(requests){
        const ul = document.querySelector(".show__companies")
        ul.addEventListener("click", async event =>{
            const button = event.target
            if(button.tagName === "BUTTON"){
                const companiesList = await requests.showCompanies()
                await CompiniesCard.especificCompanyCard(companiesList, button.id, requests)
            }
        })
    }
}

Dashboard.logout()
Dashboard.sectors(Requests)
Dashboard.changeSector(Requests)
Dashboard.search(Requests)
Dashboard.companies(Requests)
Dashboard.addCompany(Requests)
Dashboard.showCompanyInformation(Requests)
