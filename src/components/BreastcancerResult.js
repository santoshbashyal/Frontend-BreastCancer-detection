import React from 'react';

const BreastCancerResult = ({ isBreastCancerDetected }) => {
  return (
    <div>
      {isBreastCancerDetected ? (
        <h2>BreastCancer Detected</h2>
      ) : (
        <h2>No BreastCancer Detected</h2>
      )}
    </div>
  );
};

export default BreastCancerResult;
