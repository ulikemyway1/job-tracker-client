import React from "react";
import Loader from "./Loader";
import styled, { keyframes } from 'styled-components';

const shadowMove = keyframes`
0% {
  text-shadow: 0px 0px 0px rgba(229, 246, 44, 0.5);
}
50% {
  text-shadow: 0px 0px 0px rgba(100, 61, 241, 0.5);
}
100% {
  text-shadow: 0px 0px 0px rgba(229, 246, 44, 0.5);

`;

const StyledPreloader = styled.div`
  background: linear-gradient(90deg, var(--blue), var(--yellow));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-align: center;

  .preloader__title {
    font-size: clamp(40px, 10vw, 120px);
    font-weight: 900;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 5px;
    animation: ${shadowMove} 4s infinite;
  }
`;

function Preloader ({show}) {    
    if (!show) return null;
  return (
    <StyledPreloader>
      <h1 className="preloader__title">Jobs Tracker</h1>
      <Loader text="Loading..." />
    </StyledPreloader>
  );
}

export default Preloader;