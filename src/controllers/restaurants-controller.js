const axios = require("axios");
const { createSession, getSession } = require("../middlewares");
const { StatusCodes } = require("http-status-codes");

// ------------------ /restaurants ------------------
async function fetchInitialData(req, res) {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        params: {
          lat: 25.5908,
          lng: 85.1348,
          is_seo_homepage_enabled: true,
          page_type: "DESKTOP_WEB_LISTING",
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          Accept: "application/json",
        },
      }
    );

    const data = response.data;
    const sessionId = createSession({
      nextOffset: data?.data?.pageOffset?.nextOffset || "",
      csrfToken: data?.csrfToken || "",
      deviceId: data?.deviceId || "",
      sid: data?.sid || "",
      tid: data?.tid || "",
      widgetOffsetValue: 9,
    });

    res.status(StatusCodes.OK).json({ sessionId, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch" });
  }
}

// ------------------ /restaurants/update ------------------
async function fetchNextData(req, res) {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Invalid or missing sessionId" });
  }

  const session = getSession(sessionId);
  if (!session) {
    return res.status(400).json({ error: "Invalid or expired sessionId" });
  }

  try {
    const response = await axios.post(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      {
        lat: 25.5908,
        lng: 85.1348,
        nextOffset: session.nextOffset,
        widgetOffset: {
          collectionV5RestaurantListWidget_SimRestoRelevance_food_seo:
            session.widgetOffsetValue.toString(),
        },
        filters: {},
        seoParams: {
          seoUrl: "https://www.swiggy.com/restaurants",
          pageType: "FOOD_HOMEPAGE",
          apiName: "FoodHomePage",
          businessLine: "FOOD",
        },
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: session.csrfToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `device_id=${session.deviceId}; _sid=${session.sid}; _guest_tid=${session.tid}`,
          Referer: "https://www.swiggy.com/restaurants",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",

          authority: "www.swiggy.com",
          method: "POST",
          path: "/dapi/restaurants/list/update",
          scheme: "https",
          __fetch_req__: "true",
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.6",

          "content-type": "application/json",
          origin: "https://www.swiggy.com",
          priority: "u=1, i",
          referer: "https://www.swiggy.com/restaurants",
          "sec-ch-ua":
            '"Brave";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        },
      }
    );

    const data = response.data;

    // Update session for next call
    session.nextOffset =
      data?.data?.pageOffset?.nextOffset || session.nextOffset;
    session.widgetOffsetValue += 15;

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Update failed" });
  }
}

module.exports = { fetchInitialData, fetchNextData };
