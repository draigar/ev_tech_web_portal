// import {BASE_URL} from 'react-native-dotenv';
import { authStore } from "web/store";
import { apiInstance } from "./axios";
import { optionsAxios, optionsFetch } from "web/types";
import { BASE_URL } from "web/roots";

// const BASE_URL = "http://192.168.1.11:9092/v1/";

class Http {
  async get(path: string, options: optionsAxios = {
    isGeneric: false,
    headers: {}
  }) {
    const url = options.isGeneric ? path : BASE_URL + path;
    const headers: any = options.headers;
    try {
      const res = await apiInstance.get(url, {
        headers: {
          Authorization: `Bearer ${authStore.token.access_token}`,
          headers,
        },
      });
      // console.log(res);
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (e) {
      // console.log("get error", e);
      return Promise.reject(e);
    }
  }
  async post(path: string, payload?: any, options: any = {}) {
    const url = options.isGeneric ? path : BASE_URL + path;
    try {
      const res = await apiInstance.post(url, payload, {
        headers: {
          Authorization: options.Token
            ? `Bearer ${options.Token}`
            : `Bearer ${authStore.token.access_token}`,
          options,
        },
      });
      return new Promise((resolve) => {
        resolve(res);
      });
    } catch (e) {
      // console.log('post error', e.response);
      return Promise.reject(e);
    }
  }
  // async fetchGet(path: string, options: optionsFetch = {
  //   isGeneric: false,
  //   headers: {},
  //   revalidate: 0,
  // }) {
  //   const url = options.isGeneric ? path : BASE_URL + path;
  //   const headers = options.headers;
  //   const res = await fetch(url, {
  //     next: {revalidate: options.revalidate},
  //     headers: headers
  //   });
  //   return res.json()
  // }
}

export const http = new Http();
