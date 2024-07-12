import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CodeConquest</h1>
          <p>Compete, Code, Conquer</p>
          <Link to="/login" className="cta-button">Get Started</Link>
        </div>
      </header>
      <section className="introduction">
        <h2>About CodeConquest</h2>
        <p>
          CodeConquest is an interactive platform where you can improve your coding skills by solving problems and competing in contests. Whether you're a beginner looking to learn the basics or an advanced coder aiming to hone your skills, CodeConquest offers a variety of challenges that will help you grow. Join our community and start your journey to become a coding master today!
        </p>
      </section>
      <section className="section-box">
        <h2>Featured Problems</h2>
        <div className="problems-list">
          <div className="problem-card">
            <Link to="/problems/1">
              <h3>Two Sum</h3>
              <p>Difficulty: Easy</p>
            </Link>
          </div>
          <div className="problem-card">
            <Link to="/problems/2">
              <h3>Longest Substring Without Repeating Characters</h3>
              <p>Difficulty: Medium</p>
            </Link>
          </div>
          <div className="problem-card">
            <Link to="/problems/3">
              <h3>Median of Two Sorted Arrays</h3>
              <p>Difficulty: Hard</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="section-box">
        <h2>Upcoming Contests</h2>
        <div className="contests-list">
          <div className="contesthome-card">
            <Link to="/contests/1">
              <h3>Weekly Coding Contest #1</h3>
              <p>Date: 2024-07-01</p>
            </Link>
          </div>
          <div className="contesthome-card">
            <Link to="/contests/2">
              <h3>Monthly Challenge: July</h3>
              <p>Date: 2024-07-15</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="section-box">
        <h2>Top Coders</h2>
        <div className="leaderboard-list">
          <div className="coder-card">
            <Link to="/profile/1">
              <h3>CoderOne</h3>
              <p>Problems Solved: 120</p>
            </Link>
          </div>
          <div className="coder-card">
            <Link to="/profile/2">
              <h3>CodeMaster</h3>
              <p>Problems Solved: 110</p>
            </Link>
          </div>
          <div className="coder-card">
            <Link to="/profile/3">
              <h3>AlgoPro</h3>
              <p>Problems Solved: 105</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


