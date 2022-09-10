import { Toast } from "./toast.js"

export class Requests{
    static baseURL = "http://localhost:6278"
    static token = localStorage.getItem("Kenpressas:token")

    static async login(data) {
        const userLogin = await fetch(`${this.baseURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)
            if(resp.error){
                Toast.create("E-mail ou senha incorreta", "red")
            } else {
                localStorage.setItem("Kenpressas:token", resp.token)
                localStorage.setItem("Kenpressas:uuid", resp.uuid)
                localStorage.setItem("Kenpressas:admin", resp.is_admin)
                Toast.create("Login realizado com sucesso", "green")
                setTimeout(()=>{
                    window.location.replace("./src/pages/dashboard/dashboard.html")
                }, 2500)
            }
        })
        // console.log(userLogin)
        return userLogin
    }

    static async createUser(data) {
        const newUser = await fetch(`${this.baseURL}/auth/register/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.error){
                Toast.create("Não foi possível registrar", "red")
            } else {
                Toast.create("Registro realizado com sucesso", "green")
            }
        })
        // console.log(newUser)
        return newUser
    }

    static async showCompanies() {
        const companies = await fetch(`${this.baseURL}companies`, {
            method: "GET",
            headers: {
                Authorization: "Beare null"
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar as Empressas associadas", "red")
        })
        console.log(companies)
        return companies
    }
    
    static async showCompaniesBySector(sector) {
        const companies = await fetch(`${this.baseURL}companies/${sector}`, {
            method: "GET",
            headers: {
                Authorization: "Beare null"
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar as Empressas associadas", "red")
        })
        console.log(companies)
        return companies
    }
    
    static async showCoworkersSameDepartment() {
        const coworkers = await fetch(`${this.baseURL}users/departments/coworkers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os empregados associados", "red")
        })
        console.log(coworkers)
        return coworkers
    }
    
    static async showDepartmentsSameCompanie() {
        const departments = await fetch(`${this.baseURL}users/departments`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os departamentos associados", "red")
        })
        console.log(departments)
        return departments
    }
    
    static async updateUser(data) {
        const user = await fetch(`${this.baseURL}users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Informações atualizadas com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível Atualizar as informações, tente novamente!", "red")
        })
        console.log(user)
        return user
    }
    
    static async showAllUsers() {
        const users = await fetch(`${this.baseURL}users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os usuários associados", "red")
        })
        console.log(users)
        return users
    }
    
    static async showUsersOutWork() {
        const users = await fetch(`${this.baseURL}admin/out_of_work`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os usuários associados", "red")
        })
        console.log(users)
        return users
    }
    
    static async updateWorker(data, id) {
        const user = await fetch(`${this.baseURL}admin/update_user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Informações atualizadas com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível Atualizar as informações, tente novamente", "red")
        })
        console.log(user)
        return user
    }
    
    static async createCompany(data) {
        const newCompany = await fetch(`${this.baseURL}companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Empressa criada com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Empressa não criada, por favor reenvie os seus dados", "red")
        })
        console.log(newCompany)
        return newCompany
    }
    
    
    static async showAllSectors() {
        const sectors = await fetch(`${this.baseURL}sectors`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os setores associados", "red")
        })
        console.log(sectors)
        return sectors
    }
    
    static async showAllDepartments() {
        const departments = await fetch(`${this.baseURL}departments`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os departamentos associados", "red")
        })
        console.log(departments)
        return departments
    }
    
    static async showAllDepartmentsAtCompany(id) {
        const departments = await fetch(`${this.baseURL}departments/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível carregar os departamentos associados", "red")
        })
        console.log(departments)
        return departments 
    }

    static async createDepartment(data) {
        const newDepartment = await fetch(`${this.baseURL}departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Departamento criada com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível criar o departamento, por favor reenvie o formulário", "red")
        })
        console.log(newDepartment)
        return newDepartment 
    }
    
    static async hireUser(data) {
        const newWorker = await fetch(`${this.baseURL}departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Usuário contratado com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível contratar o usuário, por favor reenvie o formulário", "red")
        })
        console.log(newWorker)
        return newWorker 
    }
    
    static async dismissWorker(id) {
        const user = await fetch(`${this.baseURL}departments/dismiss/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Usuário demitido com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível realizar a demissão, por favor reenvie o formulário", "red")
        })
        console.log(user)
        return user 
    }
    
    static async updateDepartament(data, id) {
        const department = await fetch(`${this.baseURL}departments${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Departamento atualizado com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível atualizar as informações, por favor reenvie o formulário", "red")
        })
        console.log(department)
        return department 
    }

    static async deleteDepartament(id) {
        const departament = await fetch(`${this.baseURL}departments/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            Toast.create("Usuário demitido com sucesso", "green")
        })
        .catch(err =>{ 
            console.log(err)
            Toast.create("Não foi possível realizar a demissão, por favor reenvie o formulário", "red")
        })
        // return departament 
    }
}