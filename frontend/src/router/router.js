import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../pages/Home'; 

const CustomRouter = () => {
  return (
    <Router>
        <Route path="/" component={Home} />
    </Router>
  );
};

export default CustomRouter;
