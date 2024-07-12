import React from 'react';
import TopicCard from './TopicCard';
import problems from '../problem';
import './ProblemPage.css';

const ProblemPage = () => {
  console.log('Rendering ProblemPage with problems:', problems);
  return (
    <div className="problem-page">
      {Object.keys(problems).map((topicKey) => (
        <TopicCard key={topicKey} topic={problems[topicKey]} />
      ))}
    </div>
  );
};

export default ProblemPage;


