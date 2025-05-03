const axios = require("axios");
const { StatusCodes } = require("http-status-codes");

// Function to fetch initial restaurant data
async function fetchData(req, res) {
  try {
    // console.log(res);
    const lat = 25.5908;
    const lng = 85.1348;
    // Fetch the initial restaurant data
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
    // const { csrfToken, deviceId, sid, tid } = data;
    // const { nextOffset } = data?.data?.pageOffset;
    // const nextOffSet = data.data.pageOffset.nextOffset;
    // await fetchNextOffSetData(nextOffSet, csrfToken, deviceId, sid, tid);
    // console.log(csrfToken, deviceId, sid, tid);
    res.status(StatusCodes.OK).json(data); // Send the actual JSON
  } catch (error) {
    // Handle errors
    console.error("Error fetching Swiggy data:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch data" });
  }
}
const headers = {
  authority: "www.swiggy.com",
  method: "POST",
  path: "/dapi/restaurants/list/update",
  scheme: "https",
  __fetch_req__: "true",
  accept: "*/*",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "en-US,en;q=0.6",
  "content-length": "609",
  "content-type": "application/json",
  cookie:
    "__SW=SipafxVhH1BOQgbZikMrFy_UpzT0P3lX; _device_id=b06ac8c7-6bbe-a578-c012-c8fb69214e42; _ot=REGULAR; location=%7B%22lat%22%3A25.626227%2C%22lng%22%3A85.0974179%2C%22address%22%3A%22Keshri%20Nagar%2C%20Patna%2C%20Bihar%2C%20India%22%2C%22area%22%3A%22patna%22%7D; userLocation={%22lat%22:%2225.59430%22,%22lng%22:%2285.13520%22,%22address%22:%22%22,%22area%22:%22%22,%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; _guest_tid=dad2cc2b-a950-4496-9e9e-0a2a03a75cef; _sid=kdb8a34b-db1e-4078-8f54-89bbab18ce69",
  origin: "https://www.swiggy.com",
  priority: "u=1, i",
  referer: "https://www.swiggy.com/restaurants",
  "sec-ch-ua": '"Brave";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "sec-gpc": "1",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
};

// Function to fetch nextOffSet restaurant data

async function fetchNextOffSetData(nextOffSet, csrfToken, deviceId, sid, tid) {
  try {
    console.log(nextOffSet, csrfToken, deviceId, sid, tid);
    const response = await axios.post(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      {
        lat: 25.5940947,
        lng: 85.1375645,
        nextOffset: nextOffSet,
        widgetOffset: {
          NewListingView_category_bar_chicletranking_TwoRows: "",
          NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
          Restaurant_Group_WebView_SEO_PB_Theme: "",
          collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "9",
          inlineFacetFilter: "",
          restaurantCountWidget: "",
        },
        filters: {},
        seoParams: {
          seoUrl: "https://www.swiggy.com/restaurants",
          pageType: "FOOD_HOMEPAGE",
          apiName: "FoodHomePage",
          businessLine: "FOOD",
        },
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: csrfToken,
      },
      {
        headers: {
          authority: "www.swiggy.com",
          method: "POST",
          path: "/dapi/restaurants/list/update",
          scheme: "https",
          __fetch_req__: "true",
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br, zstd",
          "accept-language": "en-US,en;q=0.6",
          "content-length": "609",
          "content-type": "application/json",
          cookie: `__SW=SipafxVhH1BOQgbZikMrFy_UpzT0P3lX; _device_id=${deviceId}; _ot=REGULAR; location=%7B%22lat%22%3A25.626227%2C%22lng%22%3A85.0974179%2C%22address%22%3A%22Keshri%20Nagar%2C%20Patna%2C%20Bihar%2C%20India%22%2C%22area%22%3A%22patna%22%7D; userLocation={%22lat%22:%2225.59430%22,%22lng%22:%2285.13520%22,%22address%22:%22%22,%22area%22:%22%22,%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; _guest_tid=${tid}; _sid=${sid}`,
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
    const data = await response.json;
    console.log(response.data.data.cards);
  } catch (error) {
    console.error("Error fetching nextOffSet data:", error);
  }
}

module.exports = { fetchData, fetchNextOffSetData };
