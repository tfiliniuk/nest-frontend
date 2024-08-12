import axios, {AxiosRequestConfig} from 'axios';
import {getRefreshToken} from '../utilities/getToken';
import setAxiosHeader from '../utilities/setAxiosHeader';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => setAxiosHeader(config),
    (error) => {
        Promise.reject(error);
    }
);

interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: AxiosRequestConfig = error.config;
        if (error.response && error.response.status === 401) {
            console.log('call the refresh token api here');
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = getRefreshToken();
                    if (refreshToken) {
                        axios({
                            method: 'POST',
                            url: `api/auth/refresh-token`,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            data: {
                                refreshToken: refreshToken,
                            },
                        })
                            .then(async (response) => {
                                localStorage.setItem('token', response?.data?.token);
                                localStorage.setItem('refreshToken', response?.data?.refreshToken);
                                return axiosInstance(originalRequest);
                            })
                            .catch((errorRefresh) => {
                                console.log('errorRefresh', errorRefresh);
                                localStorage.clear();
                            });
                        // Repeat all miss request by 401
                        refreshAndRetryQueue.forEach(({config, resolve, reject}) => {
                            axiosInstance(config)
                                .then((response) => resolve(response))
                                .catch((err) => reject(err));
                        });
                        refreshAndRetryQueue.length = 0;
                    } else {
                        localStorage.clear();
                        window.location.href = '/';
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    refreshAndRetryQueue.length = 0;
                    localStorage.clear();
                } finally {
                    isRefreshing = false;
                }
            }
            return new Promise<void>((resolve, reject) => {
                refreshAndRetryQueue.push({config: originalRequest, resolve, reject});
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
