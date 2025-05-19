"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginType, responseType, signupType } from "@/lib/types";
import { loginSchema, signupSchema } from "@/validations/user";
import { createSession, deleteSession } from "@/lib/session";

interface myError extends Error {
  status: number;
  errors?: {
    [key: string]: string[];
  };
}

export async function signup(
  prevState: responseType,
  formdata: FormData
): Promise<responseType> {
  const loginData = {
    name: formdata.get("name"),
    password: formdata.get("password"),
    email: formdata.get("email"),
  };
  const validation = signupSchema.safeParse(loginData);

  const { name, email, password } = loginData as signupType;

  try {
    if (!validation.success) {
      const err = new Error() as myError;
      err.errors = validation.error.flatten().fieldErrors;
      throw err;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      const err = new Error("User already exists") as myError;
      err.status = 400;
      throw err;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generating a unique username
    const baseUsername = name.trim().toLowerCase().replace(/(\s|\W)+/g, "_");
    let username = baseUsername;
    let counter = 1;

    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
      omit: {
        password: true,
      },
    });

    const { session } = await createSession(user.id);

    return {
      success: true,
      message: "User created successfully",
      status: 201,
      payload: { user, session },
    };
  } catch (error) {
    const err = error as myError;

    return {
      success: false,
      message: err.message,
      status: err.status,
      errors: err.errors,
      data: { name, email, password },
    };
  }
}

export async function login(
  prevState: responseType,
  formdata: FormData
): Promise<responseType> {
  const loginData = {
    password: formdata.get("password"),
    email: formdata.get("email"),
  };
  const validation = loginSchema.safeParse(loginData);

  const { email, password } = loginData as loginType;

  try {
    if (!validation.success) {
      const err = new Error() as myError;
      err.errors = validation.error.flatten().fieldErrors;
      throw err;
    }
    // Find User
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const err = new Error("User not found!") as myError;
      err.status = 404;
      throw err;
    }

    // Hash password
    const isIdentical = await bcrypt.compare(password, user.password);
    if (!isIdentical) {
      const err = new Error("Invalid email or password") as myError;
      err.status = 400;
      throw err;
    }

    const { session } = await createSession(user.id);
    return {
      success: true,
      message: "Logged in successfully.",
      status: 200,
      payload: { user, session },
    };
  } catch (error) {
    const err = error as myError;

    return {
      success: false,
      message: err.message,
      status: err.status,
      errors: err.errors,
      data: { email, password },
    };
  }
}

export async function logout() {
  await deleteSession();
}