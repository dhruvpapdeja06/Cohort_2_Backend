import React,{ useState }from 'react'
import {Link} from 'react-router'
import '../styles/form.scss'
import axios from "axios"

const Register = ()=>{

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [bio,setBio] = useState("")


    async function handlerSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password,
            bio
        },{
            withCredentials: true
        })
        .then(res =>{
            console.log(res.data)
        })
    }

    return (
        <main>
            <div className="form-container">
                <h1>Create Account</h1>
                <form onSubmit={handlerSubmit}>
                    <input type="text" name='username' placeholder='Enter username' onInput={(e)=>{setUsername(e.target.value)}}/>
                    <input type="email" name='email' placeholder='Enter email'onInput={(e)=>{setEmail(e.target.value)}} />
                    <input type="password" name='password' placeholder='Enter password' onInput={(e)=>{setPassword(e.target.value)}}/>
                    <input type="text" name='bio' placeholder='bio' onInput={(e)=>{setBio(e.target.value)}} />
                    <button>Register</button>
                </form>

                <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
            </div>
        </main>
    )
}

export default Register;