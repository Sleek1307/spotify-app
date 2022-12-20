import apiCall from '../api/index';
import config from '../config';

export const spotifyAuthCall = async (requireParams) => {

  try {
    const params = {
      ...requireParams,
      ...config,
    };

    const searchParams = Object.keys(params).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&")

    const spotifyResponse = await apiCall({
      method: 'POST',
      url: "https://accounts.spotify.com/api/token",
      body: searchParams,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      }
    })

    return await spotifyResponse.json();

  } catch (error) {
    console.log(error);
  }
}

export const spotifySearchCall = async (paramsArray, token) => {
  try {
    const url = new URL("https://api.spotify.com/v1/search?");

    for (const item of paramsArray) {
      const key = Object.keys(item)[0];

      url.searchParams.append(key, item[key])
    }

    const spotifyResponse = await apiCall({
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
    },
    })

    return await spotifyResponse.json();

} catch (error) {
  console.log(error);
}

}