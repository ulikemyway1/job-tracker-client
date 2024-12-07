import React from "react";
import styled, { keyframes} from "styled-components";


const progress = keyframes`
  0% {
    left: -105%;
    background-color: var(--yellow);
  }

  50% {
    left: 105%;
    background-color: var(--blue);
  }

  100% {
    left: -105%;
    background-color: var(--yellow);
  }
`;


const progressInvert = keyframes`
  0% {
    left: -105%;
    background-color: var(--red);
  }

  50% {
    left: 105%;
    background-color: var(--blue);
  }

  100% {
    left: -105%;
    background-color: var(--red);
  }
`;

const StyledLoader = styled.div`
.loader {
    &__text {
        margin-top: 30px;
        text-align: center;
        font-size: 30px;
        color: #ffffff;
        text-transform: uppercase;
        background: none;
        -webkit-text-fill-color: #ffffff;
    }
}

.progress {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    margin: 30px auto;
    height: 80px;
    width: 120px;
    overflow: hidden;

    &__bar {
        position: relative;
        width: 100%;
        height: 10px;
        left: -105%;
        background-color: var(--yellow);
        border-radius: 6px;
        animation-name: ${progress};
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-timing-function: ease;

        &:nth-of-type(2),
        &:nth-of-type(4) {
            animation-name: ${progressInvert};
            anima-duration: 2s;
            animation-direction: reverse;
    }
}
`

function Loader ({text}) {

    return (
   <StyledLoader>
      <p className="loader__text"> {text} </p>
      <div className="progress">
        <div className="progress__bar"></div>
        <div className="progress__bar"></div>
        <div className="progress__bar"></div>
        <div className="progress__bar"></div>
      </div>
   </StyledLoader>
)

}

export default Loader;