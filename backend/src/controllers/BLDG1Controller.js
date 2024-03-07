const axios = require("axios");
const { parseString } = require("xml2js");

async function BLDG1(req, res) {
  try {
    const urls = [
      { url: "http://172.15.149.16/general.xml", location: "BLDG1" },
      { url: "http://172.15.149.17/general.xml", location: "BLDG2" },
     
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
      .map((entry) => {
        const name = entry["Name"][0];
        const value = entry["Value"][0];
        // ตรวจสอบคีย์ที่ต้องการแปลง
        if (name === "SmokeGen400") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }
        else if (name === "SmokeGen100") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }
        else if (name === "SmokeMDB") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }else if (name === "Generator400") {
          return {
            Name: name,
            Value: value === "0" ? "Normal" : "Lost!"
          };
        }else if (name === "AC") {
          return {
            Name: name,
            Value: value === "0" ? "Normal" : "Lost!"
          };
        }else if (name === "AC1") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }else if (name === "AC2") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }else if (name === "AC3") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }else if (name === "AC4") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }else if (name === "AC5") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }else if (name === "AC6") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }

//BLDG2
        else if (name === "SmokeMMR") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "SmokeElectricalEQP1") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "SmokeEQP1") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti1AC") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti1Fail") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti1DisCharge") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti1HighTemp") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti2AC") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti2Fail") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti2DisCharge") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        } else if (name === "Recti2HighTemp") {
          return {
            Name: name,
            Value: value === "1" ? "Normal" : "Lost!"
          };
        }







        return {
          Name: name,
          Value: value
        };
      });
  } else {
    // Handle case where data structure is not as expected
    console.error("Data structure is not as expected.");
    return [];
  }
}


module.exports = { BLDG1 };
