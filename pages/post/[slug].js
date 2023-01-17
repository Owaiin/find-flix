// import { useRouter } from "next/router";
import client from "../../client";
import { PortableText } from "@portabletext/react";

const Post = ({ posts }) => {
  // const router = useRouter();

  return (
    <main>
      <h1>{posts?.slug?.current}</h1>
      <h2>{posts ? posts.name : ""}</h2>
      <PortableText value={posts.article} />

      <article>{/* <PortableText value={[post.article]} /> */}</article>
    </main>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn''t return undefined!
  const { slug = "" } = context.params;
  const posts = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug }
  );

  return {
    props: {
      posts,
    },
  };
}

export default Post;
