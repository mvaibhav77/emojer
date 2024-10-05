import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loading, LoadingPage } from "./Loading";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

const CreatePostWizard = () => {
  const { user, isLoaded } = useUser();

  const ctx = api.useUtils();

  const { mutate, isPending: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },

    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(e.message || "Failed to post! Please try again later");
      }
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlePost();
          }
        }}
        disabled={isPosting}
        className="grow bg-transparent text-lg outline-none"
      />
      {input !== "" && !isPosting && (
        <button className="btn" onClick={handlePost}>
          Post
        </button>
      )}

      {isPosting && (
        <div className="justify-center- flex items-center">
          <Loading size={20} />
        </div>
      )}
    </div>
  );
};

export default CreatePostWizard;
