import { type RouterOutputs } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
dayjs.extend(relativeTime);
type PostWithUser = RouterOutputs["post"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div
      key={post.id}
      className="flex items-center gap-3 border-b border-slate-400 p-4"
    >
      <Link href={`/${author.username}`}>
        <Image
          src={author.profilePicture}
          alt={`@${author.username}`}
          height={60}
          width={60}
          className="rounded-full"
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/${author.username}`}>
            <span>@{author.username}</span>
          </Link>
          ·
          <Link href={`/post/${post.id}`}>
            <span>{dayjs(post.createdAt).fromNow()}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};

export default PostView;
