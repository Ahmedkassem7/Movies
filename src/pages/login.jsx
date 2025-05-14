import React, { useState } from 'react';
import logoImg from "/Vector.png";
import topGun from "/topGun.jpg";
import google from "/google.svg";
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from "../Api/UsersAPI"
export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    auth: null
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTouched = {
      email: true,
      password: true
    };
    setTouched(newTouched);
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };
    setErrors(newErrors);
    const isValid = !newErrors.email && !newErrors.password;

    if (isValid) {
      try {
        const user = await authenticateUser(formData.email, formData.password);
        console.log('Login successful', user);
        sessionStorage.setItem('userData', JSON.stringify({ ...formData, role: "user" }));
        navigate('/');

      } catch (error) {
        setErrors(prev => ({ ...prev, auth: error.message }));
      }
    }
  };

  return (
    <div className="row p-0 m-0">
      <img src={logoImg} alt="Movie Icon" style={{ width: "150px", position: "absolute", top: "50px", left: "60px" }} />

      <div className="col-12 col-lg-6" style={{
        backgroundColor: "#191919",
        color: "white",
        height: "100lvh",
        paddingTop: "80px"
      }}>
        <form onSubmit={handleSubmit} className='mt-5 pt-5 p-md-5 m-md-5' style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center",
        }}>
          <h3>Welcome back</h3>
          <p className='text-white-50'>Welcome back please enter your details</p>
          <span style={{
            backgroundColor: "#191919",
            position: "relative",
            top: '12px',
            padding: "0px 15px"
          }}>
            OR
          </span>
          <div style={{
            borderBottom: "1px solid white",
            margin: "3px 0px 20px",
            width: "75%"
          }}></div>

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
            Log in with Google
          </button>

          {/* Email Input */}
          <div className="w-75 position-relative mb-3">
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
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <small className="text-danger position-absolute start-0" style={{
                fontSize: '12px',
                color: '#dc3545',
                marginTop: '-15px'
              }}>
                {errors.email}
              </small>
            )}
          </div>

          {/* Password Input */}
          <div className="w-75 position-relative mb-3">
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
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <small className="text-danger position-absolute start-0" style={{
                fontSize: '12px',
                color: '#dc3545',
                marginTop: '-15px'
              }}>
                {errors.password}
              </small>
            )}
          </div>
          {errors.auth && (
            <small className="text-danger " style={{
              fontSize: '12px',
              color: '#dc3545',
            }}>
              {errors.auth}
            </small>
          )}
          <button
            type="submit"
            className="w-75 w-lg-50"
            style={{
              backgroundColor: 'white',
              color: 'black',
              marginBottom: "10px",
              border: "1px solid white",
              padding: "7px",
              borderRadius: "7px",
              marginTop: '20px'
            }}
          >
            Log In
          </button>
        </form>
      </div>

      <div className="col-12 col-lg-6 p-0 d-none d-lg-block">
        <img src={topGun} alt="" style={{ width: "100%", height: "100lvh", objectFit: 'fill' }} />
      </div>
    </div>
  );
}