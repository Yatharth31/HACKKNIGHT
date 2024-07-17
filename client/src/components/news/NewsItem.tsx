import React, { useState } from 'react';
import Summary from './Summary';

interface NewsItemProps {
  title: string;
  description: string;
  imgUrl?: string;
  newsUrl: string;
  author?: string;
  date: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, description, imgUrl, newsUrl, author, date }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [summary, setSummary] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSummarizeClick = async () => {
    setLoading(true); // Set loading to true when button is clicked

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: newsUrl })
      });

      setLoading(false); // Set loading to false when response is received

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      const data = await response.json();
      setSummary(data.summary);
      setSentiment(data.sentiment);
      setShowPopup(true);
    } catch (error) {
      setLoading(false); // Ensure loading is reset on error
      console.error('Error fetching summary:', error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSummary('');
    setSentiment('');
  };

  return (
    <div className='my-3'>
      <div className="card h-100 position-relative">
        <img
          src={imgUrl ? imgUrl : "https://economictimes.indiatimes.com/thumb/msid-102698198,width-1070,height-580,imgsize-88698,overlay-etmarkets/photo.jpg"}
          className="card-img-top"
          alt={title}
          style={{ objectFit: 'cover', height: '200px' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title"><strong>{title}...</strong></h5>
          <p className="card-text"><em>{description}...</em></p>
          <p className="card-text mt-auto">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <div className="mt-2">
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark mx-1 my-1">
              Read More
            </a>
            <button onClick={handleSummarizeClick} className="btn btn-sm btn-light mx-1 my-1">
              {loading ? 'Loading...' : 'Summarize'}
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <Summary onClose={handleClosePopup} summary={summary} sentiment={sentiment} />
      )}
    </div>
  );
};

export default NewsItem;
