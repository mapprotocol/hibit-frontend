import axios from 'axios';

// 创建一个axios实例
export const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    timeout: process.env.NODE_ENV === 'development' ? 100000 : 20000, // request timeout
});

export const service2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST_2,
    timeout: process.env.NODE_ENV === 'development' ? 100000 : 20000, // request timeout
})

export const service3 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HISTORY_API_HOST,
    timeout: process.env.NODE_ENV === 'development' ? 100000 : 20000, // request timeout
})

service.interceptors.response.use((response) => {
    if (typeof response.data === "object") {
        if (response.data.errno) {
            throw new Error(response.data.message);
        } else {
            return response;
        }
    } else {
        return response;
    }
}, function (error) {
    if (error.response) {
        throw new Error(error.response.data.message);
    }
    throw error;
})


service3.interceptors.response.use((response) => {
  if (response.data.code !== 200) {
      throw new Error(response.data.message);
  } else {
      return response;
  }
})
