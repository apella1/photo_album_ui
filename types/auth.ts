export interface LoginData {
  email: string;
  password: string;
}

export interface ErrorResponse {
  error: string;
}

export interface LoginResponse {
  token: string;
}

export interface LocationState {
  from: string;
}
