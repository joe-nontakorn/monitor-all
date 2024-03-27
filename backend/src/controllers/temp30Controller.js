const axios = require("axios");
const { parseString } = require("xml2js");

async function temp30(req, res) {
  try {
    const urls = [

      { url: "http://172.15.133.16/general.xml", location: "6F" },
      { url: "http://172.15.134.16/general.xml", location: "7F" },
     
      { url: "http://172.15.124.16/general.xml", location: "MDH" },
      { url: "http://172.15.125.16/general.xml", location: "NKI" },
      { url: "http://172.15.127.16/general.xml", location: "PNG" },

      { url: "http://172.15.135.16/general.xml", location: "MST" },
      { url: "http://172.15.136.16/general.xml", location: "MSI" },
      { url: "http://172.15.137.16/general.xml", location: "CKG" },
      { url: "http://172.15.159.16/general.xml", location: "AYT" },



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
          "smoke1",
          "Smoke",
          "smoke2",
          "Rectifier",
          "Gen1",
          "Gen"
        ]);
        const senSetEntries = extractEntries(result, "SenSet", [
          "Rectifier1",
          "Rectifier2",
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
          entry["Name"][0] === "AC" ||
          entry["Name"][0] === "Rectifier" 

        ) {
          const value = entry["Value"][0] === "1" ? "Normal" : "Lost!";
          return { Name: entry["Name"][0], Value: value };
        }
        
        else if (
            entry["Name"][0] === "Gen" ||
            entry["Name"][0] === "Gen1" 
            
          ) {
            const value = parseInt(entry["Value"][0]) > 0 ? "Lost!" : "STB";
            return { Name: "Gen1", Value: value };
          } 

        else if (entry["Name"][0] === "Door") {
            const value = entry["Value"][0] === "1" ? "Close" : "Open";
            return { Name: entry["Name"][0], Value: value };
          } 
  
        else if (
          entry["Name"][0] === "smoke1" ||
          entry["Name"][0] === "Smoke" ||
          entry["Name"][0] === "smoke1"
        ) {
          const value = parseInt(entry["Value"][0]) > 0 ? "Normal" : "Lost!";
          return { Name: "Smoke1", Value: value };
        } 

        else if (
            entry["Name"][0] === "smoke2" 
          ) {
            const value = parseInt(entry["Value"][0]) > 0 ? "Normal" : "Lost!";
            return { Name: "Smoke2", Value: value };
          } 

          else if (
            entry["Name"][0] === "Rectifier1" 
            
          ) {
            const value = parseInt(entry["Value"][0]) > 0 ? "Runing!" : "Normal";
            return { Name: "Rectifier1", Value: value };
          } 

          else if (
            entry["Name"][0] === "Rectifier2" 
            
          ) {
            const value = parseInt(entry["Value"][0]) > 0 ? "Runing!" : "Normal";
            return { Name: "Rectifier2", Value: value };
          } 


  
         else {
          return { Name: entry["Name"][0], Value: entry["Value"][0] };
        }
        return null;
      })
      .filter((entry) => entry !== null);
  
    
  
    if (HumidEQ_Sum > 0) {
      otherEntries.push({ Name: "Humidity_EQ", Value: HumidEQ_Sum.toString() });
    }
  
    if (TempEQ_Sum > 0) {
      otherEntries.push({ Name: "Temp_EQ", Value: TempEQ_Sum.toString() });
    }
  
    return otherEntries;
  }

module.exports = { temp30 };





