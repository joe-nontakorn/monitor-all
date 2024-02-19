// websocketService.js

function webSocketService(wss) {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // ส่งข้อมูลแบบ real-time ไปยัง client ทุกๆ 1 วินาที (ตัวอย่าง)
    const interval = setInterval(() => {
      const message = JSON.stringify({ message: 'This is a real-time message' });
      ws.send(message);
    }, 1000);

    // จัดการเหตุการณ์เมื่อ client ยกเลิกการเชื่อมต่อ
    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });
  });
}

module.exports = webSocketService;
