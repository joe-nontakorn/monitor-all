const axios = require('axios');
const { parseString } = require('xml2js');

async function monitor(req, res) {
    try {
        const urls = [
            { url: 'http://172.15.101.16/general.xml', location: 'Bangpoo' },      
            { url: 'http://172.15.102.16/general.xml', location: 'Wellgrow' },
            { url: 'http://172.15.103.16/general.xml', location: 'Maptaphut' },
            { url: 'http://172.15.104.16/general.xml', location: 'Nongkham' },
            { url: 'http://172.15.105.16/general.xml', location: 'Ladkrabang' },
            { url: 'http://172.15.106.16/general.xml', location: 'Navanakorn' },
            { url: 'http://172.15.107.16/general.xml', location: 'Hemaraj' },
            { url: 'http://172.15.108.16/general.xml', location: 'IFCT' },
            { url: 'http://172.15.109.16/general.xml', location: 'QHouse' },
            { url: 'http://172.15.110.16/general.xml', location: 'LakeRatchada' },
            { url: 'http://172.15.159.16/general.xml', location: 'Arunyaprathet' },
            { url: 'http://172.15.125.16/general.xml', location: 'Nong_Khai' },
            { url: 'http://172.15.124.16/general.xml', location: 'Mukdahan' },
            { url: 'http://172.15.111.16/general.xml', location: 'Harbormall' },
            { url: 'http://172.17.26.20/general.xml', location: 'HYI3_FL1' },
            { url: 'http://172.17.26.21/general.xml', location: 'HYI3_FL2' },
            { url: 'http://172.15.113.16/general.xml', location: 'Vibhavadi' },
            { url: 'http://172.15.114.16/general.xml', location: 'Ramkhamhaeng' },
            { url: 'http://172.15.115.16/general.xml', location: 'BaanMueangMai' },
            { url: 'http://172.15.116.16/general.xml', location: 'Tiwanon2' },
            { url: 'http://172.15.117.16/general.xml', location: 'Sathon' },
            { url: 'http://172.15.118.16/general.xml', location: 'Srinagarindra' },
            { url: 'http://172.15.119.16/general.xml', location: 'UdomSuk' },
            { url: 'http://172.15.120.16/general.xml', location: 'Lak_Si' },
            { url: 'http://172.15.121.16/general.xml', location: 'Si_Yan' },
            { url: 'http://172.15.122.16/general.xml', location: 'Surawong' },
            { url: 'http://172.15.123.16/general.xml', location: 'Rojana' },
            { url: 'http://172.17.26.55/general.xml', location: 'HYI4' },
            { url: 'http://172.15.127.16/general.xml', location: 'Pongnamron' },
            { url: 'http://172.15.130.16/general.xml', location: 'Samutsakorn' },
            { url: 'http://172.15.133.16/general.xml', location: 'Jastel6F' },
            { url: 'http://172.15.134.16/general.xml', location: 'Jastel7F' },
            { url: 'http://172.15.129.16/general.xml', location: 'Kingkeaw' },
            { url: 'http://172.15.128.16/general.xml', location: 'Bangplee' },
            { url: 'http://172.15.131.16/general.xml', location: 'NikhomPhatthana' },
            { url: 'http://172.15.132.16/general.xml', location: 'Sattahip' },
            { url: 'http://172.15.135.16/general.xml', location: 'Maesod' },
            { url: 'http://172.15.136.16/general.xml', location: 'Measai' },
            { url: 'http://172.15.137.16/general.xml', location: 'Chiang Khong' },
            { url: 'http://172.15.138.16/general.xml', location: 'Bang Khae' },
            { url: 'http://172.15.139.16/general.xml', location: 'Bang Yai' },
            { url: 'http://172.15.140.16/general.xml', location: 'Sathupradit' },
            { url: 'http://172.15.141.16/general.xml', location: 'Phra Khanong' },
            { url: 'http://172.15.157.16/general.xml', location: 'Bankhai' },
            { url: 'http://172.15.150.16/general.xml', location: 'TFD1' },
            { url: 'http://172.15.151.16/general.xml', location: 'TFD2' },
            { url: 'http://172.15.142.16/general.xml', location: 'Kratumban' },
            { url: 'http://172.15.146.16/general.xml', location: 'Smaedum' },
            { url: 'http://172.15.143.16/general.xml', location: 'Bangkadee' },
            { url: 'http://172.15.152.16/general.xml', location: 'Poochao' },
            { url: 'http://172.15.153.16/general.xml', location: 'Suksawad' },
            { url: 'http://172.15.156.16/general.xml', location: 'Bangbor' },
            { url: 'http://172.15.144.16/general.xml', location: 'ESIE2' },
            { url: 'http://172.15.162.16/general.xml', location: 'Wangnoi' },
            { url: 'http://172.15.163.16/general.xml', location: 'Khaokhansong' },
            { url: 'http://172.15.164.16/general.xml', location: 'Pattaya1' },
            { url: 'http://172.15.165.16/general.xml', location: 'Pattaya2' },
            { url: 'http://172.15.166.16/general.xml', location: 'Rangsit' },
            { url: 'http://172.15.167.16/general.xml', location: 'Ratburana' },

            // { url: 'http://172.15.149.16/general.xml', location: '4002-MDB-BLDG1' },
            // { url: 'http://172.15.149.17/general.xml', location: '4002-EQP-BLDG2' },


        ];

        const data = {};

        await Promise.all([
            fetchAndProcessData(urls[0].url, data, urls[0].location, ["Door", "AC"], ["Motion1", "Temperature", "Humidity"]),
            fetchAndProcessData(urls[1].url, data, urls[1].location, ["Door", "AC"], ["Motion1", "Temperature", "Humidity"]),
            fetchAndProcessData(urls[2].url, data, urls[2].location, ["Door", "AC", "Rectifier"], ["Motion1", "Temperature", "Humidity"]),
            fetchAndProcessData(urls[3].url, data, urls[3].location, ["Door", "AC", "Motion1"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[4].url, data, urls[4].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[5].url, data, urls[5].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[6].url, data, urls[6].location, ["Door", "AC", "smoke1"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[7].url, data, urls[7].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[8].url, data, urls[8].location, ["AC"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[9].url, data, urls[9].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[10].url, data, urls[10].location, ["Door", "AC", "smoke1", "Gen1"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[11].url, data, urls[11].location, ["Door", "AC", "smoke1", "Gen1"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[12].url, data, urls[12].location, ["Door", "AC", "smoke1", "Gen1"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[13].url, data, urls[13].location, ["AC"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[14].url, data, urls[14].location, ["smoke_Inven", "smoke_EQ1", "smoke_Power"], ["Humidity_EQ1", "Temp_EQ1", "Humidity_Power", "Temp_Power"]),
            fetchAndProcessData(urls[15].url, data, urls[15].location, ["smoke", "Gen", "AC"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[16].url, data, urls[16].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[17].url, data, urls[17].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[18].url, data, urls[18].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[19].url, data, urls[19].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[20].url, data, urls[20].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[21].url, data, urls[21].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[22].url, data, urls[22].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[23].url, data, urls[23].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[24].url, data, urls[24].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[25].url, data, urls[25].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[26].url, data, urls[26].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[27].url, data, urls[27].location, ["smoke_power", "smoke_eqp", "smoke_patching", "Ac_sensor"], ["Motion1", "Motion2", "Gen1","Humidity_Power", "Temp_EQP","Humidity_EQP","Temp_Power",]),
            fetchAndProcessData(urls[28].url, data, urls[28].location, ["Door", "AC", "smoke1", "Gen1"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[29].url, data, urls[29].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[30].url, data, urls[30].location, ["Door", "AC", "smoke1", "smoke2"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[31].url, data, urls[31].location, ["Door", "AC", "smoke1", "smoke2"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[32].url, data, urls[32].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[33].url, data, urls[33].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[34].url, data, urls[34].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[35].url, data, urls[35].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),       
             fetchAndProcessData(urls[37].url, data, urls[37].location, ["Door", "AC", "Smoke", "Gen"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[38].url, data, urls[38].location, ["Door", "AC", "Smoke", "Gen"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[39].url, data, urls[39].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[40].url, data, urls[40].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[41].url, data, urls[41].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[42].url, data, urls[42].location, ["Door", "AC", "smoke1", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[43].url, data, urls[43].location, ["Door", "AC", "Smoke"], ["Recti11", "Recti12", "Recti21", "Recti22", "Temperature",  "Humidity"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[44].url, data, urls[44].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[45].url, data, urls[45].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[46].url, data, urls[46].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[47].url, data, urls[47].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[48].url, data, urls[48].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[49].url, data, urls[49].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[50].url, data, urls[50].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[51].url, data, urls[51].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[52].url, data, urls[52].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[53].url, data, urls[53].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[54].url, data, urls[54].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[55].url, data, urls[55].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[56].url, data, urls[56].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[57].url, data, urls[57].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            fetchAndProcessData(urls[58].url, data, urls[58].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            // fetchAndProcessData(urls[61].url, data, urls[61].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),
            // fetchAndProcessData(urls[62].url, data, urls[62].location, ["Door", "AC", "Smoke", "Rectifier"], ["Temperature", "Humidity"]),

            // fetchAndProcessData(urls[44].url, data, urls[44].location, ["AC", "AC1", "AC2", "AC3", "AC4", "AC5", "AC6","SmokeGen400","SmokeGen100","SmokeMDB","Generator400"], ["Temperature", "Humidity"]),
            // fetchAndProcessData(urls[45].url, data, urls[45].location, [
            //     "SmokeMMR",
            //     "SmokeElectricalEQP1",
            //     "SmokeEQP1", 
            //     "Recti1AC",
            //     "Recti1Fail",
            //     "Recti1DisCharge",
            //     "Recti1HighTemp",
            //     "Recti2AC",
            //     "Recti2Fail",
            //     "Recti2DisCharge",
            //     "Recti2HighTemp"
            // ], [
            //     "TempEQP1",
            //     "TempElectricalEQP1",
            //     "TempMMR",
            //     "HumEQP1",
            //     "HumElectricalEQP1", 
            //     ]),




        ]);

        return res.status(200).json({
            success: true,
            message: "OK",
            results: Object.keys(data).length,
            data: data
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Monitor error' });
    }
}

async function fetchAndProcessData(url, data, location, binaryFilters, senSetFilters) {
    const response = await axios.get(url);
    const result = await new Promise((resolve, reject) => {
        parseString(response.data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    const binaryInSetEntries = result['set:Root']['BinaryInSet'][0]['Entry']
        .filter(entry => binaryFilters.includes(entry['Name'][0]))
        .map(entry => ({ Name: entry['Name'][0], Value: entry['Value'][0] }));

    const senSetEntries = result['set:Root']['SenSet'][0]['Entry']
        .filter(entry => senSetFilters.includes(entry['Name'][0]))
        .map(entry => ({ Name: entry['Name'][0], Value: entry['Value'][0] }));

    // เปลี่ยน key จาก URL เป็น location
    data[location] = {
        BinaryInSet: binaryInSetEntries,
        SenSet: senSetEntries
    };
}


module.exports = { monitor };
