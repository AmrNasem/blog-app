import Image from "next/image";
import React, { memo, useCallback, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { reactionType } from "@/lib/types";
import { likeTypes } from "@/generated/prisma";

interface reactionsPropsType {
  onReact: (newReaction: likeTypes) => Promise<unknown>;
  onUnreact: () => Promise<unknown>;
  children?: React.ReactNode;
  initialReaction?: likeTypes;
}

const reactions: reactionType[] = [
  {
    src: "/app/reactions/like.svg",
    type: likeTypes.like,
    alt: "Like",
    color: "#0471e5",
  },
  {
    src: "/app/reactions/love.svg",
    type: likeTypes.love,
    alt: "Love",
    color: "#eb2647",
  },
  {
    src: "/app/reactions/care.svg",
    type: likeTypes.support,
    alt: "Support",
    color: "#f17b58",
  },
  {
    src: "/app/reactions/haha.svg",
    type: likeTypes.haha,
    alt: "Haha",
    color: "#f7c94c",
  },
  {
    src: "/app/reactions/wow.svg",
    type: likeTypes.wow,
    alt: "Wow",
    color: "#fbc737",
  },
  {
    src: "/app/reactions/sad.svg",
    type: likeTypes.sad,
    alt: "Sad",
    color: "#f7a441",
  },
  {
    src: "/app/reactions/angry.svg",
    type: likeTypes.angry,
    alt: "Angry",
    color: "#f17b58",
  },
];

function Reactions({
  onReact,
  onUnreact,
  children,
  initialReaction,
}: reactionsPropsType) {
  const [reaction, setReaction] = useState<reactionType | undefined>(
    reactions.find((r) => r.type === initialReaction)
  );

  const [isOpen, setOpen] = useState(false);

  const handleReact = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reaction?.type === e.currentTarget.id) return;
    setReaction(reactions.find((r) => r.type === e.currentTarget.id));
    const newReaction = await onReact(e.currentTarget.id as likeTypes);
    if (!newReaction) setReaction(reaction);

    setOpen(false);
  };

  const handleToggleLike = async () => {
    if (reaction) {
      setReaction(undefined);
      const newReaction = await onUnreact();
      if (!newReaction) setReaction(reaction);
    } else {
      setReaction(reactions.find((r) => r.type === likeTypes.like));
      const newReaction = await onReact(likeTypes.like);
      if (!newReaction) setReaction(undefined);
    }
  };

  return (
    <HoverCard
      onOpenChange={useCallback((newState: boolean) => setOpen(newState), [])}
      open={isOpen}
      openDelay={20}
      closeDelay={200}
    >
      <HoverCardTrigger>
        <button
          onClick={handleToggleLike}
          className={`flex gap-1 cursor-pointer px-3 py-2 text-center rounded-lg`}
        >
          {reaction ? (
            <div className="flex gap-1 items-center">
              <Image
                src={reaction.src}
                alt={reaction.alt}
                className="block"
                width={25}
                height={25}
              />
              <span style={{ color: reaction.color }}>{reaction.alt}</span>
            </div>
          ) : (
            children
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        style={{ borderRadius: "200px" }}
        arrowPadding={0}
        side="top"
        className="flex gap-2 justify-between p-[5px]"
      >
        {reactions.map((r) => (
          <button
            key={r.type}
            id={r.type}
            onClick={handleReact}
            title={r.alt}
            className={`cursor-pointer rounded-full hover:-translate-y-1.5 hover:scale-120 duration-150 ${
              reaction?.type === r.type
                ? "scale-120 bg-gray-300 border border-blue-300 p-px"
                : ""
            }`}
          >
            <Image
              src={r.src}
              alt={r.alt}
              className="block"
              width={30}
              height={30}
            />
          </button>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}

export default memo(Reactions);
