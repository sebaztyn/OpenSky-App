import axios from "axios";
import moment from "moment";

const fetchStates = () =>
  axios(
    `https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airports/locations/international-list?api_key=57bf6870-f9cb-11e9-8d85-a9301a904578&format=json&airports=&states=`
  )
    .then(response => {
      const cities = response.data.filter(result => {
        const cityData =
          result.cityName === "London" ||
          result.cityName === "Los Angeles" ||
          result.cityName === "Atlanta" ||
          result.cityName === "Shanghai" ||
          result.cityName === "Bangkok" ||
          result.cityName === "Beijing" ||
          result.cityName === "Chicago" ||
          result.cityName === "New York" ||
          result.cityName === "Paris" ||
          result.cityName === "Tokyo";
        return cityData && result;
      });
      return cities;
    })
    .catch(err => console.log(err, "ERROR!!!!!!!!!!!!!"));

export const fetchFlightInfo = async string => {
  const arrivalInfo = await axios(
    `https://sebaztyn:Qwertyuiop1!@opensky-network.org/api/flights/arrival?airport=${string}&begin=${Math.round(
      moment.duration(moment.now() - 86400000).asSeconds()
    )}&end=${Math.round(moment.duration(moment.now()).asSeconds())}`
  );
  const departureInfo = await axios(
    `https://sebaztyn:Qwertyuiop1!@opensky-network.org/api/flights/departure?airport=${string}&begin=${Math.round(
      moment.duration(moment.now() - 86400000).asSeconds()
    )}&end=${Math.round(moment.duration(moment.now()).asSeconds())}`
  );
  return { arrivalInfo, departureInfo };
};

export default fetchStates;
