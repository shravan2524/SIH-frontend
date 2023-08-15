import { getData, postData } from "./common";
const apiUrl = `${process.env.REACT_APP_BACK_URL}/api`;
const getCastes = async () => {
  const data = await getData(apiUrl + "/caste");
  if (data) return data.data;
};

const getReligions = async () => {
  const data = await getData(apiUrl + "/religion");
  if (data) return data.data;
};

const getFigs = async () => {
  const data = await getData(apiUrl + "/familyincomegroup");
  if (data) return data.data;
};
const getCountries = async () => {
  const data = await getData(apiUrl + "/country");
  if (data) return data.data;
};
const getStates = async () => {
  const data = await getData(apiUrl + "/state");
  if (data) return data.data;
};
const getDistricts = async () => {
  const data = await getData(apiUrl + "/district");
  if (data) return data.data;
};

const getCourses = async () => {
  const data = await getData(apiUrl + "/course");
  if (data) return data.data;
  return null;
};

const getStreams = async () => {
  const data = await getData(apiUrl + "/stream");
  if (data) return data.data;
  return null;
};

export {
  getCastes,
  getReligions,
  getFigs,
  getCountries,
  getStates,
  getDistricts,
  getCourses,
  getStreams,
};
