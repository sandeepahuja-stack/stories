import axios, { AxiosRequestHeaders } from "axios";

const apiClient = ({
    url, 
    headers

}: { url: string, headers?: AxiosRequestHeaders}) => {
    
    const axiosInstance = axios.create({
        baseURL: url,
        responseType: 'json',
        ...(headers && headers)
    });
    return axiosInstance;
}
export default apiClient;