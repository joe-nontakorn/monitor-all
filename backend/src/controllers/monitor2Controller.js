const axios = require("axios");
const { parseString } = require("xml2js");

async function monitor2(req, res) {
  try {
    const urls = [
     
      { url: "http://172.15.124.16/general.xml", location: "MDH" },
      { url: "http://172.15.125.16/general.xml", location: "NKI" },
      { url: "http://172.15.127.16/general.xml", location: "PNG" },

      { url: "http://172.15.138.16/general.xml", location: "BKE" },
      { url: "http://172.15.139.16/general.xml", location: "BYI" },
      { url: "http://172.15.140.16/general.xml", location: "STPD" },
      { url: "http://172.15.141.16/general.xml", location: "PKN" },
      { url: "http://172.15.142.16/general.xml", location: "KTB" },
      { url: "http://172.15.143.16/general.xml", location: "BKD" },
      { url: "http://172.15.144.16/general.xml", location: "ESIE" },
      { url: "http://172.15.146.16/general.xml", location: "SMD" },

      { url: "http://172.15.150.16/general.xml", location: "TFD1" },
      { url: "http://172.15.151.16/general.xml", location: "TFD2" },
      { url: "http://172.15.152.16/general.xml", location: "PCSP" },
      { url: "http://172.15.153.16/general.xml", location: "SSW" },
      { url: "http://172.15.156.16/general.xml", location: "BBO" },
      { url: "http://172.15.157.16/general.xml", location: "BKI" },


      { url: "http://172.15.159.16/general.xml", location: "AYT" },
      { url: "http://172.15.162.16/general.xml", location: "WNI" },
      { url: "http://172.15.163.16/general.xml", location: "KKS" },
      { url: "http://172.15.164.16/general.xml", location: "PTY1" },
      { url: "http://172.15.165.16/general.xml", location: "PTY2" },
      { url: "http://172.15.166.16/general.xml", location: "RST" },
      { url: "http://172.15.167.16/general.xml", location: "RBNA" },

      // Add other URLs here
    ];

    const data = urls.map(async (urlObj) => {
      const { url, location } = urlObj;
      try {
        const response = await axios.get(url);
        const result = await parseXml(response.data);

        const binaryInSetEntries = extractEntries(result, "BinaryInSet", [
          "Door",
          "AC",
          "Smoke",
          "smoke",
          "smoke1",
          "smoke2",
          "Rectifier",
          "Motion1",
          "Gen1",
          "Gen"
        ]);
        const senSetEntries = extractEntries(result, "SenSet", [
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

// function extractEntries(data, type, filters) {
//     return data['set:Root'][type][0]['Entry']
//         .filter(entry => filters.includes(entry['Name'][0]))
//         .map(entry => ({
//             Name: entry['Name'][0],
//             Value: entry['Value'][0] }));
// }

// แปลง Smoke smoke1 ให้เป็นชื่อเดียวกัน
function extractEntries(data, type, filters) {
  const filteredEntries = data["set:Root"][type][0]["Entry"].filter((entry) =>
    filters.includes(entry["Name"][0])
  );

  let smokeSum = 0;

  const otherEntries = filteredEntries
    .map((entry) => {
      if (entry["Name"][0] === "Door") {
        if (entry["Value"][0] === "1") {
          entry["Value"][0] = "Close";
        } else if (entry["Value"][0] === "0") {
          entry["Value"][0] = "Open";
        }
      } else if (
        entry["Name"][0] === "Smoke" ||
        entry["Name"][0] === "smoke" ||
        entry["Name"][0] === "smoke1"
      ) {
        smokeSum += parseInt(entry["Value"][0]);
        return null; // Skip adding Smoke and smoke1 entries for now
      }
      return { Name: entry["Name"][0], Value: entry["Value"][0] };
    })
    .filter((entry) => entry !== null); // Remove skipped Smoke and smoke1 entries

  if (smokeSum > 0) {
    otherEntries.push({ Name: "Smoke1", Value: smokeSum.toString() });
  }

  return otherEntries;
}

module.exports = { monitor2 };
