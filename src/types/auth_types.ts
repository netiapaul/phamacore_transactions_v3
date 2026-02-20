export interface ErrorResponse {
  message?: string;
  errors?: string[] | Record<string, unknown>;
}

export interface ApiError {
  response?: {
    data?: string | ErrorResponse;
  };
  request?: unknown;
  message?: string;
}
