import React from 'react';

interface SummaryProps {
  onClose: () => void;
  summary: string;
  sentiment: string;
}

const Summary: React.FC<SummaryProps> = ({ onClose, summary, sentiment }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>Close</button>
        <div className="popup-content">
        <div className="sentiment">
            <h3><strong>Sentiment:</strong> {sentiment}</h3>
          </div>
          <div className="summary">
            <h3><strong>Summary</strong></h3>
            <p>{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
