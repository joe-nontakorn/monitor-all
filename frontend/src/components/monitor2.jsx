/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/monitor2.css";
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
    "Humidity",
    "Temperature",
    "Gen",
    "Gen1",
    "AC",
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

                const isDoor = sensorName === "Door";
                const isAC = sensorName === "AC";
                const isSmoke1 = sensorName === "Smoke1";
                const isMotion1 = sensorName === "Motion1";
                const isRectifier = sensorName === "Rectifier";

                const isHumidity = sensorName === "Humidity";
                const isTemperature = sensorName === "Temperature";

                const isRecti11 = sensorName === "Recti11";
                const isRecti12	 = sensorName === "Recti12";
                const isRecti21 = sensorName === "Recti21";
                const isRecti22 = sensorName === "Recti22";
                const isGen1 = sensorName === "Gen1";


                const isClose = sensor && sensor.Value === "Close";
                const isNormal = sensor && sensor.Value === "Normal";
                const isLost = sensor && sensor.Value === "Lost!"; //เป็น Lost! ให้พื้นหลังเป็น สีแดง

                const isRunning = sensor && sensor.Value === "Running";
                const isSTB = sensor && sensor.Value === "STB";





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

            ${isMotion1 && isNormal ? "lightyellow" : ""}
            ${isMotion1 && isLost ? "red flashing" : ""}
            ${isMotion1 && !isNormal && !isDash ? "lightyellow" : ""}

            ${isRectifier && isNormal ? "lightyellow" : ""}
            ${isRectifier && isLost ? "red flashing" : ""}
            ${isRectifier && !isNormal && !isDash ? "lightyellow" : ""}

            ${isHumidity && sensor.Value < 80 ? "lightgreen" : ""}
            ${isHumidity && sensor.Value > 80 ? "red flashing" : ""}

            ${isTemperature && sensor.Value < 40 ? "lightgreen" : ""}
            ${isTemperature && sensor.Value > 50 ? "red flashing" : ""}

            ${isRecti11 && isNormal ? "lightyellow" : ""}
            ${isRecti11 && isLost ? "red flashing" : ""}
            ${isRecti11 && !isNormal && !isDash ? "lightyellow" : ""}

            ${isRecti12 && isNormal ? "lightyellow" : ""}
            ${isRecti12 && isLost ? "red flashing" : ""}
            ${isRecti12 && !isNormal && !isDash ? "lightyellow" : ""}

            ${isRecti21 && isNormal ? "lightyellow" : ""}
            ${isRecti21 && isLost ? "red flashing" : ""}
            ${isRecti21 && !isNormal && !isDash ? "lightyellow" : ""}

            ${isRecti22 && isNormal ? "lightyellow" : ""}
            ${isRecti22 && isLost ? "red flashing" : ""}
            ${isRecti22 && !isNormal && !isDash ? "lightyellow" : ""}

            ${isGen1 && isSTB ? "lightgreen" : ""}
            ${isGen1 && isRunning ? "red flashing" : ""}
            ${isGen1 && !isSTB && !isDash ? "lightgray" : ""}

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
                  <td key={locationIndex}>{sensor ? sensor.Value : "-"} </td>
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
