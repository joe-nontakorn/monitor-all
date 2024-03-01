// BLDG2.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/App.css";

function BLDG2() {
  const [sensorDataBLDG2, setSensorDataBLDG2] = useState([]);
  const [allSensorNamesBLDG2, setAllSensorNamesBLDG2] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/v1/BLDG1")
      .then((response) => {
        setSensorDataBLDG2(response.data.data.filter((location) => location.location === "BLDG2"));

      })
      .catch((error) => {
        console.error("Error fetching BLDG1 data:", error);
      });

  }, []);

  useEffect(() => {
    const namesBLDG2 = [];
    sensorDataBLDG2.forEach((locationData) => {
      locationData.BinaryInSet.forEach((binaryInput) => {
        if (!namesBLDG2.includes(binaryInput.Name)) {
          namesBLDG2.push(binaryInput.Name);
        }
      });

      locationData.SenSet.forEach((sensor) => {
        if (!namesBLDG2.includes(sensor.Name)) {
          namesBLDG2.push(sensor.Name);
        }
      });
    });
    setAllSensorNamesBLDG2(namesBLDG2);
  }, [sensorDataBLDG2]);

  return (
    <div className="building-data-container">
      <div className="data2">
        <h2>Building 2</h2>
        <table className="table2">
          <tbody className="tbody2">
            {sensorDataBLDG2.map((locationData, index) => (
              <React.Fragment key={index}>
                <tr className="tbody-tr2">
                  <td className="tbody-td"  colSpan={2}>{locationData.location}</td>
                </tr>
                {allSensorNamesBLDG2.map((name, idx) => {
                  const binaryInput = locationData.BinaryInSet.find(
                    (sensor) => sensor.Name === name
                  );

                  const SenSet = locationData.SenSet.find(
                      (sensor) => sensor.Name === name
                    );
                
                  return (
                    <tr className="22" key={idx}>
                      <td className="BLDG-name">{binaryInput ? binaryInput.Name : SenSet ? SenSet.Name : "-"}</td>
                      <td className="BLDG-Value">{binaryInput ? binaryInput.Value : SenSet ? SenSet.Value : "-"}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BLDG2;
