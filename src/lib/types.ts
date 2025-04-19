export interface reactionType {
  src: string;
  id: string;
  alt: string;
  color: string;
}
export interface signupType {
  name: string;
  email: string;
  password: string;
}

export interface responseType {
  error: boolean;
  message: string;
  status: number;
  payload?: object;
}