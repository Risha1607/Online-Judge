import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './ContestProblems.css';

const ContestProblems = () => {
  const { contestId } = useParams();
  const [problems, setProblems] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contestStatus, setContestStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('problems');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/contests/${contestId}/problems`);
        console.log('Fetched Problems:', response.data); // Log fetched problems
        if (response.data && Array.isArray(response.data)) {
          setProblems(response.data);
        } else {
          setProblems([]);
          setError('Invalid data format');
        }
        setContestStatus('live');
      } catch (error) {
        console.error('Error fetching problems:', error); // Log any errors
        if (error.response && error.response.status === 403) {
          setContestStatus(error.response.data.error);
        } else {
          setError('Error fetching problems');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [contestId]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get(`http://localhost:8000/contests/${contestId}/rankings`, {
          headers: {
            Authorization: token // Pass token in headers
          }
        });
        console.log('Fetched Rankings:', response.data); // Log fetched rankings
        if (response.data && Array.isArray(response.data)) {
          setRankings(response.data);
        } else {
          setRankings([]);
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching rankings:', error); // Log any errors
        setError('Error fetching rankings');
      }
    };

    fetchRankings();

    // Set up WebSocket connection
    const token = localStorage.getItem('token');
    const socket = new WebSocket(`ws://localhost:8000?token=${token}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const updatedRankings = JSON.parse(event.data);
      console.log('Updated Rankings from WebSocket:', updatedRankings); // Log updated rankings
      setRankings(updatedRankings);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [contestId]);

  return (
    <div className="contest-problems">
      <h2>Contest Problems</h2>
      <div className="tab-container">
        <button
          className={activeTab === 'problems' ? 'active' : ''}
          onClick={() => setActiveTab('problems')}
        >
          Problems
        </button>
        <button
          className={activeTab === 'leaderboard' ? 'active' : ''}
          onClick={() => setActiveTab('leaderboard')}
        >
          Rankings
        </button>
      </div>
      {activeTab === 'problems' ? (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : contestStatus === 'live' ? (
            <ul className="problem-list">
              {problems.map((problem) => (
                <li key={problem._id}>
                  <Link to={`/contests/${contestId}/problems/${problem.title}`}>{problem.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>{contestStatus}</p>
          )}
        </>
      ) : (
        <div>
          {rankings.length === 0 ? (
            <p>No rankings available</p>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Score</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((ranking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ranking.user.firstname} {ranking.user.lastname}</td>
                    <td>{ranking.totalScore}</td>
                    <td>{new Date(ranking.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ContestProblems;
