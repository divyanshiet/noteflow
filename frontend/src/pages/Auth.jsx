import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notebook, ArrowLeft } from 'lucide-react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      isLogin ? navigate('/dashboard') : navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="nav-left">
              <div className="logo-container">
                <Notebook className="logo-icon" />
                <span className="logo-text">NoteFlow</span>
              </div>
            </div>
            <button className="back-button" onClick={() => navigate('/')}> 
              <ArrowLeft className="back-icon" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>
      <main className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <input type="text" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
              </div>
            )}
            <div className="form-group">
              <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>
            {!isLogin && (
              <div className="form-group">
                <input type="password" id="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            )}
            <button type="submit" className="auth-submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
          </form>
          <div className="auth-switch">
            <p>{isLogin ? "Don't have an account?" : "Already have an account?"}
              <button className="switch-button" onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Auth;