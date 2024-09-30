import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <header className="home-header">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn-outline">Sign Up</Link>
      </header>
      <main className="home-main">
        <h1>Welcome to Practical test of Suresh for MERN Stack role</h1>
        <p>Looking Forward to working with your organization.</p>
      </main>
    </div>
  );
};

export default Home;
