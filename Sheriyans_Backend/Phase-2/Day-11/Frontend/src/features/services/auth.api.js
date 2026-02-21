/* eslint-disable no-useless-catch */
import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials: true
})


export async function register(username,email,password,bio){
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await api.post("/api/auth/register",{
            username,
            email,
            password,
            bio,
        })
        return response.data
    }
    catch(err){
        throw err;
    }
}

export async function login(username,password){
    try{
        const response = await api.post('/api/auth/login',{
            username,
            password,
        });
        return response.data
    }
    catch(err){
        throw err
    }
}

export async function getMe(){
    try{
        const response = await api.get("/get-me")
        return response.data
    }
    catch(err){
        throw err
    }
}