import React from 'react';

import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './TopicCard.css';

import codingImage from '../assets/images/coding-image2.jpg'; // Adjust the path as necessary

const TopicCard = ({ topic }) => {
  // Use the imported image directly
  return (
    <Link to={`/problems/topic/${topic.key}`} className="topic-card-link">
      <Card className="topic-card">
        <Card.Img variant="top" src={codingImage} alt={topic.title} className="topic-image" />
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Text className="card-description">{topic.description}</Card.Text>
          <div className="card-meta">
            <span>{topic.chapters} Chapters</span>
            <span>{topic.items} Items</span>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};




