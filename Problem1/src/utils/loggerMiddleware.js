const logStore = [];

export function log(message, level = "info") {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };
  logStore.push(entry);
}

export function getLogs() {
  return logStore;
}
