"use server";

import { likeTypes } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";

const select = {
  id: true,
  authorId: true,
  author: { include: { profile: true } },
  likeType: true,
};

export async function reactPost(
  likeType: likeTypes,
  postId: string,
  likeId?: string
) {
  const { userId } = await verifySession();
  if (!userId) return;

  const reaction = await prisma.postLike.upsert({
    where: { id: likeId || "" },
    create: {
      likeType,
      postId,
      authorId: userId as string,
    },
    update: {
      likeType,
    },
    select,
  });

  return reaction;
}

export async function unreactPost(likeId: string) {
  const deleted = await prisma.postLike.delete({
    where: {
      id: likeId,
    },
    select,
  });

  return deleted;
}
