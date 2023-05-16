import { Requests } from "./requests.js"
import { Modal } from "./modals.js"

export class CompiniesCard{
    static makeCardLogin(list){
        const sectorAlimenticio = document.querySelector(".companies__alimenticio")
        const sectorAutomotiva = document.querySelector(".companies__automotiva")
        const sectorTI = document.querySelector(".companies__ti")

        list.forEach(async elem =>{
            let li = document.createElement("li")
            let h3 = document.createElement("h3")
            let span = document.createElement("span")

            h3.innerText = elem.name
            h3.classList.add("font__title__4")
            span.innerText = elem.description
            span.classList.add("font__text__1")

            li.append(h3, span)

            if(elem.sectors.description == "Alimenticio"){
                sectorAlimenticio.appendChild(li)
            }
            else if(elem.sectors.description == "Automotiva"){
                sectorAutomotiva.appendChild(li)
            }
            else{
                sectorTI.appendChild(li)
            }
        })
    }

    static async makeCardDashboard(list, requests){
        const ulCompanies = document.querySelector(".show__companies")
        ulCompanies.innerHTML = ""
        list.forEach(async elem =>{
            let liCard = document.createElement("li")
            let h4 = document.createElement("h4")
            let ulDepartaments = document.createElement("ul")
            let liDepartaments = document.createElement("li")
            let pOpeningHours = document.createElement("p")
            let pSector = document.createElement("p")
            let div = document.createElement("div")
            let button = document.createElement("button")

            liCard.classList.add("list__company")        
            h4.classList.add("font__title__4")
            h4.innerText = elem.name
            ulDepartaments.classList.add("departaments")
            liDepartaments.classList.add("font__text__2")
            liDepartaments.innerText = "Departamentos:"

            ulDepartaments.appendChild(liDepartaments)

            await this.addDepartaments(elem, requests, ulDepartaments)
            pOpeningHours.classList.add("font__text__2")
            pOpeningHours.innerText = `Abertura: ${elem.opening_hours}`
            pSector.classList.add("font__text__2")
            pSector.innerText = `Setor: ${elem.sectors.description}`
            button.classList.add("button__default")
            button.id = elem.uuid
            button.innerText = "ver empresa"

            div.appendChild(button)
            liCard.append(h4, ulDepartaments, pOpeningHours, pSector, div)
            ulCompanies.appendChild(liCard)
        })
    }

    static async addDepartaments(elem, requests, ulDepartaments){
        const departaments = await requests.showAllDepartmentsAtCompany(elem.uuid)
        if(departaments.length > 0){
            departaments.forEach(elem =>{
                let li = document.createElement("li")
                let button = document.createElement("button")

                button.classList.add("button__default", "show__departament")
                button.id = elem.uuid
                button.innerText = elem.name

                li.appendChild(button)
                ulDepartaments.appendChild(li)
            })
        } else {
            let li = document.createElement("li")
            li.classList.add("font__text__2")
            li.innerText = "N/A"
            ulDepartaments.appendChild(li)
        }
    }

    static async especificCompanyCard(list, id, requests){
        list.forEach(async elem =>{
            if(id === elem.uuid){
                const ulCompanies = document.querySelector(".show__companies")
                ulCompanies.innerHTML = ""

                let liCard = document.createElement("li")
                let h2 = document.createElement("h2")
                let divDepartaments = document.createElement("div")
                let spanDepartaments = document.createElement("span")
                let ulDepartaments = document.createElement("ul")
                let pDescription = document.createElement("p")
                let pOpening = document.createElement("p")
                let pSector = document.createElement("p")
                let divButtons = document.createElement("div")
                let buttonAddDepartament = document.createElement("button")
                let buttonRemoveDepartament = document.createElement("button")
                let buttonAddWorker = document.createElement("button")
                let buttonDismissWorker = document.createElement("button")

                liCard.classList.add("especific__company")
                liCard.id = id
                h2.classList.add("font__title__2")
                h2.innerText = elem.name

                spanDepartaments.classList.add("font__text__1")
                spanDepartaments.innerText = "Departamentos:"
                ulDepartaments.classList.add("departaments")
                ulDepartaments.appendChild(spanDepartaments)

                await this.addDepartaments(elem, requests, ulDepartaments)

                pDescription.classList.add("font__text__1")
                pDescription.innerText = `Descrição: ${elem.description}`
                pOpening.classList.add("font__text__1")
                pOpening.innerText = `Abertura: ${elem.opening_hours}`
                pSector.classList.add("font__text__1")
                pSector.innerText = `Setor: ${elem.sectors.description}`

                buttonAddDepartament.classList.add("button__default")
                buttonAddDepartament.id = "modal__add__departament"
                buttonAddDepartament.innerText = "Adicionar Departamento"

                buttonRemoveDepartament.classList.add("button__default")
                buttonRemoveDepartament.id = "modal__remove__departament"
                buttonRemoveDepartament.innerText = "Remover Departamento"
                
                buttonAddWorker.classList.add("button__default")
                buttonAddWorker.id = "modal__add__worker"
                buttonAddWorker.innerText = "Contratar"

                buttonDismissWorker.classList.add("button__default")
                buttonDismissWorker.id = "modal__dismiss__worker"
                buttonDismissWorker.innerText = "Demitir"

                this.createDepartament(buttonAddDepartament, id)
                this.removeDepartament(Requests, buttonRemoveDepartament, id)
                this.hireWorker(Requests, buttonAddWorker, id)

                divDepartaments.append(spanDepartaments, ulDepartaments)
                divButtons.append(buttonAddDepartament, buttonRemoveDepartament, buttonAddWorker, buttonDismissWorker)
                liCard.append(h2, divDepartaments, pDescription, pOpening, pSector, divButtons)
                ulCompanies.appendChild(liCard)
            }
        })
    }

    static async createDepartament(buttonAddDepartament, id){
        buttonAddDepartament.addEventListener("click", async () =>{
            await Modal.addNewDepartament(id)
        })
    }

    static async removeDepartament(requests, buttonRemoveDepartament, id){
        buttonRemoveDepartament.addEventListener("click", async () =>{
            const departaments = await requests.showAllDepartmentsAtCompany(id)
            await Modal.removeDepartament(departaments)
        })
    }

    static async hireWorker(requests, buttonAddWorker, id){
        buttonAddWorker.addEventListener("click", async () =>{
            const departaments = await requests.showAllDepartmentsAtCompany(id)
            const usersOutWork = await requests.showUsersOutWork()
            await Modal.hireNewWorker(departaments, usersOutWork)
        })
    }
}

