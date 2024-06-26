// @ts-ignore
import { extract } from "@std/front-matter/yaml";
// @ts-ignore
import { join } from "@std/path";

export interface Post {
    slug: string;
    title: string;
    publishedAt: Date;
    content: string;
    byline: string;
}

export async function getPosts(): Promise<Post[]> {
    const files = Deno.readDir("./content")
    const promises = []
    for await (const file of files) {
        const slug = file.name.replace(".md", "")
        promises.push(getPost(slug))
    }
    const posts = await Promise.all(promises) as Post[]
    posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    return posts
}

export async function getPost(slug: string): Promise<Post | null> {
    const text = await Deno.readTextFile(join("./content", `${slug}.md`))
    const { attrs, body } = extract(text)
    return {
        slug,
        title: attrs.title,
        publishedAt: new Date(attrs.published_at),
        content: body,
        byline: attrs.byline
    }
}