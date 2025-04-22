import { getFeed } from "@/actions/users";
import PostItem from "../post/PostItem";

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
  console.log(feed);

  console.log(feed[0]?.media)

  return (
    <div className="max-w-4xl mx-auto">
      {feed.map((post) => {
        return (
          <PostItem
            key={post.id}
            id={post.id}
            author={{
              avatar: post.author.profile?.avatar || "/app/user-avatar.png",
              name: post.author.name,
            }}
            time={new Date(post.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
            body={post.body || ""}
            // media={post.media as mediaType}
            yourLike={post.yourLike}
            likes={post.likes}
            comments={post.comments}
            className="my-5"
          />
        );
      })}
    </div>
  );
}

export default Feed;
