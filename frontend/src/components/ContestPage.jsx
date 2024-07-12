import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContestPage.css';
import Lottie from 'react-lottie';
import animationData from '../assets/animation2.json';
import { Link } from 'react-router-dom';

const ContestPage = () => {
  const [contests, setContests] = useState({ upcoming: [], ongoing: [], ended: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contests');
        console.log('Fetched Contests:', response.data); // Log fetched contests
        setContests(response.data);
      } catch (error) {
        console.error('Error fetching contests:', error); // Log any errors
        setError('Error fetching contests');
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const currentTime = new Date();

  return (
    <div className="contest-page">
      <header>
        <Lottie options={defaultOptions} height={200} width={100} />
        <h1>Contest</h1>
        <p>Contest every week. Compete and see your ranking!</p>
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {contests.ongoing.length > 0 && (
            <div className="ongoing-contests">
              <h2>Ongoing Contests</h2>
              <div className="contest-list">
                {contests.ongoing.map(contest => (
                  <div key={contest._id} className="contest-card">
                    <Link to={`/contests/${contest._id}`}>
                      <h3>{contest.name}</h3>
                      <p>Started: {new Date(contest.startDate).toLocaleString()}</p>
                      <p>Ends: {new Date(contest.endDate).toLocaleString()}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contests.upcoming.length > 0 && (
            <div className="upcoming-contests">
              <h2>Upcoming Contests</h2>
              <div className="contest-list">
                {contests.upcoming.map(contest => (
                  <div key={contest._id} className="contest-card">
                    <Link to={`/contests/${contest._id}`}>
                      <h3>{contest.name}</h3>
                      <p>Starts: {new Date(contest.startDate).toLocaleString()}</p>
                      <p>Ends: {new Date(contest.endDate).toLocaleString()}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {contests.ended.length > 0 && (
            <div className="past-contests">
              <h2>Past Contests</h2>
              <div className="contest-list">
                {contests.ended.map(contest => (
                  <div key={contest._id} className="contest-card">
                    <Link to={`/contests/${contest._id}`}>
                      <h3>{contest.name}</h3>
                      <p>Started: {new Date(contest.startDate).toLocaleString()}</p>
                      <p>Ended: {new Date(contest.endDate).toLocaleString()}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContestPage;
