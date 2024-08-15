import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

import React from 'react'

function Login() {

    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const onEmailchange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordchange = (e) => {
        setPassword(e.target.value)
    }

    const validateFormfield = () => {
        let errors = {}
        if (!email) {
            errors.email = "Please enter your email"
        } if (!password) {
            errors.password = "please enter your password"
        }
        return errors;
    }

    const login = (e) => {
        e.preventDefault();
        let errors = validateFormfield()
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            // console.log('No Errors')
            fetch("http://localhost:7000/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }).then((res) => {
                return res.json()
            }).then(async (result) => {
                if (result.success) {
                    localStorage.setItem("loggedInUser",JSON.stringify({email:result.email,userId:result.userId}))
                    localStorage.setItem("isLoggedIn",true)
                    
                    console.log('Hello')
                    navigate("/expenses")
                    console.log('Hi')
                    
                    
                    
                } else {
                    setIsError(true);
                    setErrMessage(result.message)
                }
            })
            .catch((error) => {
                setIsError(true);
                setErrMessage("Failed to connect to server. Please try again.");
                console.error("Login error:", error);
            });
        }

    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "80vh" }}>
            <div className='col-md-4'>
                <h2 className='text-start' style={{ color: '#106EBE' }}>Login</h2>
                <div className='card' style={{ border: "2px solid #106EBE" }}>
                    <div className='card-body'>

                        <form onSubmit={login}>

                            <div className='mb-4'>
                            <label className='form-label text-start'>Email*</label>
                                <input placeholder='Enter your email' type='email' className='form-control' value={email} onChange={onEmailchange} />
                            </div>
                            <p className='error-text mb-3'>{errors?.email}</p>
                            <div className='mb-4 '>
                            <label className='form-label text-start'>Password*</label>
                                <input placeholder='enter your password' type='password' className='form-control' value={password} onChange={onPasswordchange} />
                            </div>
                            <p className='error-text mb-3'>{errors?.password}</p>


                            <input type="submit" value="Login" className='btn btn-primary w-100 mb-3 mt-3' style={{ backgroundColor: "#106EBE", border: "1px solid #009688" }} />

                            <div className='mb-4'>
                                <span>Don't have an Account?</span> <Link to='/' className="link-offset-2 link-underline link-underline-opacity-10">Register</Link>
                            </div>

                            {isError && <div className='mb-3'>
                                <h4 style={{ color: 'red' }}>{errMessage}</h4>
                            </div>}
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
