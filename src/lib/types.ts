import { z } from "zod";
import { loginSchema, signupSchema } from "@/validations/user";
import { likeTypes, Media, Post, PostLike, Profile, User } from "@/generated/prisma";

export interface reactionType {
  src: string;
  id: likeTypes;
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
  data?: object;
}

enum mediaTypes {
  image,
  video,
  audio,
  file,
}

enum mediaPurposes {
  profile,
  cover,
  post,
}

export interface mediaType {
  id: string;
  postId?: string | null;
  authorId: string;
  type: mediaTypes;
  purpose: mediaPurposes;
  url: string;
  caption?: string | null;
  position?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type FeedPostLike = PostLike & {
    author: User & {
      profile: Profile
    }
}

export type FeedPost = Post & {
  likes: FeedPostLike[],
  comments: Comment[],
  media: Media[],
  author: User & {
    profile: Profile
  }
};
