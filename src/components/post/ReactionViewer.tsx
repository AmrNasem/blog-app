import { likeTypes } from "@/generated/prisma";
import { FeedPostLike } from "@/lib/types";
import { normalizeBy1000 } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

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

const MAX_REACT_VIEWS = 10;

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
    <HoverCard openDelay={20} closeDelay={20}>
      <HoverCardTrigger>
        <div className="flex items-center gap-0.5 hover:underline">
          <p className="cursor-pointer">{normalizeBy1000(likes.length)}</p>
          <div className={`${className} flex items-center z-1`}>
            {sortedStats.slice(0, 3).map((stat, index) => (
              <Image
                key={stat}
                src={reactions[stat as likeTypes]}
                alt={stat.split("").shift()?.toUpperCase() + stat.slice(1)}
                style={{
                  transform: `translateX(-${index * 6}px)`,
                  zIndex: -index + 1,
                }}
                className={`block border-2 border-white rounded-full`}
                width={25}
                height={25}
              />
            ))}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="bottom">
        <ul className="space-y-1">
          {/* className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-white shadow-md p-2 rounded-lg" */}
          {likes.slice(0, MAX_REACT_VIEWS).map((like) => (
            <li
              key={like.id}
              className="flex items-center justify-between gap-2 text-sm text-gray-700"
            >
              <p className="mb-0 text-nowrap">{like.author.name}</p>
              <Image
                src={reactions[like.likeType]}
                alt={like.author.name}
                width="18"
                height="18"
                className="rounded-full min-w-[18px]"
              />
            </li>
          ))}
          {!!likes.slice(MAX_REACT_VIEWS).length && (
            <li className="text-black text-[13px] mt-3 text-center">
              {likes.slice(MAX_REACT_VIEWS).length} more people
            </li>
          )}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ReactionViewer;
