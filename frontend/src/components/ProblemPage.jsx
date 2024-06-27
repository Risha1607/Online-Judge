import React from 'react';
import { Link } from 'react-router-dom';
import TopicCard from './TopicCard';
import problems from '../problem';
import './ProblemPage.css';

const ProblemPage = () => {
  console.log('Rendering ProblemPage with problems:', problems);
  return (
    <div className="problem-page">
      {Object.keys(problems).map((topicKey) => (
        <Link to={`/problems/topic/${problems[topicKey].key}`} key={topicKey}>
          <TopicCard topic={problems[topicKey]} />
        </Link>
      ))}
    </div>
  );
};

export default ProblemPage;



