import axios, { AxiosInstance } from "axios";

export default class CoreApi {
  private axiosInstance: AxiosInstance;

  private serverUrl: string = "http://nginx:80/api";

  private clientUrl: string = "/api";

  private timeout: number = 60000;

  private apiVersion: string = "v1";

  constructor(config?: { apiVersion?: string }) {
    this.apiVersion = config?.apiVersion || "";
    this.axiosInstance = axios.create({
      baseURL: typeof window === "undefined" ? this.serverUrl : this.clientUrl,
      timeout: this.timeout,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public get = (url: string, queryParams?: object, headers?: object) => {
    return this.axiosInstance.get(`${this.apiVersion}${url}`, {
      params: queryParams,
      headers,
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
