"use server";

import { signupType } from "../types";

export const handleSignup = async function (
  prevState: signupType,
  formdata: FormData
): Promise<signupType> {
  const name = formdata.get("name");
  const email = formdata.get("email");
  const password = formdata.get("password");

  return { name, email, password } as signupType;
};
