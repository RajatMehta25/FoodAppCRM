import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./constants/Statics";

// import { compose } from "redux";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: API_URL,
});

//customer and admin secure
// instance.defaults.headers.common["language"] = window.localStorage.getItem("rcml-lang") || "en";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
if (localStorage.accessToken) {
  const JWT_token = localStorage.accessToken;
  instance.defaults.headers.common["accessToken"] = JWT_token;
}

instance.interceptors.request.use(
  async (config) => {
    const JWT_token = localStorage.accessToken;
    config.headers.common["accessToken"] = JWT_token;

    return config;
  },
  (error) => {
    console.log("apiHit", error.response);
    toast.error(`${error.response.data.message}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    if (error.response.status === 401 || error.response.status === 500) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      //window.location.pathname = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
