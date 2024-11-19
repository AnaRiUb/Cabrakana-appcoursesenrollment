// ./src/pages/Forums.tsx
import React from 'react';
import MyCreatedForumsButton from '../components/Buttons/MyCreatedForumsButton';
import MyEnrolledForumsButton from '../components/Buttons/MyEnrolledForumsButton';

const Forums: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <h1>Forums Page</h1>
      <MyCreatedForumsButton onClick={handleButtonClick} label="View My Forums" />
      <MyEnrolledForumsButton />
    </div>
  );
};

export default Forums;
