import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { fetchProblemsByTopic } from '../service/api';
import './TopicProblemsPage.css';

const TopicProblemsPage = () => {
    const { topicKey } = useParams();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await fetchProblemsByTopic(topicKey);
                setProblems(data);
            } catch (error) {
                console.error("Error fetching problems:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [topicKey]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="topic-problems-page">
            <h1>{topicKey} Problems</h1>
            <table className="problems-table">
                <thead>
                    <tr>
                        <th>Title</th>
                       
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map(problem => (
                        <tr key={problem._id}>
                            <td>
                                <Link to={`/problem/${problem._id}`}>{problem.title}</Link>
                            </td>
                            
                            <td>{problem.difficulty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopicProblemsPage;







