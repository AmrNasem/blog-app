import Image from "next/image";
import React, { useCallback, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { reactionType } from "@/lib/types";

const reactions: reactionType[] = [
  {
    src: "/app/reactions/like.svg",
    id: "like",
    alt: "Like",
    color: "#0471e5",
  },
  {
    src: "/app/reactions/love.svg",
    id: "love",
    alt: "Love",
    color: "#eb2647",
  },
  {
    src: "/app/reactions/care.svg",
    id: "support",
    alt: "Support",
    color: "#f17b58",
  },
  {
    src: "/app/reactions/haha.svg",
    id: "haha",
    alt: "Haha",
    color: "#f7c94c",
  },
  {
    src: "/app/reactions/wow.svg",
    id: "wow",
    alt: "Wow",
    color: "#fbc737",
  },
  {
    src: "/app/reactions/sad.svg",
    id: "sad",
    alt: "Sad",
    color: "#f7a441",
  },
  {
    src: "/app/reactions/angry.svg",
    id: "angry",
    alt: "Angry",
    color: "#f17b58",
  },
];

function Reactions({
  onReact,
  children,
}: {
  onReact: (newReaction: reactionType | null) => void;
  children?: React.ReactNode;
}) {
  const [reaction, setReaction] = useState<reactionType | null>(null);
  const [isOpen, setOpen] = useState(false);

  // Function to handle reaction button click
  const handleReaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newReaction =
      reactions.find((r) => r.id === e.currentTarget.id) ||
      (reaction ? null : reactions[0]);

    setReaction(newReaction);
    onReact(newReaction);
    setOpen(false);
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
          onClick={handleReaction}
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
            key={r.id}
            id={r.id}
            onClick={handleReaction}
            title={r.alt}
            className={`cursor-pointer rounded-full hover:-translate-y-1.5 hover:scale-120 duration-150 ${
              reaction?.id === r.id
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

export default Reactions;
