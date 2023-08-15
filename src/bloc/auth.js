import axios from "axios";

import { getData, postData } from "./common";

export const authUrl = `${process.env.REACT_APP_BACK_URL}/api/auth`;

const verify = async () => {
  const token = localStorage.getItem("tk");
  if (!token || token.length === 0) return null;
  const res = await axios.get(`${authUrl}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200 || res.data["status"] == "error") return null;
  var data = res.data.data;
  delete data["iat"];
  return data;
};

const logout = () => {
  localStorage.clear();
  window.location.replace("/login");
};
const signUp = async (data) => {
  const url = `${authUrl}/register`;
  const res = await postData(url, data);
  return res;
};

const login = async (data) => {
  const url = `${authUrl}/login`;
  const resData = await postData(url, data);
  if (resData) localStorage.setItem("tk", resData["token"]);
  return resData;
};

const getRoles = async () => {
  const url = `${process.env.REACT_APP_BACK_URL}/api/role`;
  const resData = await getData(url);
  if (resData.data) return resData.data;
  return resData;
};
export { signUp, login, verify, getRoles, logout };
