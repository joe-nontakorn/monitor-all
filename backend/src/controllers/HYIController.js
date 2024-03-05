const axios = require("axios");
const { parseString } = require("xml2js");

async function HYI(req, res) {
  try {
    const urls = [
      { url: "http://172.17.26.20/general.xml", location: "HYI3_FL1" },
      { url: "http://172.17.26.21/general.xml", location: "HYI3_FL2" },
      { url: "http://172.17.26.55/general.xml", location: "HYI4" },
    ];

    const data = urls.map(async (urlObj) => {
      const { url, location } = urlObj;
      try {
        const response = await axios.get(url);
        const result = await parseXml(response.data);

        const binaryInSetEntries = extractEntries(result, "BinaryInSet", [
          "smoke_Inven",
          "smoke_EQ1",
          "smoke_Power",

          "smoke",
          "Gen",
          "AC",

          "smoke_power",
          "smoke_eqp",
          "smoke_patching",
          "Ac_sensor",
        ]);
        const senSetEntries = extractEntries(result, "SenSet", [
          "Humidity_EQ1",
          "Temp_EQ1",
          "Humidity_Power",
          "Temp_Power",

          "Temperature",
          "Humidity",

          "Motion1",
          "Motion2",
          "Gen1",
          "Humidity_Power",
          "Temp_EQP",
          "Humidity_EQP",
          "Temp_Power",
        ]);

        return {
          ip: url,
          location: location,
          BinaryInSet: binaryInSetEntries,
          SenSet: senSetEntries,
        };
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
      }
    });

    const responseData = await Promise.all(data);
    const filteredResponseData = responseData.filter((item) => item !== null);

    res.status(200).json({
      success: true,
      message: "OK",
      results: filteredResponseData.length,
      data: filteredResponseData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Monitor error" });
  }
}

async function parseXml(xmlData) {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// แปลง Smoke smoke1 ให้เป็นชื่อเดียวกัน
function extractEntries(data, type, filters) {
  const filteredEntries = data["set:Root"][type][0]["Entry"].filter((entry) =>
    filters.includes(entry["Name"][0])
  );

  let smoke_PowerSum = 0;
  let smoke_EQSum = 0;

  let AC_Sum = 0;
  let HumidEQ_Sum = 0;
  let TempEQ_Sum = 0;

  let Gen_Sum = 0;

  const otherEntries = filteredEntries
    .map((entry) => {
      if (
        entry["Name"][0] === "smoke_Inven" ||
        entry["Name"][0] === "smoke_patching"
      ) {
        const value = entry["Value"][0] === "1" ? "Normal" : "Lost!";
        return { Name: entry["Name"][0], Value: value };
      }
      
      else if (entry["Name"][0] === "Gen" || entry["Name"][0] === "Gen1") {
        const value = entry["Value"][0] === "1" ? "Running" : "STB";
        return { Name: entry["Name"][0], Value: value };
      } 

      else if (
        entry["Name"][0] === "smoke_Power" ||
        entry["Name"][0] === "smoke_power" ||
        entry["Name"][0] === "smoke"
      ) {
        const value = parseInt(entry["Value"][0]) > 0 ? "Normal" : "Lost!";
        return { Name: "Smoke_Power", Value: value };
      } 

      else if (
        entry["Name"][0] === "smoke_EQ1" ||
        entry["Name"][0] === "smoke_eqp"
      ) {
        const value = parseInt(entry["Value"][0]) > 0 ? "Normal" : "Lost!";
        return { Name: "Smoke_EQ1", Value: value };
      } 
      
      else if (
        entry["Name"][0] === "AC" ||
        entry["Name"][0] === "Ac_sensor"
      ) {
        const value = parseInt(entry["Value"][0]) > 0 ? "Normal" : "Lost!";
        return { Name: "AC", Value: value };
      } 
      
      
      else if (
        entry["Name"][0] === "Humidity_EQ1" ||
        entry["Name"][0] === "Humidity_EQP"
      ) {
        HumidEQ_Sum += parseInt(entry["Value"][0]);
      } else if (
        entry["Name"][0] === "Temp_EQ1" ||
        entry["Name"][0] === "Temp_EQP"
      ) {
        TempEQ_Sum += parseInt(entry["Value"][0]);
      } else {
        return { Name: entry["Name"][0], Value: entry["Value"][0] };
      }
      return null;
    })
    .filter((entry) => entry !== null);

  // if (smoke_PowerSum > 0) {
  //   otherEntries.push({ Name: "Smoke_Power", Value: smoke_EQSum.toString() });
  // }

  // if (smoke_EQSum > 0) {
  //   otherEntries.push({ Name: "Smoke_EQ1", Value: smoke_EQSum.toString() });
  // }

  // if (AC_Sum > 0) {
  //   otherEntries.push({ Name: "AC", Value: AC_Sum.toString() });
  // }

  if (HumidEQ_Sum > 0) {
    otherEntries.push({ Name: "Humidity_EQ", Value: HumidEQ_Sum.toString() });
  }

  if (TempEQ_Sum > 0) {
    otherEntries.push({ Name: "Temp_EQ", Value: TempEQ_Sum.toString() });
  }

  return otherEntries;
}

module.exports = { HYI };
