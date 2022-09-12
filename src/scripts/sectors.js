export class Sectors{
    static makeCard(list){
        const ul = document.querySelector(".show__sectors")
        let li = document.createElement("li")
        let button = document.createElement("button")
    
        button.classList.add("button__default")
        button.id = "refresh"
        button.innerText = "Todos os Setores"

        li.appendChild(button)
        ul.appendChild(li)
        list.forEach(elem =>{
            let li = document.createElement("li")
            let button = document.createElement("button")
    
            button.classList.add("button__default")
            button.id = elem.description
            button.innerText = elem.description

            li.appendChild(button)
            ul.appendChild(li)
        })
    }

    static makeOptions(list, select){
        list.forEach(elem =>{
            let option = document.createElement("option")

            option.value = elem.uuid
            option.innerText = elem.description

            select.appendChild(option)
        })
    }
}