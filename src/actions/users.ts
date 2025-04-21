"use server";

import prisma from "@/lib/prisma";

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
}
