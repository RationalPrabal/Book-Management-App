const fs = require("fs");
const path = require("path");
const moment = require("moment");

// Path to the log file
const logFilePath = path.join(__dirname, "../logs/requestLogs.js");

const requestLogger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

  const logEntry = `Timestamp: ${timestamp} - Method: ${method} - URL: ${url}\n`;
  // Append the log entry to the log file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });

  next();
};

module.exports = { requestLogger };
