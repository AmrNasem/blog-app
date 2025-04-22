import InfoSide from "@/components/home/InfoSide";
import InfoSideSkeleton from "@/components/home/skeleton/InfoSideSkeleton";
import Feed from "@/components/home/Feed";
import { Suspense } from "react";
import FeedSkeleton from "@/components/home/skeleton/FeedSkeleton";

export default async function Home() {
  return (
    <div className="flex">
      <div className="flex-1 lg:px-4 py-8">
        <Suspense
          fallback={<FeedSkeleton />}
        >
          <Feed />
        </Suspense>
      </div>
      <Suspense fallback={<InfoSideSkeleton />}>
        <InfoSide className="hidden lg:block" />
      </Suspense>
    </div>
  );
}
