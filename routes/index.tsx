// @ts-ignore
import { Handlers } from "$fresh/server.ts"
// @ts-ignore
import { PageProps } from "$fresh/server.ts";
import { Post, getPosts} from "@/utils/posts.ts"

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts()
    console.log(posts)
    return ctx.render(posts)
  }
}

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main className="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 className="text-5xl font-bold">Blog</h1>
      <div className="mt-8">
        {posts.map((post) => <PostCard post={post} />)}
      </div>
    </main>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div className="py-8 border(t gray-200)">
      <a className="sm:col-span-2" href={`/blog/${post.slug}`}>
        <h3 className="text(3xl gray-900) font-bold">
          {post.title}
        </h3>
        <time className="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="mt-4 text-gray-900">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}