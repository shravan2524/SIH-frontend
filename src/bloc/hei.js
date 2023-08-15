import { getData } from "./common";

export const heiUrl = `${process.env.REACT_APP_BACK_URL}/api/hei`;

const getProfiles = async () => {
  const res = await getData(`${heiUrl}/profile`);
  if (res) return res.data;
  return res;
};

const getProfile = async (id) => {
  const res = await getData(`${heiUrl}/profile/${id}`);
  if (res) return res.data;
  return res;
};

const getPostings = async () => {
  const res = await getData(`${heiUrl}/posting`);
  if (res) return res.data;
  return res;
};

const getMembers = async () => {
  const res = await getData(`${heiUrl}/faculty`);
  if (res) return res.data;
  return res;
};

const getApplications = async () => {
  const res = await getData(`${heiUrl}/application`);
  if (res) return res.data;
  return res;
};

export { getProfiles, getPostings, getProfile, getMembers, getApplications };
