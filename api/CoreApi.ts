import axios, { AxiosInstance } from "axios";

export default class CoreApi {
  private axiosInstance: AxiosInstance;

  private baseUrl: string = "http://nginx:80/api";

  private timeout: number = 60000;

  private apiVersion: string = "v1";

  constructor(config?: { apiVersion?: string }) {
    this.apiVersion = config?.apiVersion || "";
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use((axiosConfig) => {
      console.log("config", axiosConfig);
      return axiosConfig;
    });
  }

  public get = (url: string, queryParams?: object) => {
    return this.axiosInstance.get(`${this.apiVersion}${url}`, {
      params: queryParams,
    });
  };

  public post = (url: string, body: object, queryParams?: object) => {
    return this.axiosInstance.post(`${this.apiVersion}${url}`, body, {
      params: queryParams,
    });
  };

  public put = (url: string, body: object, queryParams?: object) => {
    return this.axiosInstance.put(`${this.apiVersion}${url}`, body, {
      params: queryParams,
    });
  };

  public patch = (url: string, body: object, queryParams?: object) => {
    return this.axiosInstance.patch(`${this.apiVersion}${url}`, body, {
      params: queryParams,
    });
  };

  public delete = (url: string, id: number) => {
    return this.axiosInstance.delete(`${url}/${id}`);
  };
}
