import { api } from "@/utils/api";
import Head from "next/head";
import { type GetStaticProps } from "next";
import Page from "@/components/Page";

import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import PostView from "@/components/PostView";

export default function SinglePostPage({ id }: { id: string }) {
  const { data } = api.post.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <Page>
        <PostView {...data} />
      </Page>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.post.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
