const ping2 = require('ping');

async function ping2Cctv(req, res) {

    const phase1 = [
        { ip: '172.20.3.150', name: '1Reception Room', phase: 1 },
        { ip: '172.20.3.151', name: '1Corridoors1', phase: 1 },
        { ip: '172.20.3.152', name: '1Telco Room2', phase: 1 },
        { ip: '172.20.3.153', name: '1Facility Room', phase: 1 },
        { ip: '172.20.3.154', name: '1BackdoorLift', phase: 1 },
        { ip: '172.20.3.155', name: '1Telco Room1', phase: 1 },
        { ip: '172.20.3.156', name: '1Corridoors2', phase: 1 },
        { ip: '172.20.3.157', name: '1Server Room1', phase: 1 },
        { ip: '172.20.3.160', name: '1Server Room2', phase: 1 },
        { ip: '172.20.3.159', name: '1Patching Room1', phase: 1 },
        { ip: '172.20.3.29', name: 'Telco Room', phase: 1 },
        { ip: '172.20.3.41', name: 'JT-Network Room', phase: 1 },
        { ip: '172.20.3.35', name: 'Server Room', phase: 1 },
        { ip: '172.20.3.25', name: 'EE Room', phase: 1 },
        { ip: '172.20.3.34', name: 'Server Room', phase: 1 },
        { ip: '172.20.3.32', name: 'Server Room', phase: 1 },
        { ip: '172.20.3.26', name: '1EE Room1', phase: 1 },
        { ip: '172.20.3.38', name: '1WalkWay1', phase: 1 },
        { ip: '172.20.3.46', name: '1Pac Room1', phase: 1 },
        { ip: '172.20.3.31', name: 'Telco Room2', phase: 1 }
    ];

    const phase2 = [
        { ip: '172.20.3.51', name: '2-CCTV 28', phase: 2 },
        { ip: '172.20.3.52', name: '2-CCTV 27', phase: 2 },
        { ip: '172.20.3.54', name: '2-CCTV 25', phase: 2 },
        { ip: '172.20.3.53', name: '2-CCTV 26', phase: 2 },
        { ip: '172.20.3.55', name: '2-CCTV 24', phase: 2 },
        { ip: '172.20.3.56', name: '2-CCTV 23', phase: 2 },
        { ip: '172.20.3.64', name: '2-CCTV 16', phase: 2 },
        { ip: '172.20.3.44', name: '2-CCTV 38', phase: 2 },
        { ip: '172.20.3.27', name: '2-CCTV 48', phase: 2 },
        { ip: '172.20.3.37', name: '2-CCTV 49', phase: 2 },
        { ip: '172.20.3.42', name: '2-CCTV 51', phase: 2 },
        { ip: '172.20.3.40', name: '2-CCTV 50', phase: 2 },
        { ip: '172.20.3.57', name: 'IDC2-1', phase: 2 },
        { ip: '172.20.3.58', name: 'IDC2-2', phase: 2 },
        { ip: '172.20.3.59', name: 'IDC2-3', phase: 2 },
        { ip: '172.20.3.60', name: 'IDC2-4', phase: 2 },
        { ip: '172.20.3.61', name: 'IDC2-5', phase: 2 },
        { ip: '172.20.3.62', name: 'IDC2-6', phase: 2 },
        { ip: '172.20.3.63', name: 'IDC2-7', phase: 2 }
    ];

    const phase3 = [
        { ip: '172.20.3.205', name: 'IDC3-1', phase: 3 },
        { ip: '172.20.3.206', name: 'IDC3-2', phase: 3 },
        { ip: '172.20.3.207', name: 'IDC3-3', phase: 3 },
        { ip: '172.20.3.208', name: 'IDC3-4', phase: 3 },
        { ip: '172.20.3.209', name: 'IDC3-5', phase: 3 },
        { ip: '172.20.3.210', name: 'IDC3-6', phase: 3 },
        { ip: '172.20.3.211', name: 'IDC3-7', phase: 3 },
        { ip: '172.20.3.212', name: 'IDC3-8', phase: 3 },
        { ip: '172.20.3.213', name: 'IDC3-9', phase: 3 },
        { ip: '172.20.3.214', name: 'IDC3-10', phase: 3 },
        { ip: '172.20.3.215', name: 'IDC3-11', phase: 3 },
        { ip: '172.20.3.216', name: 'IDC3-12', phase: 3 },
        { ip: '172.20.3.215', name: 'IDC3-13', phase: 3 },
        { ip: '172.20.3.218', name: 'IDC3-14', phase: 3 }
    ];

    try {
        const results1 = await Promise.all(
            phase1.map(async item => {
                const response = await ping2.promise.probe(item.ip);
                return {
                    ip: item.ip,
                    name: item.name,
                    phase: item.phase,
                    status: response.alive ? 'ON' : 'OFF'
                };
            })
        );
    
        const results2 = await Promise.all(
            phase2.map(async item => {
                const response = await ping2.promise.probe(item.ip);
                return {
                    ip: item.ip,
                    name: item.name,
                    phase: item.phase,
                    status: response.alive ? 'ON' : 'OFF'
                };
            })
        );
    
        const results3 = await Promise.all(
            phase3.map(async item => {
                const response = await ping2.promise.probe(item.ip);
                return {
                    ip: item.ip,
                    name: item.name,
                    phase: item.phase,
                    status: response.alive ? 'ON' : 'OFF'
                };
            })
        );
    
        res.status(200).json({
            success: true,
            message: "OK",
            results: {
                results1: results1.length,
                results2: results2.length,
                results3: results3.length,
                data: {
                    phase1: results1,
                    phase2: results2,
                    phase3: results3
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ping cctv error' });
    }
    

}

module.exports = { ping2Cctv };
