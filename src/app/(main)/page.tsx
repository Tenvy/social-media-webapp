import Image from "next/image";
import PostContainer from "./components/PostContainer";

export default function Home() {
  return (
    <main className="lg:w-[110vh] mx-auto py-10">
      <PostContainer/>
    </main>
  );
}
