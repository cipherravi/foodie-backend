const { v4: uuidv4 } = require("uuid");

const sessionStore = {};
const sessionQueue = [];

const MAX_SESSIONS = 50;
const EXPIRY_TIME_MS = 10 * 60 * 1000; // 10 minutes

function createSession(data) {
  const sessionId = uuidv4();

  // Store session data
  sessionStore[sessionId] = { ...data };

  // Maintain order in queue
  sessionQueue.push(sessionId);
  if (sessionQueue.length > MAX_SESSIONS) {
    const oldest = sessionQueue.shift();
    delete sessionStore[oldest];
  }

  // Auto-expire session after 10 minutes
  setTimeout(() => {
    delete sessionStore[sessionId];
    const index = sessionQueue.indexOf(sessionId);
    if (index !== -1) sessionQueue.splice(index, 1);
  }, EXPIRY_TIME_MS);

  return sessionId;
}

function getSession(sessionId) {
  return sessionStore[sessionId] || null;
}

module.exports = {
  createSession,
  getSession,
};
