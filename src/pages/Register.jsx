import React, { useState } from 'react';
import BlackLogo1 from "/BlackLogo1.png";
import BlackLogo2 from "/BlackLogo2.png";
import avatar from "/avatar.jpg";
import google from "/google.svg";
import { addNewUser } from "../Api/UsersAPI";
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        password: '',
        serverError: null
    });

    const [touched, setTouched] = useState({
        userName: false,
        email: false,
        password: false
    });

    const validate = () => {
        const newErrors = {
            userName: '',
            email: '',
            password: ''
        };

        let isValid = true;

        // Username validation
        if (!formData.userName.trim()) {
            newErrors.userName = 'Username is required';
            isValid = false;
        } else if (formData.userName.length < 3) {
            newErrors.userName = 'Username must be at least 3 characters';
            isValid = false;
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        } else if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter and one special character';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validate();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({
            userName: true,
            email: true,
            password: true
        });

        if (validate()) {
            try {
                const addedUser = await addNewUser(formData);
                sessionStorage.setItem('userData', JSON.stringify({ ...formData, role: "user" }));
                navigate('/')
            } catch (error) {
                setErrors({ ...errors, serverError:"email already exists "})
            }
        }
    };

    return (
        <div className="row p-0 m-0 bg-color-dark">
            <div className='d-flex' style={{ width: "150px", position: "absolute", top: "50px", left: "60px" }} >
                <img src={BlackLogo1} alt="" />
                <img src={BlackLogo2} alt="" />
            </div>

            <div className="col-12 col-lg-8 p-0 d-none d-lg-block">
                <img src={avatar} alt="" style={{ width: "100%", height: "100lvh", objectFit: 'fill' }} />
            </div>

            <div className="col-12 col-lg-4" style={{ backgroundColor: "#191919", color: "white", height: "100lvh", paddingTop: "70px" }}>
                <form onSubmit={handleSubmit} className='mt-5 pt-5 p-md-3 m-md-3' style={{
                    display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center",
                }}>
                    <h3>Create an account</h3>
                    <p className='text-white-50 text-center'>Let's get started with your 30 days free trial.</p>
                    <span style={{ backgroundColor: "#191919", position: "relative", top: '12px', padding: "0px 15px" }}>OR</span>
                    <div style={{
                        borderBottom: "1px solid white",
                        margin: "3px 0px 20px",
                        width: "75%"
                    }}></div>

                    <div className="w-75 position-relative">
                        <input
                            type="text"
                            name="userName"
                            className="w-100"
                            placeholder="Enter your User Name"
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderBottom: errors.userName && touched.userName ? '1px solid red' : '1px solid white',
                                padding: "7px 10px",
                                margin: "17px 0px 5px",
                                color: "white"
                            }}
                            value={formData.userName}
                            onChange={handleChange}
                            onBlur={() => handleBlur('userName')}
                        />
                        {errors.userName && touched.userName && (
                            <small className="text-danger position-absolute start-0" style={{ fontSize: '12px' }}>
                                {errors.userName}
                            </small>
                        )}
                    </div>


                    <div className="w-75 position-relative">
                        <input
                            type="email"
                            name="email"
                            className="w-100"
                            placeholder="Enter your email"
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderBottom: errors.email && touched.email ? '1px solid red' : '1px solid white',
                                padding: "7px 10px",
                                margin: "17px 0px 5px",
                                color: "white"
                            }}
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur('email')}
                        />
                        {errors.email && touched.email && (
                            <small className="text-danger position-absolute start-0" style={{ fontSize: '12px' }}>
                                {errors.email}
                            </small>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="w-75 position-relative">
                        <input
                            type="password"
                            name="password"
                            className="w-100"
                            placeholder="Enter your password"
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                borderBottom: errors.password && touched.password ? '1px solid red' : '1px solid white',
                                padding: "7px 10px",
                                margin: "17px 0px 5px",
                                color: "white"
                            }}
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={() => handleBlur('password')}
                        />
                        {errors.password && touched.password && (
                            <small className="text-danger position-absolute start-0" style={{ fontSize: '12px' }}>
                                {errors.password}
                            </small>
                        )}
                    </div>

                    {errors.serverError && (
                        <small className="text-danger position-absolute start-0" style={{ fontSize: '12px' }}>
                            {errors.serverError}
                        </small>
                    )}
                    <button
                        type='submit'
                        className="w-75 w-lg-50"
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            marginBottom: "10px",
                            border: "1px solid white",
                            padding: "7px",
                            borderRadius: "7px",
                        }}
                    >
                        Create account
                    </button>

                    <button
                        type='button'
                        className='w-75'
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            marginBottom: "10px",
                            border: "1px solid white",
                            padding: "7px",
                            borderRadius: "7px",
                        }}>
                        <img src={google} alt="" style={{ width: "25px", marginRight: "5px" }} />
                        Sign Up with Google
                    </button>
                </form>
            </div>
        </div>
    );
}