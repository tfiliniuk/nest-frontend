import axios, {AxiosRequestConfig} from 'axios';
import {getRefreshToken, getToken} from '../utilities/getToken';
import setAxiosHeader from '../utilities/setAxiosHeader';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => setAxiosHeader(config),
    (error) => {
        return Promise.reject(error);
    }
);
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomAxiosRequestConfig = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (originalRequest.headers && refreshToken) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_NOT_SECRET_CODE}/auth/refresh-token`, {
                        refresh_token: refreshToken,
                    });
                    const newAccessToken = response.data.token;
                    localStorage.setItem('token', newAccessToken);
                    localStorage.setItem('refreshToken', response?.data?.refreshToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (errorRefresh) {
                    console.log('errorRefresh', errorRefresh);
                    localStorage.clear();
                }
            }
            // else {
            //     localStorage.clear();
            //     window.location.href = '/';
            //     return Promise.reject(error);
            // }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
