

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const navigate = useNavigate();

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

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          'http://localhost:3001/users?email=' + encodeURIComponent(formData.email)
        );
        const users = await response.json();
        if (users.length && users[0].password === formData.password) {
          setSuccess(true);
          setTimeout(() => {
            if (users[0].role === "admin") {
              navigate('/admin');
            } else {
              navigate('/home');
            }
          }, 1200);
        } else {
          setErrors({ submit: 'Invalid email or password' });
        }
      } catch (error) {
        setErrors({ submit: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <div className="auth-container">
      {/* Left: Login Form */}
      <div className="form-container">
        <h2>Login</h2>
        {success && <div className="success-message">Login successful! Redirecting...</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <div className="login-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>

      {/* Right: One Big Movie Poster */}
      <div className="movies">
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

export default LoginForm;
