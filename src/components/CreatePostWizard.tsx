import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "./Loading";
import { api } from "@/utils/api";

const CreatePostWizard = () => {
  const { user, isLoaded } = useUser();

  const ctx = api.useUtils();

  const { mutate, isPending: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
  });

  const [input, setInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handlePost = () => {
    const post = mutate({ content: input });
    console.log(post);
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
        value={input}
        onChange={handleInput}
        disabled={isPosting}
        className="grow bg-transparent text-lg outline-none"
      />
      <button className="btn" onClick={handlePost}>
        Post
      </button>
    </div>
  );
};

export default CreatePostWizard;
