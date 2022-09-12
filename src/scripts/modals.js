import { Sectors } from "./sectors.js"
import { Requests } from "./requests.js"
import { Toast } from "./toast.js"

export class Modal{
    static async addNewCompany(sectorsList){
        const body = document.body

        let section = document.createElement("section")
        let form = document.createElement("form")
        let header = document.createElement("header")
        let h3 = document.createElement("h3")
        let buttonClose = document.createElement("button")
        let divName = document.createElement("div")
        let labelName = document.createElement("label")
        let inputName = document.createElement("input")
        let divOpening = document.createElement("div")
        let labelOpening = document.createElement("label")
        let inputOpening = document.createElement("input")
        let divTextarea = document.createElement("div")
        let labelTextarea = document.createElement("label")
        let textarea = document.createElement("input")
        let divSelect = document.createElement("div")
        let select = document.createElement("select")
        let optionNoVlaue = document.createElement("option")
        let buttonSend = document.createElement("button")

        section.classList.add("modal__backgroud")
        form.id = "modal__company"

        h3.classList.add("font__title__3")
        h3.innerText = "preencha o formulário"
        buttonClose.classList.add("button__default")
        buttonClose.id = "close__modal"
        buttonClose.innerText = "Fechar"

        labelName.classList.add("font__text__1")
        labelName.htmlFor = "add__company__name"
        labelName.innerText = "Nome da Empresa:"
        inputName.classList.add("input__default")
        inputName.id = "add__company__name"
        inputName.type = "text"
        inputName.placeholder = "Nome..."
        inputName.required = true

        labelOpening.classList.add("font__text__1")
        labelOpening.htmlFor = "add__company__opening"
        labelOpening.innerText = "Horário de Abertura:"
        inputOpening.classList.add("input__default")
        inputOpening.id = "add__company__opening"
        inputOpening.type = "number"
        inputOpening.placeholder = "Horário..."
        inputOpening.required = true
        
        labelTextarea.classList.add("font__text__1")
        labelTextarea.htmlFor = "add__company__description"
        labelTextarea.innerText = "Descrição da Empresa:"
        textarea.classList.add("input__default")
        textarea.id = "add__company__description"
        textarea.placeholder = "Descrição..."
        textarea.required = true

        select.classList.add("font__text__1")
        select.id = "add__company__select"
        select.required = true

        optionNoVlaue.value = ""
        optionNoVlaue.innerText = "Escolher setor"
        select.appendChild(optionNoVlaue)
        Sectors.makeOptions(sectorsList, select)

        buttonSend.classList.add("button__default")
        buttonSend.type = "submit"
        buttonSend.innerText = "Enviar"

        header.append(h3, buttonClose)
        divName.append(labelName, inputName)
        divOpening.append(labelOpening, inputOpening)
        divTextarea.append(labelTextarea, textarea)
        divSelect.appendChild(select)
        form.append(header, divName, divOpening, divTextarea, divSelect, buttonSend)
        section.appendChild(form)
        body.appendChild(section)

        this.closeModal()
        this.sendAddNewCompany(Requests)
    }

    static async sendAddNewCompany(requests){
        const button = document.querySelector("#modal__company")
        button.addEventListener("submit", async event =>{
            event.preventDefault()
            const name = document.querySelector("#add__company__name")
            const opening = document.querySelector("#add__company__opening")
            const description = document.querySelector("#add__company__description")
            const sector = document.querySelector("#add__company__select")
            
            if(opening.value > 24 || opening.value < 0){
                Toast.create("Adicione um horário válido", "red")
            } else{
                const data = {
                    name: name.value,
                    opening_hours: `${opening.value}:00`,
                    description: description.value,
                    sector_uuid: sector.value
                }
                await requests.createCompany(data)
            }
        })
    }

    static closeModal(){
        const button = document.querySelector("#close__modal")
        button.addEventListener("click", () =>{
            const section = document.querySelector(".modal__backgroud")
            section.remove()
        })
    }
}