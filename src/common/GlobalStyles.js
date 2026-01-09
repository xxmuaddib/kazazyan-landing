import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Inter", sans-serif;
    background-color: #F3F3F3;
  }

  * {
    font-family: "Bricolage Grotesque", sans-serif;
    box-sizing: border-box;
  }

  input, textarea, button {
  &:focus {
      outline: solid #999999;
      border: none !important;
    }
  }

  .ReactModal__Overlay {
    background: rgba(0, 0, 0, 0.5);;
  }
  .ReactModal__Content {
    width: calc(100% - 32px);
    top: 50% !important;
    left: 50% !important;
    right: auto !important;
    bottom: auto !important;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border-radius: 0 !important;
    padding: 0 !important;
    position: relative;
    @media (min-width: 1024px) {
      width: 906px;
      min-height: 323px;
    }
  }

  input, textarea, select {
    font-size: 16px;
  }
`;
