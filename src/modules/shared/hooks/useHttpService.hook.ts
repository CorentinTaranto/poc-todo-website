import { useEffect, useMemo, useRef } from 'react';
import httpService from '../services/http.service';

const useHttpService = () => {
  const abortController = useRef(new AbortController());

  const service = useMemo(() => ({
    get: <T>(endpoint: string, headers?: Headers) => httpService
      .get<T>(endpoint, headers, abortController.current.signal),
    post: <T>(endpoint: string, body: any, headers?: Headers) => httpService
      .post<T>(endpoint, body, headers, abortController.current.signal),
    put: <T>(endpoint: string, body: any, headers?: Headers) => httpService
      .put<T>(endpoint, body, headers, abortController.current.signal),
    remove: (endpoint: string, headers?: Headers) => httpService
      .remove(endpoint, headers, abortController.current.signal),
    postFormData: <T>(endpoint: string, body: FormData, headers?: Headers) => httpService
      .postFormData<T>(endpoint, body, headers, abortController.current.signal),
    putFormData: <T>(endpoint: string, body: FormData, headers?: Headers) => httpService
      .putFormData<T>(endpoint, body, headers, abortController.current.signal),
  }), [abortController]);

  useEffect(() => () => {
    abortController.current.abort();
  }, []);

  return service;
};

export default useHttpService;
