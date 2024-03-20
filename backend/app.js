const express = require('express');
const http = require('http');
const path = require('path');
const appRoutes = require("../backend/src/router/router");
require("dotenv").config();
const cors = require('cors');
const WebSocket = require('ws');
const webSocketService = require('./src/service/websocketService');

const fs = require("fs");

const app = express();
const port = process.env.PORT;

const logFolderPath = path.join(__dirname, "../backend/src/log");
const currentDate = new Date().toISOString().split("T")[0];
const logFileName = `${currentDate}.log`;
const logFilePath = path.join(logFolderPath, logFileName);

function deleteOldLogFiles() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    fs.readdir(logFolderPath, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const fileCreationDate = fs.statSync(path.join(logFolderPath, file)).ctime;

            if (fileCreationDate < sevenDaysAgo) {
                fs.unlink(path.join(logFolderPath, file), err => {
                    if (err) throw err;
                    console.log(`Deleted old log file: ${file}`);
                });
            }
        });
    });
}

if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath, { recursive: true });
}

app.use((req, res, next) => {
    deleteOldLogFiles();
    const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    try {
        fs.appendFileSync(logFilePath, logData);
        next();
    } catch (err) {
        console.error("Error writing to log file:", err);
        next(err);
    }
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(cors());

appRoutes.routes({ app: app });

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

webSocketService(wss);

app.all('*', (req, res, next) => {
    res.sendFile("index.html", { root: path.join(__dirname, "../frontend/build") });
    next();
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
