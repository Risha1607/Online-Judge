import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './TopicCard.css';

const TopicCard = ({ topic }) => {
  return (
    <Link to={`/problems/topic/${topic.key}`} className="topic-card-link" aria-label={`Learn more about ${topic.title}`}>
      <Card className="topic-card">
        <Card.Img 
          variant="top" 
          src={topic.image} 
          alt={topic.title} 
          className="topic-image"
          onError={(e) => { e.target.onerror = null; e.target.src = 'path_to_default_image.jpg'; }}
        />
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

TopicCard.propTypes = {
  topic: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    chapters: PropTypes.number,
    items: PropTypes.number
  }).isRequired
};

export default TopicCard;





