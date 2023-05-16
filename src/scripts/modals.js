import { Sectors } from "./sectors.js"
import { Requests } from "./requests.js"
import { Dashboard } from "../pages/dashboards/dashboard.js"
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

        this.closeModal(buttonClose, section)

        header.append(h3, buttonClose)
        divName.append(labelName, inputName)
        divOpening.append(labelOpening, inputOpening)
        divTextarea.append(labelTextarea, textarea)
        divSelect.appendChild(select)
        form.append(header, divName, divOpening, divTextarea, divSelect, buttonSend)
        section.appendChild(form)
        body.appendChild(section)

        this.sendAddNewCompany(Requests)
    }

    static async sendAddNewCompany(requests){
        const form = document.querySelector("#modal__company")
        form.addEventListener("submit", async event =>{
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

    static async addNewDepartament(id){
        const body = document.body

        let section = document.createElement("section")
        let form = document.createElement("form")
        let header = document.createElement("header")
        let h3 = document.createElement("h3")
        let buttonClose = document.createElement("button")
        let divName = document.createElement("div")
        let labelName = document.createElement("label")
        let inputName = document.createElement("input")
        let divTextarea = document.createElement("div")
        let labelTextarea = document.createElement("label")
        let textarea = document.createElement("input")
        let buttonSend = document.createElement("button")

        section.classList.add("modal__backgroud")
        form.id = "modal__department"

        h3.classList.add("font__title__3")
        h3.innerText = "Adicionar Departamento"
        buttonClose.classList.add("button__default")
        buttonClose.id = "close__modal"
        buttonClose.type = "button"
        buttonClose.innerText = "Fechar"

        labelName.classList.add("font__text__1")
        labelName.htmlFor = "add__departament__name"
        labelName.innerText = "Nome do Departamento:"
        inputName.classList.add("input__default")
        inputName.id = "add__departament__name"
        inputName.type = "text"
        inputName.placeholder = "Nome..."
        inputName.required = true
        
        labelTextarea.classList.add("font__text__1")
        labelTextarea.htmlFor = "add__departament__description"
        labelTextarea.innerText = "Descrição do Departamento:"
        textarea.classList.add("input__default")
        textarea.id = "add__departament__description"
        textarea.placeholder = "Descrição..."
        textarea.required = true

        buttonSend.classList.add("button__default")
        buttonSend.innerText = "Adicionar"
        
        this.closeModal(buttonClose, section)

        header.append(h3, buttonClose)
        divName.append(labelName, inputName)
        divTextarea.append(labelTextarea, textarea)
        form.append(header, divName, divTextarea, buttonSend)
        section.appendChild(form)
        body.appendChild(section)

        this.sendAddNewDepartament(Requests, id)
    }

    static async sendAddNewDepartament(requests, id){
        const form = document.querySelector("#modal__department")
        form.addEventListener("submit", async event =>{
            event.preventDefault()
            const name = document.querySelector("#add__departament__name")
            const description = document.querySelector("#add__departament__description")
            
            const data = {
                name: name.value,
                description: description.value,
                company_uuid: id
            }
            await requests.createDepartment(data)
        })
    }

    static async removeDepartament(departamentsList){
        const body = document.body

        let section = document.createElement("section")
        let form = document.createElement("form")
        let header = document.createElement("header")
        let h3 = document.createElement("h3")
        let buttonClose = document.createElement("button")
        let divSelect = document.createElement("div")
        let select = document.createElement("select")
        let optionNoVlaue = document.createElement("option")
        let buttonSend = document.createElement("button")

        section.classList.add("modal__backgroud")
        form.id = "modal__department"

        h3.classList.add("font__title__3")
        h3.innerText = "Remover Departamento"
        buttonClose.classList.add("button__default")
        buttonClose.id = "close__modal"
        buttonClose.innerText = "Fechar"

        select.classList.add("font__text__1")
        select.id = "remove__departament__select"
        select.required = true

        optionNoVlaue.value = ""
        optionNoVlaue.innerText = "Escolher Departamento"
        select.appendChild(optionNoVlaue)
        Sectors.makeOptions(departamentsList, select)
       
        buttonSend.classList.add("button__default")
        buttonSend.type = "submit"
        buttonSend.innerText = "Deletar"

        this.closeModal(buttonClose, section)

        header.append(h3, buttonClose)
        divSelect.append(select)
        form.append(header, divSelect, buttonSend)
        section.appendChild(form)
        body.appendChild(section)

        this.sendRemoveDepartament(Requests)
    }

    static async sendRemoveDepartament(requests){
        const form = document.querySelector("#modal__department")
        console.log(form)
        form.addEventListener("submit", async event =>{
            event.preventDefault()
            const option = document.querySelector("#remove__departament__select")
            await requests.deleteDepartament(option.value)
        })
    }

    static async hireNewWorker(departamentsList, usersOutWork){
        const body = document.body

        let section = document.createElement("section")
        let form = document.createElement("form")
        let header = document.createElement("header")
        let h3 = document.createElement("h3")
        let buttonClose = document.createElement("button")
        let divSelectDepartaments = document.createElement("div")
        let selectDepartments = document.createElement("select")
        let optionNoVlaueDepartment = document.createElement("option")
        let divSelectWorkwer = document.createElement("div")
        let selectWorkwer = document.createElement("select")
        let optionNoVlaueWorkwer = document.createElement("option")
        let buttonSend = document.createElement("button")

        section.classList.add("modal__backgroud")
        form.id = "modal__add__worker"

        h3.classList.add("font__title__3")
        h3.innerText = "Contratar Trabalhador"
        buttonClose.classList.add("button__default")
        buttonClose.id = "close__modal"
        buttonClose.innerText = "Fechar"

        selectDepartments.classList.add("font__text__1")
        selectDepartments.id = "departament__select__hire"
        selectDepartments.required = true

        optionNoVlaueDepartment.value = ""
        optionNoVlaueDepartment.innerText = "Escolher Departamento"
        selectDepartments.appendChild(optionNoVlaueDepartment)
        Sectors.makeOptions(departamentsList, selectDepartments)
        
        selectWorkwer.classList.add("font__text__1")
        selectWorkwer.id = "user__select__hire"
        selectWorkwer.required = true

        optionNoVlaueWorkwer.value = ""
        optionNoVlaueWorkwer.innerText = "Escolher usuário para contratar"
        selectWorkwer.appendChild(optionNoVlaueWorkwer)
        Sectors.makeOptionsUsers(usersOutWork, selectWorkwer)
       
        buttonSend.classList.add("button__default")
        buttonSend.type = "submit"
        buttonSend.innerText = "Contratar"

        this.closeModal(buttonClose, section)

        header.append(h3, buttonClose)
        divSelectDepartaments.append(selectDepartments)
        divSelectWorkwer.append(selectWorkwer)
        form.append(header, divSelectDepartaments, divSelectWorkwer, buttonSend)
        section.appendChild(form)
        body.appendChild(section)

        this.sendHireNewWorker(Requests)
    }

    static async sendHireNewWorker(requests){
        const form = document.querySelector("#modal__add__worker")
        form.addEventListener("submit", async event =>{
            console.log("sendHireNewWorker ADD")
            event.preventDefault()
            const user = document.querySelector("#departament__select__hire")
            const departament = document.querySelector("#user__select__hire")
            const data = {
                user_uuid: user.value,
                department_uuid: departament.value
            }
            await requests.hireUser(data)
        })
    }

    static closeModal(buttonClose, sectionModal){
        buttonClose.addEventListener("click", event =>{
            console.log("closeModal")
            event.preventDefault()
            sectionModal.remove()
        })
    }
}