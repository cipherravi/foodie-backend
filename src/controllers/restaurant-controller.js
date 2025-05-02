const { StatusCodes } = require("http-status-codes");
async function data(req, res) {
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
    res.status(StatusCodes.OK).json(data); // Send the actual JSON
  } catch (error) {
    // Handle errors
    console.error("Error fetching Swiggy data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch data" });
  }
}
module.exports = { data };
