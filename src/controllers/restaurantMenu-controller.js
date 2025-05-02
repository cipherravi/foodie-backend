const { StatusCodes } = require("http-status-codes");

async function menuData(req, res) {
  try {
    const { restaurantId } = req.params; // Get the restaurant ID from the params parameters

    if (!restaurantId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Restaurant ID is required" });
    }
    // Fetch the menu data for the specific restaurant
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.59430&lng=85.13520&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`,
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

module.exports = { menuData };
