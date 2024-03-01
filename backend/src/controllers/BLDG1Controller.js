const axios = require("axios");
const { parseString } = require("xml2js");

async function BLDG1(req, res) {
  try {
    const urls = [
      { url: "http://172.15.149.16/general.xml", location: "BLDG1" },
      { url: "http://172.15.149.17/general.xml", location: "BLDG2" },
      { url: "http://172.15.157.16/general.xml", location: "BKI" },

      { url: "http://172.17.26.20/general.xml", location: "HYI3_FL1" },
      { url: "http://172.17.26.21/general.xml", location: "HYI3_FL2" },
      { url: "http://172.17.26.55/general.xml", location: "HYI4" },

      // Add other URLs here
    ];

    const data = urls.map(async (urlObj) => {
      const { url, location } = urlObj;
      try {
        const response = await axios.get(url);
        const result = await parseXml(response.data);

        const binaryInSetEntries = extractEntries(result, "BinaryInSet", [
          "AC",
          "AC1",
          "AC2",
          "AC3",
          "AC4",
          "AC5",
          "AC6",
          "SmokeGen400",
          "SmokeGen100",
          "SmokeMDB",
          "Generator400",
          // BLDG2
          "SmokeMMR",
          "SmokeElectricalEQP1",
          "SmokeEQP1",
          "Recti1AC",
          "Recti1Fail",
          "Recti1DisCharge",
          "Recti1HighTemp",
          "Recti2AC",
          "Recti2Fail",
          "Recti2DisCharge",
          "Recti2HighTemp",
          //BKI
          "Door",
          "AC",
          "Smoke",
          //HYI3_FL1
          "smoke_Inven",
          "smoke_EQ1",
          "smoke_Power",
          //HYI3_FL2
          "smoke",
          "Gen",
          "AC",
          //HYI4
          "smoke_power",
          "smoke_eqp",
          "smoke_patching",
          "Ac_sensor",
        ]);
        const senSetEntries = extractEntries(result, "SenSet", [
          "TempEQP1",
          "TempElectricalEQP1",
          "TempMMR",
          "HumEQP1",
          "HumElectricalEQP1",
          //BKI
          "Recti11",
          "Recti12",
          "Recti21",
          "Recti22",
          "Temperature",
          "Humidity",
          //HYI3_FL1
          "Humidity_EQ1",
          "Temp_EQ1",
          "Humidity_Power",
          "Temp_Power",
          //HYI3_FL2
          "Temperature",
          "Humidity",
          //HYI4
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

function extractEntries(data, type, filters) {
  if (
    data["set:Root"] &&
    data["set:Root"][type] &&
    data["set:Root"][type][0] &&
    data["set:Root"][type][0]["Entry"]
  ) {
    return data["set:Root"][type][0]["Entry"]
      .filter((entry) => filters.includes(entry["Name"][0]))
      .map((entry) => ({
        Name: entry["Name"][0],
        Value: entry["Value"][0],
      }));
  } else {
    // Handle case where data structure is not as expected
    console.error("Data structure is not as expected.");
    return [];
  }
}

module.exports = { BLDG1 };
