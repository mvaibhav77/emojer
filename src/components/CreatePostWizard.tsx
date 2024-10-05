import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "./Loading";

const CreatePostWizard = () => {
  const { user, isLoaded } = useUser();
  const [input, setInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handlePost = () => {
    // const newPost = api.post.create({ content: input });
    // console.log(newPost);
  };

  if (!isLoaded) return <LoadingPage />;

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.imageUrl}
        alt="Profile Image"
        width={60}
        height={60}
        className="rounded-full"
      />
      <input
        placeholder="Type some emojis!"
        type="text"
        // value={input}
        // onChange={handleInput}
        className="grow bg-transparent text-lg outline-none"
      />
      <button className="btn" onClick={handlePost}>
        Post
      </button>
    </div>
  );
};

export default CreatePostWizard;
