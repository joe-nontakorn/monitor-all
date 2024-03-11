/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/monitor2.css";
function App() {
  const [sensorData, setSensorData] = useState([]);
  const [HYIData, setHYIData] = useState([]); // เพิ่ม state สำหรับข้อมูลจาก HYI
  const [temp30Data, settemp30Data] = useState([]);

  const [allSensorNames, setAllSensorNames] = useState([]);

  useEffect(() => {
    axios
      .get("http://172.16.12.13/api/v1/monitor2")
      .then((response) => {
        setSensorData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching monitor2 data:", error);
      });

    axios
      .get("http://172.16.12.13/api/v1/HYI")
      .then((response) => {
        setHYIData(response.data.data); // บันทึกข้อมูลจาก HYI
      })
      .catch((error) => {
        console.error("Error fetching HYI data:", error);
      });

    axios
      .get("http://172.16.12.13/api/v1/temp30")
      .then((response) => {
        settemp30Data(response.data.data); // บันทึกข้อมูลจาก temp30
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

  useEffect(() => {
    const refreshPage = () => {
      window.location.reload();
    };

    const timeoutId = setTimeout(refreshPage, 120000); // รีเฟรชหน้าทุก ๆ 30 วินาที

    return () => clearTimeout(timeoutId);
  }, []);

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
  ];

  const sensorOrder2 = [
    "AC",
    "smoke_Inven",
    "Smoke_Power",
    "Smoke_EQ1",
    "smoke_patching",
    "Humidity_Power",
    "Temp_Power",
    "Humidity_EQ",
    "Temp_EQ",
    "Humidity",
    "Temperature",
    "Gen1",
  ];

  const sensorOrder3 = [
    "Door",
    "AC",
    "Smoke1",
    "Smoke2",
    "Humidity",
    "Temperature",
    "Gen1",
  ];

  return (
    <div className="monitor2">
      <table className="sensor-table2">
        <thead className="thead-table2">
          <tr>
            <th>Sensor</th>
            {sensorData.map((locationData, index) => (
              <th key={index}>
                <a
                  href={locationData.ip}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locationData.location}
                </a>
              </th>
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
                const isRecti12 = sensorName === "Recti12";
                const isRecti21 = sensorName === "Recti21";
                const isRecti22 = sensorName === "Recti22";

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

          

            ${isRectifier && isNormal ? "lightgray" : ""}
            ${isRectifier && isLost ? "red flashing" : ""}
            ${isRectifier && !isNormal && !isDash ? "lightgray" : ""}

            ${
              isHumidity && sensor.Value >= 10 && sensor.Value <= 80.0
                ? "lightgreen"
                : ""
            }
            ${
              isHumidity && sensor.Value >= 80.1 && sensor.Value <= 90
                ? "red flashing"
                : ""
            }

            ${
              isTemperature && sensor.Value >= 27 && sensor.Value <= 39
                ? "lightgreen"
                : ""
            }
            ${
              isTemperature && sensor.Value >= 10 && sensor.Value <= 26.9
                ? "lightblue"
                : ""
            }
            ${
              isTemperature && sensor.Value >= 39.1 && sensor.Value <= 99
                ? "red flashing"
                : ""
            }
            

            ${isRecti11 && isNormal ? "lightgray" : ""}
            ${isRecti11 && isLost ? "red flashing" : ""}
            ${isRecti11 && !isNormal && !isDash ? "lightgray" : ""}

            ${isRecti12 && isNormal ? "lightgray" : ""}
            ${isRecti12 && isLost ? "red flashing" : ""}
            ${isRecti12 && !isNormal && !isDash ? "lightgray" : ""}

            ${isRecti21 && isNormal ? "lightgray" : ""}
            ${isRecti21 && isLost ? "red flashing" : ""}
            ${isRecti21 && !isNormal && !isDash ? "lightgray" : ""}

            ${isRecti22 && isNormal ? "lightgray" : ""}
            ${isRecti22 && isLost ? "red flashing" : ""}
            ${isRecti22 && !isNormal && !isDash ? "lightgray" : ""}

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

      {/* table temp30 -------------------------------------------------------------- */}

      <table className="sensor-table3">
        <thead className="thead-table3">
          <tr>
            <th>Sensor</th>
            {temp30Data.map((locationData, index) => (
              <th key={index}>
                <a
                  href={locationData.ip}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locationData.location}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tbody-table3">
          {sensorOrder3.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname3">{sensorName}</td>
              {temp30Data.map((locationData, locationIndex) => {
                const sensor =
                  locationData.BinaryInSet.find((s) => s.Name === sensorName) ||
                  locationData.SenSet.find((s) => s.Name === sensorName);

                const isDoor = sensorName === "Door";
                const isAC = sensorName === "AC";

                const isSmoke1 = sensorName === "Smoke1";
                const isSmoke2 = sensorName === "Smoke2";

                const isHumidity = sensorName === "Humidity";
                const isTemperature = sensorName === "Temperature";

                const isGen1 = sensorName === "Gen1";

                const isClose = sensor && sensor.Value === "Close";

                const isSTB = sensor && sensor.Value === "STB";

                const isNormal = sensor && sensor.Value === "Normal";
                const isLost = sensor && sensor.Value === "Lost!";

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

                    ${
                      isHumidity && sensor.Value >= 10 && sensor.Value <= 80.0
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isHumidity && sensor.Value >= 80.1 && sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }

                    ${
                      isTemperature && sensor.Value >= 24 && sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isTemperature &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      isTemperature &&
                      sensor.Value >= 30.1 &&
                      sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }

                    ${isGen1 && isSTB ? "lightgreen" : ""}
                    ${isGen1 && isLost ? "red flashing" : ""}
                    ${isGen1 && (!sensor || !sensor.Value) ? "lightgray" : ""}

                  
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

      {/* table HYI -------------------------------------------------------------- */}

      <table className="sensor-table4">
        <thead className="thead-table4">
          <tr>
            <th>Sensor</th>
            {HYIData.map((locationData, index) => (
              <th key={index}>
                <a
                  href={locationData.ip}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {locationData.location}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tbody-table4">
          {sensorOrder2.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname4">{sensorName}</td>
              {HYIData.map((locationData, locationIndex) => {
                const sensor =
                  locationData.BinaryInSet.find((s) => s.Name === sensorName) ||
                  locationData.SenSet.find((s) => s.Name === sensorName);

                const issmoke_Inven = sensorName === "smoke_Inven";
                const isSmoke_Power = sensorName === "Smoke_Power";
                const isSmoke_EQ1 = sensorName === "Smoke_EQ1";

                const isHumidity_Power = sensorName === "Humidity_Power";
                const isTemp_Power = sensorName === "Temp_Power";

                const isHumidity_EQ = sensorName === "Humidity_EQ";
                const isTemp_EQ = sensorName === "Temp_EQ";

                const isHumidity = sensorName === "Humidity";
                const isTemperature = sensorName === "Temperature";

                const isGen = sensorName === "Gen";
                const isGen1 = sensorName === "Gen1";

                const isAC = sensorName === "AC";

                const smoke_patching = sensorName === "smoke_patching";

                const isNormal = sensor && sensor.Value === "Normal";
                const isLost = sensor && sensor.Value === "Lost!"; //เป็น Lost! ให้พื้นหลังเป็น สีแดง

                const isRunning = sensor && sensor.Value === "Running";
                const isSTB = sensor && sensor.Value === "STB";
                const isDash = sensor && sensor.Value === "-";

                return (
                  <td
                    key={locationIndex}
                    className={`
                    ${issmoke_Inven && isNormal ? "lightgray" : ""}
                    ${issmoke_Inven && isLost ? "red flashing" : ""}
                    ${issmoke_Inven && !isNormal && !isDash ? "lightgray" : ""}

                    ${isSmoke_Power && isNormal ? "lightgray" : ""}
                    ${isSmoke_Power && isLost ? "red flashing" : ""}
                    ${isSmoke_Power && !isNormal && !isDash ? "lightgray" : ""}

                    ${isSmoke_EQ1 && isNormal ? "lightgray" : ""}
                    ${isSmoke_EQ1 && isLost ? "red flashing" : ""}
                    ${isSmoke_EQ1 && !isNormal && !isDash ? "lightgray" : ""}

                    ${
                      isHumidity_Power &&
                      sensor &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 80.0
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isHumidity_Power &&
                      sensor &&
                      sensor.Value >= 80.1 &&
                      sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }
                    ${
                      isHumidity_Power && (!sensor || !sensor.Value)
                        ? "lightgray"
                        : ""
                    }

                    ${
                      isTemp_Power &&
                      sensor &&
                      sensor.Value >= 24 &&
                      sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isTemp_Power &&
                      sensor &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      isTemp_Power &&
                      sensor &&
                      sensor.Value >= 30.1 &&
                      sensor.Value <= 99
                        ? "red flashing"
                        : ""
                    }
                    ${
                      isTemp_Power && (!sensor || !sensor.Value)
                        ? "lightgray"
                        : ""
                    }

                    ${
                      isHumidity_EQ &&
                      sensor &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 80.0
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isHumidity_EQ &&
                      sensor &&
                      sensor.Value >= 80.1 &&
                      sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }
                    ${
                      isHumidity_EQ && (!sensor || !sensor.Value)
                        ? "lightgray"
                        : ""
                    }

                    ${
                      isTemp_EQ &&
                      sensor &&
                      sensor.Value >= 24 &&
                      sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isTemp_EQ &&
                      sensor &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      isTemp_EQ &&
                      sensor &&
                      sensor.Value >= 30.1 &&
                      sensor.Value <= 99
                        ? "red flashing"
                        : ""
                    }
                    ${
                      isTemp_EQ && (!sensor || !sensor.Value) ? "lightgray" : ""
                    }

                    ${
                      isHumidity &&
                      sensor &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 80.0
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isHumidity &&
                      sensor &&
                      sensor.Value >= 80.1 &&
                      sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }
                    ${
                      isHumidity && (!sensor || !sensor.Value)
                        ? "lightgray"
                        : ""
                    }

                    ${
                      isTemperature &&
                      sensor &&
                      sensor.Value >= 24 &&
                      sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      isTemperature &&
                      sensor &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      isTemperature &&
                      sensor &&
                      sensor.Value >= 30.1 &&
                      sensor.Value <= 99
                        ? "red flashing"
                        : ""
                    }
                    ${
                      isTemperature && (!sensor || !sensor.Value)
                        ? "lightgray"
                        : ""
                    }

                    ${isGen && isSTB ? "lightgreen" : ""}
                    ${isGen && isRunning ? "red flashing" : ""}
                    ${isGen && !isSTB && !isDash ? "lightgray" : ""}

                    ${isGen1 && isSTB ? "lightgreen" : ""}
                    ${isGen1 && isRunning ? "red flashing" : ""}
                    ${isGen1 && !isSTB && !isDash ? "lightgray" : ""}

                    ${isAC && isNormal ? "lightpink" : ""}
                    ${isAC && isLost ? "red flashing" : ""}
                    ${isAC && (!sensor || !sensor.Value) ? "lightpink" : ""}

                    ${smoke_patching && isNormal ? "lightgray" : ""}
                    ${smoke_patching && isLost ? "red flashing" : ""}
                    ${smoke_patching && !isNormal && !isDash ? "lightgray" : ""}
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
