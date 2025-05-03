const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/server-config");
const apiRoutes = require("./routes");
const { scheduleNextPing } = require("./utils/ping");
const { allowedOrigins } = require("./utils/constant");
const { StatusCodes } = require("http-status-codes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use("/api", apiRoutes);

async function pingServer(req, res) {
  try {
    const response = await fetch("https://keep-alive-rbb2.onrender.com/ping");
    setTimeout(() => {
      pingServer();
    }, 600000); // 10 minutes
    if (response.ok) {
      console.log("Server is up and running");
    } else {
      console.error("Server is down");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Failed to make call" });
  }
}
pingServer();
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  scheduleNextPing();
});
