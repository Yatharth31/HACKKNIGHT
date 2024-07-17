// import React from 'react';
import '../../App.css';
import TextBox from '@/components/ui/textbox';

export default function Intro() {
  return (
    <div
      className="intro-container"
      style={{ marginTop: '70px', marginBottom: '70px', marginLeft: '100px' }}
    >
      <img alt="Intro Image" className="width: 16rem" src="Intro_image.svg" />
      <TextBox content="Welcome to Loander, the revolutionary platform redefining peer-to-peer microloans. Dive into a community of trusted lenders and borrowers, ensuring transparent, secure, and swift financial interactions. No long waits, no exhaustive paperwork - just genuine connections." />
    </div>
  );
}
