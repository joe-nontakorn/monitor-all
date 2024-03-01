// BuildingData.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/BLDG1.css";

function BLDG1Data() {
  const [sensorDataBLDG1, setSensorDataBLDG1] = useState([]);
  const [allSensorNamesBLDG1, setAllSensorNamesBLDG1] = useState([]);

  const [sensorDataBLDG2, setSensorDataBLDG2] = useState([]);
  const [allSensorNamesBLDG2, setAllSensorNamesBLDG2] = useState([]);

 

  const [sensorDataHYI3_FL1, setSensorDataHYI3_FL1] = useState([]);
  const [allSensorNamesHYI3_FL1, setAllSensorNamesHYI3_FL1] = useState([]);

  const [sensorDataHYI3_FL2, setSensorDataHYI3_FL2] = useState([]);
  const [allSensorNamesHYI3_FL2, setAllSensorNamesHYI3_FL2] = useState([]);

  const [sensorDataHYI4, setSensorDataHYI4] = useState([]);
  const [allSensorNamesHYI4, setAllSensorNamesHYI4] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/v1/BLDG1")
      .then((response) => {
        setSensorDataBLDG1(
          response.data.data.filter((location) => location.location === "BLDG1")
        );
        setSensorDataBLDG2(
          response.data.data.filter((location) => location.location === "BLDG2")
        );
       
        setSensorDataHYI3_FL1(
          response.data.data.filter(
            (location) => location.location === "HYI3_FL1"
          )
        );
        setSensorDataHYI3_FL2(
          response.data.data.filter(
            (location) => location.location === "HYI3_FL2"
          )
        );
        setSensorDataHYI4(
          response.data.data.filter((location) => location.location === "HYI4")
        );
      })
      .catch((error) => {
        console.error("Error fetching BLDG1 data:", error);
      });

    // axios
    //   .get("http://localhost:4001/api/v1/BLDG1")
    //   .then((response) => {
    //     setSensorDataBLDG2(response.data.data.filter((location) => location.location === "BLDG2"));
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching BLDG2 data:", error);
    //   });
  }, []);

  useEffect(() => {
    const namesBLDG1 = [];
    sensorDataBLDG1.forEach((locationData) => {
      locationData.BinaryInSet.forEach((binaryInput) => {
        if (!namesBLDG1.includes(binaryInput.Name)) {
          namesBLDG1.push(binaryInput.Name);
        }
      });

      locationData.SenSet.forEach((sensor) => {
        if (!namesBLDG1.includes(sensor.Name)) {
          namesBLDG1.push(sensor.Name);
        }
      });
    });
    setAllSensorNamesBLDG1(namesBLDG1);

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

   

    const namesHYI3_FL1 = [];
    sensorDataHYI3_FL1.forEach((locationData) => {
      locationData.BinaryInSet.forEach((binaryInput) => {
        if (!namesHYI3_FL1.includes(binaryInput.Name)) {
          namesHYI3_FL1.push(binaryInput.Name);
        }
      });

      locationData.SenSet.forEach((sensor) => {
        if (!namesHYI3_FL1.includes(sensor.Name)) {
          namesHYI3_FL1.push(sensor.Name);
        }
      });
    });
    setAllSensorNamesHYI3_FL1(namesHYI3_FL1);

    const namesHYI3_FL2 = [];
    sensorDataHYI3_FL2.forEach((locationData) => {
      locationData.BinaryInSet.forEach((binaryInput) => {
        if (!namesHYI3_FL2.includes(binaryInput.Name)) {
          namesHYI3_FL2.push(binaryInput.Name);
        }
      });

      locationData.SenSet.forEach((sensor) => {
        if (!namesHYI3_FL2.includes(sensor.Name)) {
          namesHYI3_FL2.push(sensor.Name);
        }
      });
    });
    setAllSensorNamesHYI3_FL2(namesHYI3_FL2);

    const namesHYI4 = [];
    sensorDataHYI4.forEach((locationData) => {
      locationData.BinaryInSet.forEach((binaryInput) => {
        if (!namesHYI4.includes(binaryInput.Name)) {
          namesHYI4.push(binaryInput.Name);
        }
      });

      locationData.SenSet.forEach((sensor) => {
        if (!namesHYI4.includes(sensor.Name)) {
          namesHYI4.push(sensor.Name);
        }
      });
    });
    setAllSensorNamesHYI4(namesHYI4);
  }, [
    sensorDataBLDG1,
    sensorDataBLDG2,
    sensorDataHYI3_FL1,
    sensorDataHYI3_FL2,
    sensorDataHYI4,
  ]);

  return (
    <div className="building-data-container">
      <div className="data1">
        <h2>Building 1</h2>
        <table className="table1">
          <tbody className="tbody1">
            {sensorDataBLDG1.map((locationData, index) => (
              <React.Fragment key={index}>
                <tr className="tbody-tr1">
                  <td className="tbody-td" colSpan={2}>
                    {locationData.location}
                  </td>
                </tr>
                {allSensorNamesBLDG1.map((name, idx) => {
                  const binaryInput = locationData.BinaryInSet.find(
                    (sensor) => sensor.Name === name
                  );

                  return (
                    <tr className="AA" key={idx}>
                      <td className="BLDG-name">
                        {binaryInput ? binaryInput.Name : "-"}
                      </td>
                      <td className="BLDG-Value">
                        {binaryInput ? binaryInput.Value : "-"}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data2">
        <h2>Building 2</h2>
        <table className="table2">
          <tbody className="tbody2">
            {sensorDataBLDG2.map((locationData, index) => (
              <React.Fragment key={index}>
                <tr className="tbody-tr2">
                  <td className="tbody-td" colSpan={2}>
                    {locationData.location}
                  </td>
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
                      <td className="BLDG-name">
                        {binaryInput
                          ? binaryInput.Name
                          : SenSet
                          ? SenSet.Name
                          : "-"}
                      </td>
                      <td className="BLDG-Value">
                        {binaryInput
                          ? binaryInput.Value
                          : SenSet
                          ? SenSet.Value
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

  

      <div className="data2">
        <h2>HYI3_FL1</h2>
        <table className="table2">
          <tbody className="tbody2">
            {sensorDataHYI3_FL1.map((locationData, index) => (
              <React.Fragment key={index}>
                <tr className="tbody-tr2">
                  <td className="tbody-td" colSpan={2}>
                    {locationData.location}
                  </td>
                </tr>
                {allSensorNamesHYI3_FL1.map((name, idx) => {
                  const binaryInput = locationData.BinaryInSet.find(
                    (sensor) => sensor.Name === name
                  );

                  const SenSet = locationData.SenSet.find(
                    (sensor) => sensor.Name === name
                  );

                  return (
                    <tr className="22" key={idx}>
                      <td className="BLDG-name">
                        {binaryInput
                          ? binaryInput.Name
                          : SenSet
                          ? SenSet.Name
                          : "-"}
                      </td>
                      <td className="BLDG-Value">
                        {binaryInput
                          ? binaryInput.Value
                          : SenSet
                          ? SenSet.Value
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data2">
        <h2>HYI3_FL2</h2>
        <table className="table2">
          <tbody className="tbody2">
            {sensorDataHYI3_FL2.map((locationData, index) => (
              <React.Fragment key={index}>
                <tr className="tbody-tr2">
                  <td className="tbody-td" colSpan={2}>
                    {locationData.location}
                  </td>
                </tr>
                {allSensorNamesHYI3_FL2.map((name, idx) => {
                  const binaryInput = locationData.BinaryInSet.find(
                    (sensor) => sensor.Name === name
                  );

                  const SenSet = locationData.SenSet.find(
                    (sensor) => sensor.Name === name
                  );

                  return (
                    <tr className="22" key={idx}>
                      <td className="BLDG-name">
                        {binaryInput
                          ? binaryInput.Name
                          : SenSet
                          ? SenSet.Name
                          : "-"}
                      </td>
                      <td className="BLDG-Value">
                        {binaryInput
                          ? binaryInput.Value
                          : SenSet
                          ? SenSet.Value
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data2">
        <h2>HYI4</h2>
        <table className="table2">
          <tbody className="tbody2">
            {sensorDataHYI4.map((locationData, index) => (
              <React.Fragment key={index}>
                <tr className="tbody-tr2">
                  <td className="tbody-td" colSpan={2}>
                    {locationData.location}
                  </td>
                </tr>
                {allSensorNamesHYI4.map((name, idx) => {
                  const binaryInput = locationData.BinaryInSet.find(
                    (sensor) => sensor.Name === name
                  );

                  const SenSet = locationData.SenSet.find(
                    (sensor) => sensor.Name === name
                  );

                  return (
                    <tr className="22" key={idx}>
                      <td className="BLDG-name">
                        {binaryInput
                          ? binaryInput.Name
                          : SenSet
                          ? SenSet.Name
                          : "-"}
                      </td>
                      <td className="BLDG-Value">
                        {binaryInput
                          ? binaryInput.Value
                          : SenSet
                          ? SenSet.Value
                          : "-"}
                      </td>
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

export default BLDG1Data;
