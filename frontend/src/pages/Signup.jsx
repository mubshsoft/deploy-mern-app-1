import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
const Signup = () => {

    const [ signupInfo, setSignUpInfo ] = useState({
        name:'',
        email: '', 
        password:'', 
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name,value);
        const copysignupInfo = {...signupInfo};
        copysignupInfo[name] = value;
        setSignUpInfo(copysignupInfo);
    }
    console.log(signupInfo);


    const handleSignup = async(e) =>{
        e.preventDefault();
        const {name, email, password } = signupInfo;
        if(!name || !email || !password) {
            return handleError('All fields required!');
        }
        try {
            const url = "http://localhost:7000/auth/signup";
            const response = await fetch(url, {
                method: 'POST', 
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if(success) {
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login');
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
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor='name'>Name</label>
            <input
            onChange={handleChange}
            value={signupInfo.name}
            type='name' name='name' autoFocus placeholder='Enter your name'
            />
        </div>

        <div>
            <label htmlFor='email'>Email</label>
            <input
            onChange={handleChange}
            value={signupInfo.email}
            type='email' name='email'  placeholder='Enter your email'
            />
        </div>

        <div>
            <label htmlFor='password'>Password</label>
            <input
            onChange={handleChange}
            value={signupInfo.password}
            type='password' name='password'  placeholder='Enter your passowrd'
            />
        </div>

        <button>Signup</button>
        <span>Already have an account 
            <Link to='/login'> Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
