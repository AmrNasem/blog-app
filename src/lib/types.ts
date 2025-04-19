import { z } from 'zod';
import { signupSchema } from "@/validations/user";

export interface reactionType {
  src: string;
  id: string;
  alt: string;
  color: string;
}
export type signupType = z.infer<typeof signupSchema>;
// {
//   name: string;
//   email: string;
//   password: string;
// }

export interface responseType {
  success: boolean;
  errors?: {
    [key: string]: string[];
  };
  message?: string;
  status?: number;
  payload?: object;
  data?: signupType;
}