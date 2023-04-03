import React from 'react';

function Loading() {
  return (
    <>
      <style>
        {`
          @keyframes flash {
            0% {
              color: #edbe02;
            }
            50% {
              color: #f28720;
            }
            100% {
              color: #edbe02;
            }
          }
        `}
      </style>
      <h1 style={{ fontFamily: 'Fugaz One, cursive', animation: 'flash 1s linear infinite'}}>Loading...</h1>
    </>
  );
}

export default Loading;