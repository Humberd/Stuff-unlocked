declare const erepublik: any;
declare const SERVER_DATA: any;

export function getCookieHeaders() {
  return {
    cookie: `erpk=${erepublik.settings.pomelo.authToken}`,
  };
}

export function getCsrfToken() {
  return SERVER_DATA.csrfToken;
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
