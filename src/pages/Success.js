import React from "react";
import styled from "styled-components";

const Success = () => {
  return (
    <SuccessContainer>
      <div>
        <h1>Payment successful</h1>
      </div>
    </SuccessContainer>
  );
};

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Success;
