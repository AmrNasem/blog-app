import React from "react";
import { PostItemSkeleton } from "../../post/skeleton/PostItemSkeleton";

function FeedSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {[...Array(3).keys()].map((i) => (
        <PostItemSkeleton key={i} />
      ))}
    </div>
  );
}

export default FeedSkeleton;
