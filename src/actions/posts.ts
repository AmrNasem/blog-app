"use server";

import { likeTypes } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function reactPost(
  likeType: likeTypes | undefined,
  postId: string
) {
  const { userId } = await verifySession();
  if (!userId) return;

  if (!likeType) return;

  const reaction = await prisma.postLike.create({
    data: {
      likeType,
      postId,
      authorId: userId as string,
    },
  });

  return reaction;
}

export async function changeReactPost(
  id: string | undefined,
  likeType: likeTypes | undefined
) {
  if (!likeType) return;

  const reaction = await prisma.postLike.update({
    where: {
      id,
    },
    data: {
      likeType,
    },
  });

  return reaction;
}

export async function unreactPost(id: string | undefined) {
  const deleted = await prisma.postLike.delete({
    where: {
      id,
    },
  });

  return deleted
}
