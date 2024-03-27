/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";

import Monitor1 from "../components/monitor1";
import Monitor2 from "../components/monitor2";

import Monitor3 from "../components/monitor3";

import "../assets/monitor1.css";


function App() {
  const [webSocketData, setWebSocketData] = useState(null);
  // Connect to WebSocket server
  useEffect(() => {
    const ws = new WebSocket("ws://monitor.jastel.local" );

    console.log("WebSocket :", ws);

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    if (ws.readyState === WebSocket.CLOSED) {
      console.log("WebSocket connection closed before it was established");
    }

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const fetchData1 = () => {
      // Implement your logic to fetch data here
      console.log("Fetching data from server...");
    };

    const intervalId = setInterval(fetchData1, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const refreshPage = () => {
  //     window.location.reload();
  //   };

  //   const timeoutId = setTimeout(refreshPage, 30000);

  //   return () => clearTimeout(timeoutId);
  // }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setWebSocketData(data);
      // console.log('set :',data)
    };

    if (webSocketData) {
      const ws = new WebSocket("ws://monitor.jastel.internal");
      ws.onmessage = handleMessage;

      return () => {
        ws.close();
      };
    }
  }, [webSocketData]);
  return (
    <div className="container">
      <Monitor1 />
      <br />
      <Monitor2 />
      <br />
      <Monitor3 />
    </div>
  );
}

export default App;
