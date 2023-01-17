import client from "../client";
import Head from "next/head";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Container from "../components/Container";
import Image from "next/image";

export default function IndexPage({ posts }) {
  return (
    <>
      <Head>
        <title>
          FindFlix Articles to help guide you to the content you desire!
        </title>
      </Head>
      <Navbar />
      <Container>
        <header className="bg-darkgrey">
          <h1 className=" text-3xl font-poppins uppercase tracking-widest">
            Articles
          </h1>
        </header>
        <main className="bg-darkgrey">
          <h2 className="text-2xl font-poppins uppercase tracking-wide">
            Blog Posts
          </h2>
          {posts.length > 0 && (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Image
                    src={post.heroImage}
                    width={300}
                    height={300}
                    alt={post.metadata}
                    className="object-cover w-full h-20"
                  />
                  <h3 className="text-xl font-poppins ">{post.name}</h3>
                  <p>{post.metadata}</p>
                </li>
              ))}
            </ul>
          )}
        </main>
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "blogPost"]`);

  return {
    props: {
      posts,
    },
  };
}
