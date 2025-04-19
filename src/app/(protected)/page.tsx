import InfoSide from "@/components/home/InfoSide";
import PostItem from "@/components/post/PostItem";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {[...Array(20).keys()].map((i) => {
            return (
              <PostItem
                key={i}
                author={{
                  avatar: "/app/user-avatar.png",
                  name: "Amr Naseem",
                }}
                time="Apr 16, 2025, 01:01 PM"
                body={{
                  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo earum sapiente exercitationem laboriosam beatae eligendi ipsam? Nostrum dolore dolorum laudantium doloribus nullaLorem ipsum dolor sit amet, consectetur adipisicing elit. Illo earum sapiente exercitationem laboriosam beatae eligendi ipsam? Nostrum dolore dolorum laudantium doloribus nulla",
                  // text: "Hello"
                }}
                stats={{ likes: 200, comments: 13 }}
                className="my-5"
              />
            );
          })}
        </div>
      </div>
      <InfoSide className="hidden md:block" />
    </div>
  );
}
