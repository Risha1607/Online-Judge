import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Make sure to create and style this CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to CodeConquest</h1>
        <p>Compete, Code, Conquer</p>
        <Link to="/LoginUI" className="cta-button">Get Started</Link>
      </header>
      <section className="featured-problems">
        <h2>Featured Problems</h2>
        <div className="problems-list">
          {/* Example of featured problems. Replace with actual data */}
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
      <section className="upcoming-contests">
        <h2>Upcoming Contests</h2>
        <div className="contests-list">
          {/* Example of upcoming contests. Replace with actual data */}
          <div className="contest-card">
            <Link to="/contests/1">
              <h3>Weekly Coding Contest #1</h3>
              <p>Date: 2023-07-01</p>
            </Link>
          </div>
          <div className="contest-card">
            <Link to="/contests/2">
              <h3>Monthly Challenge: July</h3>
              <p>Date: 2023-07-15</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="leaderboard">
        <h2>Top Coders</h2>
        <div className="leaderboard-list">
          {/* Example of top coders. Replace with actual data */}
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
