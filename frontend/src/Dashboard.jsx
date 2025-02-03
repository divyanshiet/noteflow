import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ImagePlus} from 'lucide-react';
import { LogOut, Search, Star, Home } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simulate fetching user details from local storage
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="logo">
            <Home className="icon" />
            <h1>AI Notes</h1>
          </div>
          <nav className="nav-menu">
            <button className="nav-item">
              <Home className="icon" /> Home
            </button>
            <button className="nav-item">
              <Star className="icon" /> Favourites
            </button>
          </nav>
        </div>
        <div className="user-info">
          {user && <span>{user.name}</span>}
          <button className="logout-button" onClick={handleLogout}>
            <LogOut className="icon" /> Log Out
          </button>
        </div>
      </aside>

      <main className="content">
        <header className="content-header">
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
          />
          <Search className="search-icon" />
        </header>

        <section className="notes">
          <div className="note-card">
            <div className="note-header">
              <span>Jan 30, 2025 • 5:26 PM</span>
              <span className="note-type">Audio</span>
            </div>
            <h3>Engineering Assignment Audio</h3>
            <p>
              I'm recording an audio to transcribe into text for the assignment
              of engineering in terms of actors.
            </p>
            <span>1 Image</span>
          </div>

          <div className="note-card">
            <div className="note-header">
              <span>Jan 30, 2025 • 5:21 PM</span>
              <span className="note-type">Text</span>
            </div>
            <h3>Random Sequence</h3>
            <p>SSXSCSCSCSC</p>
          </div>
        </section>

        <footer className="recording-footer">
          
        <ImagePlus className="addicon" />
        <input className="record-input" placeholder="Enter The Title"/>
          <button className="record-button">Start Recording</button>
        </footer>
      </main>

    
    </div>
  );
}

export default Dashboard;