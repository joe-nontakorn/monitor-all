import React from 'react';
import CustomRouter from './router/router'; // Adjust the path if needed
  // import dotenv from 'dotenv';
  // dotenv.config();

const App = () => {
  return (
    <React.StrictMode>
      <CustomRouter />
    </React.StrictMode>
  );
};

export default App;