import axios from "axios";


export const api = axios.create({
    baseURL: "https://reqres.in/api",
    timeout: 1000
})


type User = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

