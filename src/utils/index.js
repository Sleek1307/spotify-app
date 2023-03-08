import apiCall from "../api/index";
import config from "../config";

export const spotifyAuthCall = async (requireParams) => {
  try {
    const params = {
      ...requireParams,
      ...config,
    };

    const searchParams = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    const response = await apiCall({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      body: searchParams,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        responseFailed: await response.json(),
      };
    }
  } catch (error) {
    return error;
  }
};

export const spotifySearchCall = async (paramsArray, token) => {
  try {
    const url = new URL("https://api.spotify.com/v1/search?");

    for (const item of paramsArray) {
      const key = Object.keys(item)[0];
      url.searchParams.append(key, item[key]);
    }

    const response = await apiCall({
      method: "GET",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        responseFailed: await response.json(),
      };
    }
  } catch (error) {
    return error;
  }
};

export const spotifyProfileCall = async (token, endpoints) => {
  let urlString = "https://api.spotify.com/v1/me";
  if (endpoints.length > 0) {
    endpoints.map((endpoint) => {
      urlString += `/${endpoint}`;
    });
  }

  const url = new URL(urlString);

  const response = await apiCall({
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    return {
      error: true,
      failed: await response.json(),
    };
  }
};
