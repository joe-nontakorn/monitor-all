const express = require('express');
const http = require('http');
const path = require('path');
const appRoutes = require("./src/router/router");
require("dotenv").config();
const cors = require('cors');
const WebSocket = require('ws');
const webSocketService = require('./src/service/websocketService');

const fs = require("fs");

const app = express();
const port = process.env.PORT;

const logFolderPath = path.join(__dirname, "/src/log");
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

// Middleware function to log requests
app.use((req, res, next) => {

    deleteOldLogFiles();

    const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    try {
        fs.appendFileSync(logFilePath, logData);
        next();
    } catch (err) {
        console.error("Error writing to log file:", err);
        next(err); // Pass error to Express error handler middleware
    }
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(cors());

appRoutes.routes({ app: app });

// Create HTTP server
const server = http.createServer(app);

// Pass HTTP server to WebSocket server
const wss = new WebSocket.Server({ server });

// Call WebSocket service function
webSocketService(wss);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build'));
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
