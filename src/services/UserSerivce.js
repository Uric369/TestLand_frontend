import {postRequest,postRequest_v3} from "../utils/ajax";
import {message} from 'antd';

export const setSalt = async (data, salt) => {
    const url = `http://localhost:8080/setSalt?username=${data}&salt=${salt}`;

    try {
      const response = await postRequest_v3(url, null);
      console.log(response.message);
      console.log(response.status);
      console.log(response.data);

      if (response.status >= 0) {
        console.log("Salt set successfully");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getSalt = async (data) => {
    const url = `http://localhost:8080/getSalt?username=${data}`;
    try {
        const response = await postRequest_v3(url, null);
        console.log(response.message);
        console.log(response.status);
        console.log(response.data);

        if (response.status >= 0) {
            return response.data;
        } else {
            message.error(response.message);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const login = async (data) => {
    const url = `http://localhost:8080/login`;
    try {
        const response = await postRequest_v3(url, data);
        console.log(response.message);
        console.log(response.status);
        console.log(response.data);
        if (response.status >= 0) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('userId', response.data.userId);
            if (response.data.userType === 1) {
                window.location = "/";
            }
            if (response.data.userType === 0) {
                window.location = "/admin";
            }

        } else {
            message.error(response.message);
        }
    } catch (error) {
        console.error(error);
        throw error;
        }
    };


export const register = async (data) => {
    const url = `http://localhost:8080/register`;

    try {
      const response = await postRequest_v3(url, data);
      console.log(response.message);
      console.log(response.status);
      console.log(response.data);

      if (response.status >= 0) {
        message.success(response.message);
        window.location = "/login";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const getUserList = (callback) => {
    const url = `http://localhost:8080/getUserList`;
    postRequest(url, null, callback);
};

export const changeUserStatus = (username) => {
    console.log(username)
    const url = `http://localhost:8080/changeUserStatus?username=${username}`;

    postRequest(url, null, null);
    window.location.reload();
};

export const getRankingList = (callback) => {
    const url = `http://localhost:8080/getRankingList`;
    postRequest(url, null, callback);
};