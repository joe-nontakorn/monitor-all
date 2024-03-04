/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assets/monitor2.css'
function App() {
  const [sensorData, setSensorData] = useState([]);
  const [HYIData, setHYIData] = useState([]); // เพิ่ม state สำหรับข้อมูลจาก HYI
  const [allSensorNames, setAllSensorNames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/v1/monitor2")
      .then((response) => {
        setSensorData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching monitor2 data:", error);
      });

    axios
      .get("http://localhost:4001/api/v1/HYI")
      .then((response) => {
        setHYIData(response.data.data); // บันทึกข้อมูลจาก HYI
      })
      .catch((error) => {
        console.error("Error fetching HYI data:", error);
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

  const sensorOrder1 = [
    "Door",
    "AC",
    "Smoke1",
    "Humidity",
    "Temperature",
    "Rectifier",
    "Recti11",
    "Recti12",
    "Recti21",
    "Recti22",
    "Gen1",
  ];

  const sensorOrder2 = [
    "smoke_Inven",
    "Smoke_Power",
    "Smoke_EQ1",
    "Humidity_Power",
    "Temp_Power",
    "Humidity_EQ",
    "Temp_EQ",
    "Gen",
    "Gen1",
    "AC",
    "Humidity",
    "Temperature",
    "smoke_patching",
   

  ];

  return (
    <div className="monitor2">
      <table className="sensor-table2">
        <thead className="thead-table2">
          <tr>
            <th>Sensor</th>
            {sensorData.map((locationData, index) => (
              <th key={index}>{locationData.location}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tbody-table2">
          {sensorOrder1.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname2">{sensorName}</td>
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

      <table className="sensor-table3">
        <thead className="thead-table3">
          <tr>
            <th className="thead-table3">Sensor</th>
            {HYIData.map((locationData, index) => (
              <th key={index}>{locationData.location}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tbody-table3">
          {sensorOrder2.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname3">{sensorName}</td>
              {HYIData.map((locationData, locationIndex) => {
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
