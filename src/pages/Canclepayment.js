import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CancelPayment = () => {
  return (
    <CenteredContainer>
      <div>
        <h1>Payment has been canceled due to some error!</h1>
      </div>
    </CenteredContainer>
  );
};

export default CancelPayment;
