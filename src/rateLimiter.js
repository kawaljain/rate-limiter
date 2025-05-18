const ipStore = {};
const WINDOW_SIZE = 60 * 1000 * 15;
const RATE_LIMIT = 100;

const rateLimiter = (req, res, next) => {
  const ip = req.ip;

  const now = Date.now();

  if (!ipStore[ip]) {
    ipStore[ip] = [];
  }

  // Remove timestamps older than 15 minutes
  ipStore[ip] = ipStore[ip].filter(
    (timestamp) => now - timestamp < WINDOW_SIZE
  );

  if (ipStore[ip].length >= RATE_LIMIT) {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }

  // Add current request timestamp
  ipStore[ip].push(now);
  next();
};

module.exports = rateLimiter;
