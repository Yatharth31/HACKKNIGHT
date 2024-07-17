import React from 'react';
import '../../App.css';

const cardContents = [
  {
    title: 'Trusted Community',
    text: 'Every member goes through a verification process, ensuring a community built on trust and transparency.',
  },
  {
    title: 'Swift Matches',
    text: 'Our algorithm prioritizes your preferences, presenting you with profiles that best align with your needs.',
  },
];

export default function Why() {
  return (
    <div
      className="flex justify-center items-start"
      style={{ marginTop: '40px' }}
    >
      <div
        style={{
          width: '22.5625rem',
          height: '24.5rem',
          flexShrink: 0,
          marginRight: '20px',
        }}
      >
        <img alt="Loander Logo" className="" src="Phone_and_coin.svg" />
      </div>
      <div className="flex-grow">
        <h1 className="section-title mt-16 mb-16 text-center">
          Why choose Loander?
        </h1>

        <div className="flex justify-between px-10">
          {cardContents.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                borderRadius: '0.625rem',
                border: '1px solid #7C43B1',
                background: '#FFF',
                padding: '20px',
                width: '48%',
              }}
            >
              <h2
                className="text-gray-900 mb-2"
                style={{
                  color: '#7C43B1',
                  textAlign: 'center',
                  fontSize: '1.125rem',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '2.5rem',
                }}
              >
                {card.title}
              </h2>
              <p
                className="text-gray-900"
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '1.875rem',
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
