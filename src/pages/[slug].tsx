import { api } from "@/utils/api";
import Head from "next/head";
import { type GetStaticProps } from "next";
import Page from "@/components/Page";
import PostView from "@/components/PostView";
import Image from "next/image";
import { LoadingPage } from "@/components/Loading";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";

const ProfileFeed = ({ userId }: { userId: string }) => {
  const { data, isLoading } = api.post.getPostsByUserId.useQuery({
    userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function ProfilePage({ slug }: { slug: string }) {
  const { data } = api.profile.getUserByUsername.useQuery({
    username: slug,
  });

  if (!data) return <div>User not found</div>;

  console.log(data.id);

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <Page>
        <div className="relative h-40 bg-slate-600">
          <Image
            src={data.profilePicture}
            alt={`${data.username ?? "unknown"}'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? "unknown"
        }`}</div>
        <div className="w-full border-b border-slate-400" />
        <ProfileFeed userId={data.id} />
      </Page>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("Invalid slug");

  await ssg.profile.getUserByUsername.prefetch({ username: slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
