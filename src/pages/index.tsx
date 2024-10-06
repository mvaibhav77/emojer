import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import { api } from "@/utils/api";
import CreatePostWizard from "@/components/CreatePostWizard";
import { LoadingPage } from "@/components/Loading";
import PostView from "@/components/PostView";
import Page from "@/components/Page";

const Feed = () => {
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>No data</div>;

  return (
    <div className="flex flex-col p-0">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded } = useUser();

  if (!isLoaded) return <div />;

  api.post.getAll.useQuery();

  return (
    <Page>
      <div className="flex border-b border-slate-400 p-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <CreatePostWizard />
          {/* <SignOutButton /> */}
          {/* <UserButton /> */}
        </SignedIn>
      </div>
      <Feed />
    </Page>
  );
}
