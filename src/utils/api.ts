import axios from "axios";

import { ACCSESS_TOKEN } from "../env";

export const api = axios.create({
    baseURL: "https://reqres.in/api",
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCSESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }

)


