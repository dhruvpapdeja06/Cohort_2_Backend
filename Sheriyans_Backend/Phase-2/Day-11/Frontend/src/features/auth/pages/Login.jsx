import React,{ useState } from 'react'
import '../styles/form.scss'
// import axios from "axios"
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import {useAuth} from '../hooks/useAuth'


const Login = ()=>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const[handleLogin,loading] = useAuth()
    const navigate = useNavigate()

    if(loading){
        return(
            <h1>Loading ...</h1>
        )
    }

    function handleSubmit(e){
        e.preventDefault()

        handleLogin(username,password)
        .then(res=>{
            console.log(res)
            navigate("/")
        })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter username' name='username' onInput={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" placeholder='Enter password' name='password' onInput={(e)=>{setPassword(e.target.value)}} />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login;