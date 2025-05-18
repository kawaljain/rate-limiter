// src/app.js

const express = require("express");
const rateLimiter = require("./src/rateLimiter");

const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware globally
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Request successful!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
