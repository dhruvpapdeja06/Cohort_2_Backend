import React from 'react'


const Login = ()=>{
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder='Enter username' name='username' />
                    <input type="password" placeholder='Enter password' name='password' />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login;