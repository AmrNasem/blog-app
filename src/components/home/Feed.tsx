import { getFeed } from "@/actions/users";
import PostItem from "../post/PostItem";
import { verifySession } from "@/lib/session";
import { FeedPost } from "@/lib/types";
import { Post } from "@/generated/prisma";

// const media = [
//   // {
//   //   src: "/app/post/laptop.jpg",
//   //   alt: "Laptop",
//   //   caption: "This is a laptop",
//   // },
//   // {
//   //   src: "/app/post/bike.jpg",
//   //   alt: "Bike",
//   //   caption: "This is a bike",
//   // },
//   // {
//   //   src: "/app/post/camera.jpg",
//   //   alt: "Camera",
//   //   caption: "This is a camera",
//   // },
//   {
//     src: "/app/post/sign.jpg",
//     alt: "Sign",
//     caption: "This is a sign",
//   },
// ];

async function Feed() {
  const feed = await getFeed();
  const { userId } = await verifySession();

  return (
    <div className="max-w-4xl mx-auto">
      {feed.length === 0 && (
        <p className="bg-transparent text-blue-500 font-semibold border rounded-md p-4 text-xl text-center max-w-10/12 mx-auto my-4">
          Your feed is empty, may be follow some friends.
        </p>
      )}
      {feed.map((post: Post) => {
        return (
          <PostItem
            key={post.id}
            post={post as FeedPost}
            userId={userId as string}
            className="my-5"
          />
        );
      })}
    </div>
  );
}

export default Feed;
