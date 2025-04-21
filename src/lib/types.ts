import { z } from 'zod';
import { loginSchema, signupSchema } from "@/validations/user";

export interface reactionType {
  src: string;
  id: string;
  alt: string;
  color: string;
}
export type signupType = z.infer<typeof signupSchema>;
export type loginType = z.infer<typeof loginSchema>;

export interface responseType {
  success: boolean;
  errors?: {
    [key: string]: string[];
  };
  message?: string;
  status?: number;
  payload?: object;
  data?: object ;
}