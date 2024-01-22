export interface AuthMeResponse {
  resultCode: number;
  messages: string[];
  data: {
    id: number;
    email: string;
    login: string;
  };
}

export enum ResultCode {
  success = 0,
  error = 1,
}
