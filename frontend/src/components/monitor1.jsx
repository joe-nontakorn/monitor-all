/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/monitor1.css";
import JastelLogo from "../assets/jastel.jpg";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [allSensorNames, setAllSensorNames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/v1/monitor")
      .then((response) => {
        setSensorData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const names = [];
    sensorData.forEach((locationData) => {
      locationData.BinaryInSet.forEach((binaryInput) => {
        if (!names.includes(binaryInput.Name)) {
          names.push(binaryInput.Name);
        }
      });

      locationData.SenSet.forEach((sensor) => {
        if (!names.includes(sensor.Name)) {
          names.push(sensor.Name);
        }
      });
    });
    setAllSensorNames(names);
  }, [sensorData]);

  const sensorOrder = [
    "Door",
    "AC",
    "Smoke1",
    "smoke2",
    "Humidity",
    "Temperature",
    "Motion1",
    "Rectifier",
  ];

  return (
    <div className="monitor1">
      <div>
        <img src={JastelLogo} alt="Jastel Logo" />
      </div>
      <table className="sensor-table1">
        <thead className="thead-table1">
          <tr>
            <th>Sensor</th>
            {sensorData.map((locationData, index) => (
              <th key={index}>{locationData.location}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tbody-table1">
          {sensorOrder.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname">{sensorName}</td>
              {sensorData.map((locationData, locationIndex) => {
                
                const sensor =
                  locationData.BinaryInSet.find((s) => s.Name === sensorName) ||
                  locationData.SenSet.find((s) => s.Name === sensorName);
                return (
                  <td key={locationIndex}>
                    {sensor ? sensor.Value : "-"}{" "}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>


      
    </div>
  );
}

export default App;
