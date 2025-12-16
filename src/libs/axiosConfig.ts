import axios from "axios";
import { getSession } from "next-auth/react";
const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

let saveToken: any = null;
Axios.interceptors.request.use(
  async (config) => {
    console.log({ saveToken });
    if (!saveToken) {
      const token = await getSession();
      console.log({ token });
      saveToken = token;
    }
    if (saveToken?.accessToken) {
      config.headers.Authorization = `Bearer ${saveToken?.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
