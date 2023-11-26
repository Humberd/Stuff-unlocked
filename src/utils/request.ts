import { getAuthToken } from "./erep-global-info";

export function getCookieHeaders() {
  return {
    cookie: `erpk=${getAuthToken()}`,
  };
}

export function objectToWwwFormUrlEncoded(obj: any) {
  const searchParams = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    searchParams.append(key, obj[key]);
  });
  return searchParams.toString();
}

export interface SuccessResponse {
  error: 0;
  message: string;
}

export interface ErrorResponse {
  error: 1;
  message: string;
}

export type GenericResponseType = SuccessResponse | ErrorResponse;
