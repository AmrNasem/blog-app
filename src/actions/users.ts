"use server";

import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
}

export async function getMe() {
  const { userId } = await verifySession();
  if (!userId) redirect("/login");

  const authedUser = await prisma.user.findUnique({
    where: { id: userId as string },
    include: {
      profile: {
        select: { isTouched: true, bio: true, about: true, avatar: true },
      },
      posts: {},
      followers: {},
      followings: {},
    },
    omit: { password: true },
  });

  return {
    ...authedUser,
    posts: authedUser?.posts.length,
    followings: authedUser?.followings.length,
    followers: authedUser?.followers.length,
  };
}

export async function getFeed() {
  const { userId } = await verifySession();
  if (!userId) redirect("/login");

  const posts = await prisma.post.findMany({
    include: {
      author: { omit: { password: true }, include: { profile: {} } },
      media: {},
      comments: { select: { author: { select: { name: true } } } },
      likes: {
        select: {
          id: true,
          authorId: true,
          author: { select: { name: true } },
          likeType: true,
        },
      },
    },
  });

  const formattedPosts = posts.map((post) => ({
    ...post,
    yourLike: post.likes.find((like) => like.authorId === userId),
  }));

  return formattedPosts;
}
