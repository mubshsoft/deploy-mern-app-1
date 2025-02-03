import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
const Login = () => {

    const [ loginInfo, setLoginInfo ] = useState({
        email: '', 
        password:'', 
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name,value);
        const copyloginInfo = {...loginInfo};
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo);
    }
    


    const handleLogin = async(e) =>{
        e.preventDefault();
        const { email, password } = loginInfo;
        if(!email || !password) {
            return handleError('All fields required!');
        }
        try {
            const url = "http://localhost:7000/auth/login";
            const response = await fetch(url, {
                method: 'POST', 
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if(success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem("loggedInUser",name );
                setTimeout(()=>{
                    navigate('/home');
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
        } catch (error) {
            handleError(error);
        }
    }

  return (
    <div className='container'>
      <h3>Signup</h3>
      <form onSubmit={handleLogin}>
        <div>
            <label htmlFor='email'>Email</label>
            <input
            onChange={handleChange}
            value={loginInfo.email}
            type='email' name='email'  placeholder='Enter your email'
            />
        </div>

        <div>
            <label htmlFor='password'>Password</label>
            <input
            onChange={handleChange}
            value={loginInfo.password}
            type='password' name='password'  placeholder='Enter your passowrd'
            />
        </div>

        <button>Login In</button>
        <span>Dont have an account&nbsp;
            <Link to='/signup'>Singup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
