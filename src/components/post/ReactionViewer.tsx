import { likeTypes } from "@/generated/prisma";
import { FeedPostLike } from "@/lib/types";
import { normalizeBy1000 } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const reactions = {
  [likeTypes.like]: "/app/reactions/like.svg",
  [likeTypes.love]: "/app/reactions/love.svg",
  [likeTypes.support]: "/app/reactions/care.svg",
  [likeTypes.haha]: "/app/reactions/haha.svg",
  [likeTypes.wow]: "/app/reactions/wow.svg",
  [likeTypes.angry]: "/app/reactions/angry.svg",
  [likeTypes.sad]: "/app/reactions/sad.svg",
};

type statsType = {
  [key: string]: number;
};

function ReactionViewer({
  className,
  likes,
}: {
  className?: string;
  likes: FeedPostLike[];
}) {
  const stats = likes.reduce(
    (acc: statsType, like: FeedPostLike) => ({
      ...acc,
      [like.likeType]: (acc[like.likeType] || 0) + 1,
    }),
    {}
  );

  const sortedStats = Object.entries(stats)
    .sort(([, a], [, b]) => b - a)
    .map((stat) => stat[0]);

  return (
    <div className="relative group">
      <div className="flex items-center gap-0.5 hover:underline cursor-pointer">
        <p className="cursor-pointer">{normalizeBy1000(likes.length)}</p>
        <div className={`${className} flex items-center`}>
          {sortedStats.slice(0, 3).map((stat, index) => (
            <Image
              key={stat}
              src={reactions[stat as likeTypes]}
              alt={stat.split("").shift()?.toUpperCase() + stat.slice(1)}
              style={{ transform: `translateX(-${index * 5}px)` }}
              className={`block border-2 border-white rounded-full`}
              width={25}
              height={25}
            />
          ))}
        </div>
      </div>
      <ul className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white shadow-md p-2 rounded-lg">
        {likes.slice(0, 10).map((like) => (
          <li
            key={like.id}
            className="flex items-center gap-1 text-sm text-gray-700"
          >
            <p className="text-nowrap">{like.author.name}</p>
            <Image
              src={reactions[like.likeType]}
              alt={like.author.name}
              width="25"
              height="25"
              className="rounded-full"
            />
          </li>
        ))}
        {!!likes.slice(10).length && (
          <li>{likes.slice(10).length} more people</li>
        )}
      </ul>
    </div>
  );
}

export default ReactionViewer;
