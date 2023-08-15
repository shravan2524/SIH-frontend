import { getData, postData } from "./common";
export const detailsUrl = `${process.env.REACT_APP_BACK_URL}/api/details`;

const getLocations = async () => {
  const data = await getData(detailsUrl + "/location");
  if (data) return data.data;
  return data;
};

const getExperiences = async () => {
	const data = await getData(detailsUrl + "/experience");
  if (data) return data.data;
  return data;
}
const getDemographics = async () => {
  const data = await getData(detailsUrl + "/demographic");
  if (data) return data.data;
  return data;
};

const getApplicationStats = async () => {
  const data = await getData(detailsUrl + "/applicationStatus");
  if (data) return data.data;
  return data;
};
export { getLocations, getDemographics, getApplicationStats, getExperiences };
