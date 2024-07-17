import React from 'react';
import '../../App.css'; // Import the CSS file for styling

interface TextBoxProps {
  content: string;
}

const TextBox: React.FC<TextBoxProps> = ({ content }) => {
  const processedContent = content.replace(/(Loander)/, '<strong>$1</strong>');

  return (
    <div className="text-box flex items-center">
      <p
        className="text-box-typography"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
};

export default TextBox;
