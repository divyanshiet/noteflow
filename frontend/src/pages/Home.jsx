import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Notebook, Github, LogIn } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="nav-left">
              <div className="logo-container">
                <Notebook className="logo-icon" />
                <span className="logo-text">NoteFlow</span>
              </div>
              <a href="/" className="nav-link">Home</a>
            </div>
            <div className="nav-right">
              <a
                href="https://github.com"
                className="github-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="github-icon" />
                <span className="github-text">GitHub</span>
              </a>
              <button className="login-button" onClick={handleAuthClick}>
                <LogIn className="login-icon" />
                Login / Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="main">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Capture your thoughts,
                <span> organize your life</span>
              </h1>
              <p className="hero-description">
                NoteFlow is your digital notebook that helps you capture, organize, and share your ideas effortlessly. 
                With powerful organization tools and seamless sync across devices, your thoughts are always within reach.
              </p>
              <button className="cta-button" onClick={handleAuthClick}>
                Get Started - It's Free
              </button>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800"
                alt="Note taking illustration"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            Created with ❤️ by{' '}
            <a
              href="https://github.com"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;