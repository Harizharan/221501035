const LOG_LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

export function log(message, level = "info") {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${
    LOG_LEVELS[level.toUpperCase()] || "INFO"
  }] ${message}`;

  const existingLogs = JSON.parse(localStorage.getItem("appLogs") || "[]");
  existingLogs.push(logEntry);
  localStorage.setItem("appLogs", JSON.stringify(existingLogs));
}
export function getLogs() {
  return JSON.parse(localStorage.getItem("appLogs") || "[]");
}

export function clearLogs() {
  localStorage.removeItem("appLogs");
}
