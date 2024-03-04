/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/monitor1.css";
import JastelLogo from "../assets/images/jastel.jpg";

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
      const isDoor = sensorName === "Door";
      const isAC = sensorName === "AC";
      const isSmoke1 = sensorName === "Smoke1";
      const isSmoke2 = sensorName === "smoke2";
      const isMotion1 = sensorName === "Motion1";
      const isRectifier = sensorName === "Rectifier";

      const isHumidity = sensorName === "Humidity";
      const isTemperature = sensorName === "Temperature";
  
      const isClose = sensor && sensor.Value === "Close";
      const isNormal = sensor && sensor.Value === "Normal";
      const isLost = sensor && sensor.Value === "Lost!"; //เป็น Lost! ให้พื้นหลังเป็น สีแดง

      const isDash = sensor && sensor.Value === "-";
  
      return (
        <td
          key={locationIndex}
          className={`
            ${isDoor && isClose ? "lightgray" : ""}
            ${isDoor && !isClose ? "red flashing" : ""}

            ${isAC && isNormal ? "lightpink" : ""}
            ${isAC && isLost ? "red flashing" : ""}

            ${isSmoke1 && isNormal ? "lightgray" : ""}
            ${isSmoke1 && isLost ? "red flashing" : ""}

            ${isSmoke2 && isNormal ? "lightgray" : ""}
            ${isSmoke2 && isLost ? "red flashing" : ""}
            ${isSmoke2 && !isNormal && !isDash ? "lightgray" : ""}

            ${isMotion1 && isNormal ? "lightyellow" : ""}
            ${isMotion1 && isLost ? "red flashing" : ""}
            ${isMotion1 && !isNormal && !isDash ? "lightyellow" : ""}

            ${isRectifier && isNormal ? "lightyellow" : ""}
            ${isRectifier && isLost ? "red flashing" : ""}
            ${isRectifier && !isNormal && !isDash ? "lightyellow" : ""}

            ${isHumidity && sensor.Value < 75 ? "lightgreen" : ""}
            ${isHumidity && sensor.Value > 75 ? "red flashing" : ""}

            ${isTemperature && sensor.Value < 40 ? "lightgreen" : ""}
            ${isTemperature && sensor.Value > 50 ? "red flashing" : ""}

          `}
        >
          {sensor ? sensor.Value : "-"}
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
