import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;

const spinner = keyframes`
to {
    transform: rotate(360deg);
}
`;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.4);
  border-top-color: #fff;
  animation: ${spinner} 600ms linear infinite;
`;
