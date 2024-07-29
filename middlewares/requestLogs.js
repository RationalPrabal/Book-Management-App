const fs = require("fs").promises; // Use fs.promises for async/await
const path = require("path");
const moment = require("moment");

// Path to the log file
const logFilePath = path.join(__dirname, "../logs/requestLogs.txt");

//! middleware to get all the requests info

const requestLogger = async (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

  const logEntry = `Timestamp: ${timestamp} - Method: ${method} - URL: ${url}\n`;

  try {
    // Append the log entry to the log file
    await fs.appendFile(logFilePath, logEntry);
  } catch (err) {
    console.error("Failed to write to log file:", err);
  }

  next();
};

module.exports = { requestLogger };
