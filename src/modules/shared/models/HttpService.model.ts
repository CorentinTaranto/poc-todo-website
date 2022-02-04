export default interface HttpService {
  get: <T>(endpoint: string, headers?: Headers) => Promise<T>;
  post: <T>(endpoint: string, body: any, headers?: Headers) => Promise<T>;
  put: <T>(endpoint: string, body: any, headers?: Headers) => Promise<T>;
  remove: (endpoint: string, headers?: Headers) => Promise<void>;
  postFormData: <T>(endpoint: string, body: FormData, headers?: Headers) => Promise<T>;
  putFormData: <T>(endpoint: string, body: FormData, headers?: Headers) => Promise<T>;
}
