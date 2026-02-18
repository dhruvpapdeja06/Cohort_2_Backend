import React,{ useState } from 'react'
import '../styles/form.scss'
import axios from 'axios'
import { Link } from 'react-router'


const Login = ()=>{
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    async function handlerSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/login",{
            username,
            password
        },{
            withCredentials: true
        })
        .then(res=>{
            console.log(res.data)
        })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handlerSubmit}>
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