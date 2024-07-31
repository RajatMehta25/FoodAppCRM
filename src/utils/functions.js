import axios from "../axios";
import Axios from "axios";
import { useState } from "react";
export const uploadImage = async (file) => {
    var formData = new FormData();
    formData.append("media", file);
    try {
      const { data } = await axios.post("/auth/uploadImage", formData);
  
      return data;
    } catch (error) {}
  };
  
  
export const extractDate = (e) => {
    if(e) {
        let date = new Date(e).toLocaleDateString()
        return date;
    } else {
        return "";
    }
}  




export async function handleImageUpload(file) {
  // const [progress, setProgress] = useState(0);
  const formData = new FormData();
  formData.append("media", file);
  console.log(file);
  const config = {
    
    baseURL: "http://43.204.209.67:3000/api",
    headers: { "Content-Type": "multipart/form-data",
  "accessToken": localStorage.getItem("accessToken")},
    onUploadProgress: (progressEvent) => {
      const progress = (progressEvent.loaded / progressEvent.total) * 50;
      // setProgress(progress);
      console.log(progressEvent.loaded);
      console.log(progress);
    },
    onDownloadProgress: (progressEvent) => {
      const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
      console.log(progress);
      // setProgress(progress);
    },
  };
  // const [progress, setProgress] = useState(0);
  // const instance = axios.create({
  //   baseURL: "http://18.221.140.83:3000",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  try {
    const { data } = await Axios.post("/common/uploadMedia", formData, config);
    console.log(data);

    return data.data.url;
    //{ location: data.result.file, };
  } catch (err) {
    return err;
  }
}