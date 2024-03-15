import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App'; 
// import dotenv from 'dotenv';

// dotenv.config();


const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
