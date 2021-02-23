import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import axiosRetry from 'axios-retry';

export const axiosBungieClientFactory = (
    config?: AxiosRequestConfig
): AxiosInstance => {
    // Create Client
    const client = axios.create({
        baseURL: '',
        ...config
    });

    //configure retries
    // axiosRetry(client, {retries: 2, retryDelay: axiosRetry.exponentialDelay});
    return client;

}