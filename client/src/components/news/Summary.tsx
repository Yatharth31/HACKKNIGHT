import React from 'react';

interface PopupProps {
  onClose: () => void;
  summary: string;
  sentiment: string;
}

const Summary: React.FC<PopupProps> = ({ onClose, summary, sentiment }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>Close</button>
        <div className="popup-content">
          <div className="summary">
            <h4>Summary</h4>
            <p>{summary}</p>
          </div>
          <div className="sentiment">
            <h4>Sentiment: {sentiment}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
