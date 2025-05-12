import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css';



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

const [randomMovie, setRandomMovie] = useState(null);

useEffect(() => {
  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/movies');
      const data = await response.json();
      setMovies(data);
      if (data.length > 0) {
        const idx = Math.floor(Math.random() * data.length);
        setRandomMovie(data[idx]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  fetchMovies();
}, []);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3001/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };  
    fetchMovies();
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const validateName = (name) => {
    return /^[a-zA-Z_]/.test(name);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z_]/.test(email.split('@')[0]);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must start with a letter or underscore';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must start with a letter or underscore';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase and special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return '#ff0000';
      case 1: return '#ff4d4d';
      case 2: return '#ffcc00';
      case 3: return '#66cc66';
      case 4: return '#009900';
      default: return '#e0e0e0';
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Medium';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'user'
          }),
        });

        if (response.ok) {
          setSuccess(true);
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container ">
        <h2>Create Account</h2>
        {success && <div className="success-message">Registration successful! Redirecting to login...</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Must start with letter or _"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
            />
            <div className="password-strength-meter">
              <div 
                className="strength-bar" 
                style={{
                  width: `${passwordStrength * 25}%`,
                  backgroundColor: getPasswordStrengthColor()
                }}
              ></div>
            </div>
            <div className="password-strength-text" style={{color: getPasswordStrengthColor()}}>
              {formData.password && getPasswordStrengthText()}
            </div>
            <div className="password-requirements">
              <small>Password must contain:</small>
              <ul>
                <li className={formData.password.length >= 8 ? 'valid' : ''}>At least 8 characters</li>
                <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>One uppercase letter</li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'valid' : ''}>One special character</li>
              </ul>
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn">Register</button>

          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>

<div className="movies">
  <h3>Featured Movie</h3>
  {randomMovie && (
    <div className="featured-movie">
      <img
        src={randomMovie.poster_url}
        alt={randomMovie.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/800x1200?text=No+Poster';
        }}
      />
      <div className="movie-info">
        <div className="movie-title">{randomMovie.title}</div>
        <div className="movie-year">{randomMovie.release_date || randomMovie.year}</div>
        <div className="movie-genres">
          {Array.isArray(randomMovie.genres)
            ? randomMovie.genres.join(', ')
            : randomMovie.genres}
        </div>
      </div>
    </div>
  )}
</div>



    </div>
  );
};

export default RegisterForm;



