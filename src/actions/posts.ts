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
    select: {
      id: true,
      authorId: true,
      author: { include: { profile: true } },
      likeType: true,
    },
  });

  return reaction;
}

export async function changeReactPost(
  id: string | undefined,
  postId: string,
  likeType: likeTypes | undefined
) {
  if (!likeType) return;

  const reaction = await prisma.postLike.update({
    where: {
      // authorId,
      // postId,
      // authorId_postId: `${authorId}_${postId}`
      id,
    },
    data: {
      likeType,
    },
    select: {
      id: true,
      authorId: true,
      author: { include: { profile: true } },
      likeType: true,
    },
  });

  return reaction;
}

export async function unreactPost(likeId: string | undefined) {
  const deleted = await prisma.postLike.delete({
    where: {
      id: likeId,
    },
    select: {
      id: true,
      authorId: true,
      author: { include: { profile: true } },
      likeType: true,
    },
  });

  return deleted;
}
