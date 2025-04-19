"use client";
import Image from "next/image";
import Exapander from "../reuseable/Exapander";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import Avatar from "../reuseable/Avatar";
import Reactions from "./Reactions";
import { reactionType } from "@/lib/types";
import { useCallback } from "react";

interface PostItemProps {
  author: {
    avatar: string;
    name: string;
  };
  className?: string;
  time: string;
  body: {
    text?: string;
    media?: [
      {
        src: string;
        alt: string;
        caption?: string;
      }
    ];
  };
  stats: {
    likes: number;
    comments: number;
  };
}

function PostItem({ author, className, time, body, stats }: PostItemProps) {
  const onReact = useCallback((reaction: reactionType | null) => {
    // React request here
    console.log(reaction);
  }, []);
  const onComment = useCallback(() => {
    // Comment request here
  }, []);

  return (
    <div
      className={`${className} min-h-[300px] flex flex-col post-item border rounded-lg p-4 shadow-md bg-white`}
    >
      {/* Author Info */}
      <div className="post-author flex items-center mb-4 gap-1">
        <Avatar src={author.avatar} alt={author.name} />
        <div>
          <h4 className="font-semibold">{author.name}</h4>
          <p className="text-[13px] text-gray-500">{time}</p>
        </div>
      </div>

      {/* Post Body */}
      <div className="post-body mb-4 flex-1">
        {body.text && (
          <Exapander>
            <p className="text-gray-800 mb-2 mx-2.5">{body.text}</p>
          </Exapander>
        )}
        {body.media && (
          <div className="post-media mb-2">
            {body.media.map((medium) => (
              <div className="relative" key={medium.src}>
                <Image
                  width="200"
                  height="200"
                  src={medium.src}
                  alt={medium.caption || "Post media"}
                  className="w-full rounded-lg"
                />

                <p className="text-sm text-gray-500">{medium.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Viewing Stats */}
      <div className="px-2.5 flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="relative group">
          <p className="cursor-pointer">{stats.likes} Likes</p>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white shadow-md p-2 rounded-lg">
            <p className="text-sm text-gray-700">8 people reacted</p>
          </div>
        </div>
        <div className="relative group">
          <p className="cursor-pointer">{stats.comments} Comments</p>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white shadow-md p-2 rounded-lg">
            <p className="text-sm text-gray-700">8 people commented</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-around space-x-4">
        <Reactions onReact={onReact}>
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
      <div className="mt-4 flex gap-1">
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

export default PostItem;
