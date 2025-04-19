"use client";
import { PropsWithChildren, useState } from "react";

interface ExapanderProps extends PropsWithChildren {
  className?: string;
  maxHeight?: number;
  color?: string;
  btnTextColor?: string;
}
function Exapander({
  children,
  className = "",
  maxHeight = 96,
  color = "white",
  btnTextColor = "#4a5565",
}: ExapanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const expanderRef = (el: HTMLDivElement) => {
    if (el) {
      const exceedsMaxHeight = el.scrollHeight > maxHeight;

      if (exceedsMaxHeight) setIsOverflowing(true);
    }
  };

  return (
    <div
      ref={expanderRef}
      style={{ maxHeight: isExpanded ? "none" : maxHeight }}
      className={`${className} relative overflow-hidden`}
    >
      {children}
      {isOverflowing && (
        <button
          onClick={toggleExpand}
          className={`cursor-pointer ${
            isExpanded ? "" : "absolute"
          } w-full h-full bottom-0 start-0 flex flex-col`}
        >
          <span
            style={{
              backgroundImage: isExpanded
                ? ""
                : `linear-gradient(to top, ${color}, transparent)`,
            }}
            className={`flex-1 block`}
          ></span>
          <span
            style={{ backgroundColor: color, color: btnTextColor }}
            className={`py-1 text-[11px] underline font-bold`}
          >
            {isExpanded ? "Show less" : "Show more"}
          </span>
        </button>
      )}
    </div>
  );
}

export default Exapander;
