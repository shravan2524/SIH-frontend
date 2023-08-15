import axios from "axios";
import toast from "react-hot-toast";
const token = localStorage.getItem("tk");
const postData = async (url, data) => {
  try {
    const res = await axios.post(url, data);
    if (res.data["status"] === "success") {
      toast.success(res.data["message"]);
    } else {
      if (res.data.message.errors) {
        let response = res.data.message.errors
          .map(
            (el, index) =>
              (index + 1).toString() + ". " + el["msg"].toString() + "\n"
          )
          .toString();
        let msgs = response.replace(/\,/g, "");
        toast.error(msgs);
      } else {
        toast.error(res.data.message);
      }
      return null;
    }
    return res.data;
  } catch (error) {
    if (error.response.data) toast.error(error.response.data["message"]);
    else toast.error("Oops Something went wrong :(");
    return null;
  }
};

const putData = async (url, data) => {
  try {
    const res = await axios.put(url, data);
    console.log(res);
    if (res.data["status"] === "success") {
      toast.success(res.data["message"]);
    } else {
      if (res.data.message.errors) {
        let response = res.data.message.errors
          .map(
            (el, index) =>
              (index + 1).toString() + ". " + el["msg"].toString() + "\n"
          )
          .toString();
        let msgs = response.replace(/\,/g, "");
        toast.error(msgs);
      } else {
        toast.error(res.data.message);
      }
      return null;
    }
    return res.data;
  } catch (error) {
    if (error.response.data) toast.error(error.response.data["message"]);
    else toast.error("Oops Something went wrong :(");
    return null;
  }
};

const getData = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    if (res.data["status"] === "success") {
      return res.data;
    } else return null;
  } catch (error) {
    if (error.response.data) return null;
  }
};

export { postData, getData, putData };
