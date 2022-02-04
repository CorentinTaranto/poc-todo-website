import ApiError from './ApiError.model';

class HttpServiceError extends Error {
  errors: ApiError[];

  constructor(args: ApiError[] = []) {
    super();
    this.errors = args;
  }
}

export default HttpServiceError;
