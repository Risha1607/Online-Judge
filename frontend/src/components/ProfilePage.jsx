import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './ProfilePage.css'; // Ensure the CSS file is imported

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data');
      }
    };
    fetchProfileData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const renderSubmissions = (submissions) => {
    if (!submissions || submissions.length === 0) {
      return <p>No submissions found.</p>;
    }
    return (
      <div className="table-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Verdict</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td>{submission.problemId?.title || 'Unknown'}</td>
                <td>{submission.result === 'Passed' ? 'Accepted' : 'Rejected'}</td>
                <td>{new Date(submission.submittedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContestSubmissions = (contestSubmissions) => {
    if (!contestSubmissions || contestSubmissions.length === 0) {
      return <p>No contest submissions found.</p>;
    }

    // Group submissions by contestId
    const submissionsByContest = contestSubmissions.reduce((acc, submission) => {
      const contestId = submission.contestId?._id;
      if (!acc[contestId]) {
        acc[contestId] = {
          contestName: submission.contestId?.name || 'Unknown Contest',
          submissions: [],
          problems: submission.contestId?.problems || [],
        };
      }
      acc[contestId].submissions.push(submission);
      return acc;
    }, {});

    return Object.keys(submissionsByContest).map((contestId) => {
      const contest = submissionsByContest[contestId];
      return (
        <div key={contestId} className="table-container">
          <h4>{contest.contestName}</h4>
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Verdict</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {contest.submissions.map((submission) => {
                // Find the problem title within the contest
                const problemTitle = contest.problems?.find(
                  (problem) => problem._id.toString() === submission.problemId.toString()
                )?.title || 'Unknown';

                return (
                  <tr key={submission._id}>
                    <td>{problemTitle}</td>
                    <td>{submission.result === 'Passed' ? 'Accepted' : 'Rejected'}</td>
                    <td>{new Date(submission.submittedAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className="profile-page">
      <h1> My Profile </h1>
      {user && (
        <>
          <h2>{user.firstname} {user.lastname}</h2>
          <p>Email: {user.email}</p>
        </>
      )}
      <div className="profile-section">
        <h3>Practice Submissions</h3>
        {renderSubmissions(profileData.practiceSubmissions)}
      </div>
      <div className="profile-section">
        <h3>Contest Submissions</h3>
        {renderContestSubmissions(profileData.contestSubmissions)}
      </div>
    </div>
  );
};

export default ProfilePage;
