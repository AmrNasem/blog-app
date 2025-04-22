"use client";
import Image from "next/image";
import Exapander from "../ui/Exapander";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import Avatar from "../ui/Avatar";
import Reactions from "./Reactions";
import { mediaType, reactionType } from "@/lib/types";
import { memo, useCallback } from "react";
import { likeTypes } from "@/generated/prisma";
import { changeReactPost, reactPost, unreactPost } from "@/actions/posts";

interface PostItemProps {
  id: string;
  author: {
    avatar: string;
    name: string;
  };
  className?: string;
  time: string;
  body: string;
  media?: mediaType[];
  likes: { authorId: string; author: { name: string }; likeType: string }[];
  yourLike?: {
    id: string;
    authorId: string;
    author: { name: string };
    likeType: likeTypes;
  };
  comments: { author: { name: string } }[];
}

function PostItem({
  id,
  author,
  className,
  time,
  body,
  likes,
  comments,
  media,
  yourLike,
}: PostItemProps) {
  const onReact = useCallback(
    async (
      reaction: reactionType | undefined,
      action: string,
      callback: () => void
    ) => {
      // React request here
      let newReaction;

      if (action === "POST") newReaction = await reactPost(reaction?.id, id);
      else if (action === "DELETE")
        newReaction = await unreactPost(yourLike?.id);
      else newReaction = await changeReactPost(yourLike?.id, reaction?.id);

      if (!newReaction) callback();
    },
    [id, yourLike]
  );

  console.log(yourLike);

  const onComment = useCallback(() => {
    // Comment request here
  }, []);

  return (
    <div
      className={`${className} min-h-[300px] flex flex-col post-item border rounded-lg py-4 shadow-md bg-white`}
    >
      {/* Author Info */}
      <div className="post-author flex items-center mb-4 gap-1 px-4">
        <Avatar src={author.avatar} alt={author.name} />
        <div>
          <h4 className="font-semibold">{author.name}</h4>
          <p className="text-[13px] text-gray-500">{time}</p>
        </div>
      </div>

      {/* Post Body */}
      <div className="post-body mb-4 flex-1">
        {body && (
          <Exapander className="px-4">
            <p className="text-gray-800 mb-2 mx-2.5">{body}</p>
          </Exapander>
        )}
        {media && (
          <div className="post-media mb-2">
            {media.map((medium) => (
              <div className="relative h-100 my-8" key={medium.url}>
                <Image
                  width="800"
                  height="400"
                  src={medium.url}
                  alt={medium.caption || "Post media"}
                  className="w-full h-full object-cover"
                />

                <p className="text-sm text-gray-500">{medium.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Viewing Stats */}
      <div className="px-6.5 flex justify-between items-center text-sm text-gray-600 mb-4">
        {likes.length ? (
          <div className="relative group">
            <p className="cursor-pointer">{likes.length} Likes</p>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white shadow-md p-2 rounded-lg">
              <p className="text-sm text-gray-700">8 people reacted</p>
            </div>
          </div>
        ) : (
          <p className="">Be the first to like</p>
        )}
        {comments.length ? (
          <div className="relative group">
            <p className="cursor-pointer">{comments.length} Comments</p>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white shadow-md p-2 rounded-lg">
              <p className="text-sm text-gray-700">8 people commented</p>
            </div>
          </div>
        ) : (
          <p>No comments yet</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-around space-x-4 px-4">
        <Reactions onReact={onReact} initialReaction={yourLike?.likeType}>
          <ThumbsUp />
          <span className="text-gray-700">Like</span>
        </Reactions>
        <button
          onClick={onComment}
          className="flex gap-1 cursor-pointer px-3 py-2 text-center rounded-lg text-gray-700"
        >
          <MessageSquare />
          <span>Comment</span>
        </button>
      </div>

      {/* Comment Form */}
      <div className="mt-4 flex gap-1 px-4">
        <Avatar src={author.avatar} alt={author.name} />
        <form className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-blue-500 border-blue-500 rounded-lg cursor-pointer border"
          >
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(PostItem);
