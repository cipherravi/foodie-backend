const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.91.224:5173", // 👈 your local IP for mobile access
  //   "https://your-frontend.vercel.app", // (optional) for production
];

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

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://192.168.91.224:5173"],
//   })
// );
const port = 3000;

app.get("/api/restaurantdata", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.59080&lng=85.13480&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    res.json(data); // Send the actual JSON
  } catch (error) {
    // Handle errors
    console.error("Error fetching Swiggy data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
