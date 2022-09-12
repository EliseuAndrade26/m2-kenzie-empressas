import { Requests } from "./requests.js"

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

            liCard.append(h4, ulDepartaments, pOpeningHours, pSector)
            ulCompanies.appendChild(liCard)
        })
    }

    static async addDepartaments(elem, requests, ulDepartaments){
        const departaments = await requests.showAllDepartmentsAtCompany(elem.uuid)
        if(departaments.length > 0){
            departaments.forEach(elem =>{
                let li = document.createElement("li")
                li.classList.add("font__text__2")
                li.innerText = elem.name
                ulDepartaments.appendChild(li)
            })
        } else {
            let li = document.createElement("li")
            li.classList.add("font__text__2")
            li.innerText = "N/A"
            ulDepartaments.appendChild(li)
        }
    }
}

