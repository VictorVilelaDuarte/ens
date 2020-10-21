import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  @font-face {
    font-family: "Frutiger";
    src: url("../assets/font/FrutigerLTStd-Cn") format("otf"),
  }

  *{
    margin: 0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }

  html, body, #root{
    height: 100%;
  }

  body{
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font: 14px 'Frutiger', sans-serif;
  }

  a{
    text-decoration: none !important;
    cursor: pointer;
  }

  ul{
    list-style: none;
  }

  button{
    cursor: pointer;
  }

  button:focus{
    outline: none;
  }
`;
