/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/monitor3.css";

function App() {
  const [BLDG1Data, setSensorDataBLDG1] = useState([]);
  const [BLDG2Data, setSensorDataBLDG2] = useState([]);

  const [sensorData, setSensorData] = useState([]);
  const [allSensorNames1, setAllSensorNames1] = useState([]);
  const [allSensorNames2, setAllSensorNames2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4100/api/v1/BLDG1")
      .then((response) => {
        setSensorDataBLDG1(
          response.data.data.filter((location) => location.location === "BLDG1")
        );
        setSensorDataBLDG2(
          response.data.data.filter((location) => location.location === "BLDG2")
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const names = [];
    BLDG1Data.forEach((locationData) => {
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
    setAllSensorNames1(names);
  }, [BLDG1Data]);

  useEffect(() => {
    const names = [];
    BLDG2Data.forEach((locationData) => {
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
    setAllSensorNames2(names);
  }, [BLDG2Data]);

  useEffect(() => {
    const refreshPage = () => {
      window.location.reload();
    };

    const timeoutId = setTimeout(refreshPage, 120000); // รีเฟรชหน้าทุก ๆ 30 วินาที

    return () => clearTimeout(timeoutId);
  }, []);

  const sensorBLDG1 = [
    "SmokeGen400",
    "SmokeGen100",
    "SmokeMDB",
    "Generator400",
    "AC",
    "AC1",
    "AC2",
    "AC3",
    "AC4",
    "AC5",
    "AC6",
  ];

  return (
    <div className="monitor3">
      <table className="sensor-table5">
        <thead className="thead-table5">
          <tr>
            <th>Sensor</th>
            {BLDG1Data.map((locationData, index) => (
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
        <tbody className="tbody-table5">
          {sensorBLDG1.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname5">{sensorName}</td>
              {BLDG1Data.map((locationData, locationIndex) => {
                const sensor =
                  locationData.BinaryInSet.find((s) => s.Name === sensorName) ||
                  locationData.SenSet.find((s) => s.Name === sensorName);

                const isSmokeGen400 = sensorName === "SmokeGen400";
                const SmokeGen100 = sensorName === "SmokeGen100";
                const SmokeMDB = sensorName === "SmokeMDB";
                const Generator400 = sensorName === "Generator400";
                const AC = sensorName === "AC";
                const AC1 = sensorName === "AC1";
                const AC2 = sensorName === "AC2";
                const AC3 = sensorName === "AC3";
                const AC4 = sensorName === "AC4";
                const AC5 = sensorName === "AC5";
                const AC6 = sensorName === "AC6";

                const isNormal = sensor && sensor.Value === "Normal";
                const isLost = sensor && sensor.Value === "Lost!";

                return (
                  <td
                    key={locationIndex}
                    className={`

                    ${isSmokeGen400 && isNormal ? "lightgray" : ""}
                    ${isSmokeGen400 && isLost ? "red flashing" : ""}

                    ${SmokeGen100 && isNormal ? "lightgray" : ""}
                    ${SmokeGen100 && isLost ? "red flashing" : ""}
                   
                    ${SmokeMDB && isNormal ? "lightgray" : ""}
                    ${SmokeMDB && isLost ? "red flashing" : ""}

                    ${Generator400 && isNormal ? "lightgray" : ""}
                    ${Generator400 && isLost ? "red flashing" : ""}

                    ${AC && isNormal ? "lightgray" : ""}
                    ${AC && isLost ? "red flashing" : ""}
                    
                    ${AC1 && isNormal ? "lightgray" : ""}
                    ${AC1 && isLost ? "red flashing" : ""}
                    
                    ${AC2 && isNormal ? "lightgray" : ""}
                    ${AC2 && isLost ? "red flashing" : ""}

                    ${AC3 && isNormal ? "lightgray" : ""}
                    ${AC3 && isLost ? "red flashing" : ""}

                    ${AC4 && isNormal ? "lightgray" : ""}
                    ${AC4 && isLost ? "red flashing" : ""}
                    
                    ${AC5 && isNormal ? "lightgray" : ""}
                    ${AC5 && isLost ? "red flashing" : ""}
                    
                    ${AC6 && isNormal ? "lightgray" : ""}
                    ${AC6 && isLost ? "red flashing" : ""}
           
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

      {/* table BLDG2 -------------------------------------------------------------- */}

      <table className="sensor-table6">
        <thead className="thead-table6">
          <tr>
            <th>Sensor</th>
            {BLDG2Data.map((locationData, index) => (
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
        <tbody className="tbody-table6">
          {allSensorNames2.map((sensorName, sensorIndex) => (
            <tr key={sensorIndex}>
              <td className="ssname6">{sensorName}</td>
              {BLDG2Data.map((locationData, locationIndex) => {
                const sensor =
                  locationData.BinaryInSet.find((s) => s.Name === sensorName) ||
                  locationData.SenSet.find((s) => s.Name === sensorName);

                const SmokeMMR = sensorName === "SmokeMMR";
                const SmokeElectricalEQP1 =
                  sensorName === "SmokeElectricalEQP1";
                const SmokeEQP1 = sensorName === "SmokeEQP1";
                const Recti1AC = sensorName === "Recti1AC";
                const Recti1Fail = sensorName === "Recti1Fail";
                const Recti1DisCharge = sensorName === "Recti1DisCharge";
                const Recti1HighTemp = sensorName === "Recti1HighTemp";
                const Recti2AC = sensorName === "Recti2AC";
                const Recti2Fail = sensorName === "Recti2Fail";
                const Recti2DisCharge = sensorName === "Recti2DisCharge";
                const Recti2HighTemp = sensorName === "Recti2HighTemp";
                const HumEQP1 = sensorName === "HumEQP1";
                const HumElectricalEQP1 = sensorName === "HumElectricalEQP1";
                const TempEQP1 = sensorName === "TempEQP1";
                const TempElectricalEQP1 = sensorName === "TempElectricalEQP1";
                const TempMMR = sensorName === "TempMMR";

                const isNormal = sensor && sensor.Value === "Normal";
                const isLost = sensor && sensor.Value === "Lost!";

                return (
                  <td
                    key={locationIndex}
                    className={`

                    ${SmokeMMR && isNormal ? "lightgray" : ""}
                    ${SmokeMMR && isLost ? "red flashing" : ""}

                    ${SmokeElectricalEQP1 && isNormal ? "lightgray" : ""}
                    ${SmokeElectricalEQP1 && isLost ? "red flashing" : ""}

                    ${SmokeEQP1 && isNormal ? "lightgray" : ""}
                    ${SmokeEQP1 && isLost ? "red flashing" : ""}

                    ${Recti1AC && isNormal ? "lightgray" : ""}
                    ${Recti1AC && isLost ? "red flashing" : ""}

                    ${Recti1Fail && isNormal ? "lightgray" : ""}
                    ${Recti1Fail && isLost ? "red flashing" : ""}

                    ${Recti1DisCharge && isNormal ? "lightgray" : ""}
                    ${Recti1DisCharge && isLost ? "red flashing" : ""}

                    ${Recti1HighTemp && isNormal ? "lightgray" : ""}
                    ${Recti1HighTemp && isLost ? "red flashing" : ""}

                    ${Recti2AC && isNormal ? "lightgray" : ""}
                    ${Recti2AC && isLost ? "red flashing" : ""}

                    ${Recti2Fail && isNormal ? "lightgray" : ""}
                    ${Recti2Fail && isLost ? "red flashing" : ""}

                    ${Recti2DisCharge && isNormal ? "lightgray" : ""}
                    ${Recti2DisCharge && isLost ? "red flashing" : ""}

                    ${Recti2HighTemp && isNormal ? "lightgray" : ""}
                    ${Recti2HighTemp && isLost ? "red flashing" : ""}

                    ${
                      HumEQP1 && sensor.Value >= 10 && sensor.Value <= 80.0
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      HumEQP1 && sensor.Value >= 80.1 && sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }

                    ${
                      HumElectricalEQP1 &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 80.0
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      HumElectricalEQP1 &&
                      sensor.Value >= 80.1 &&
                      sensor.Value <= 90
                        ? "red flashing"
                        : ""
                    }

                    ${
                      TempEQP1 && sensor.Value >= 24 && sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      TempEQP1 && sensor.Value >= 10 && sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      TempEQP1 && sensor.Value >= 30.1 && sensor.Value <= 99
                        ? "red flashing"
                        : ""
                    }
                    

                    ${
                      TempElectricalEQP1 &&
                      sensor.Value >= 24 &&
                      sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      TempElectricalEQP1 &&
                      sensor.Value >= 10 &&
                      sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      TempElectricalEQP1 &&
                      sensor.Value >= 30.1 &&
                      sensor.Value <= 99
                        ? "red flashing"
                        : ""
                    }
                    

                    ${
                      TempMMR && sensor.Value >= 24 && sensor.Value <= 30
                        ? "lightgreen"
                        : ""
                    }
                    ${
                      TempMMR && sensor.Value >= 10 && sensor.Value <= 23.9
                        ? "lightblue"
                        : ""
                    }
                    ${
                      TempMMR && sensor.Value >= 30.1 && sensor.Value <= 99
                        ? "red flashing"
                        : ""
                    }
                    
        
           
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
