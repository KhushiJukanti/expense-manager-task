import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import '../App.css';

function Signup() {

    const [user, setUser] = useState({ email: "", username: "", password: "", });
    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const navigate = useNavigate();

    const onFieldChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const validateFormFields = () => {
        let errors = {};
        if (!user.username.trim()) {
            errors.username = "Please enter a valid name";
        }
        if(!user.email.trim()) {
            errors.email = "Please enter a valid email address";
        }
        if (!user.password) {
            errors.password = "Password is required";
        }
        return errors;
    }

    const Register = () => {
        fetch("http://localhost:7000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((res) => res.json()).then((result) => {
            // navigate("/login");
            console.log(result)
            if (result.message === 'User registered successfully') {
                navigate("/login");
            } else {
                setIsError(true);
                setErrMessage(result.message);
            }
        });
    }

    const register = (e) => {
        e.preventDefault();
        let errors = validateFormFields();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            Register();
        }
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "80vh" }}>
                <div className='col-md-4'>
                    <h2 className='text-start' style={{ color: '#106EBE' }}>Register</h2>
                    <div className='card' style={{ border: "2px solid #106EBE" }}>
                        <div className='card-body mt-3'>
                            <form onSubmit={register}>
                                <div className='mb-4'>
                                    <label className='form-label text-start'>Name*</label>
                                    <input placeholder='Enter your name' type='text' className='form-control' value={user.username} onChange={onFieldChange} name='username' />
                                </div>
                                <p className='error-text'>{errors?.username}</p>

                                <div className='mb-4'>
                                    <label className='form-label text-start'>Email*</label>
                                    <input placeholder='Enter your email' type='email' className='form-control' value={user.email} onChange={onFieldChange} name='email' />
                                </div>
                                <p className='error-text'>{errors?.email}</p>

                                <div className='mb-4'>
                                    <label className='form-label text-start'>Password*</label>
                                    <input placeholder='Password' type='password' className='form-control' value={user.password} onChange={onFieldChange} name='password' />
                                </div>
                                <p className='error-text'>{errors?.password}</p>

                                <input type="submit" value="Register" className='btn btn-primary w-100 mb-4' style={{ backgroundColor: "#106EBE", border: "1px solid #009688" }} />

                                <div className='mb-4'>
                                    <span>Already have an account?</span> <Link to='/login' className="link-offset-2 link-underline link-underline-opacity-10">Login</Link>
                                </div>

                                {isError && <div className='mb-5'>
                                    <h4 style={{ color: '#106EBE' }}>{errMessage}</h4>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
