import { getCollection, type CollectionEntry } from "astro:content";
import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

const fontRegular = fs.readFileSync(
  path.resolve("./public/fonts/Inter-Regular.ttf"),
);
const fontBold = fs.readFileSync(path.resolve("./public/fonts/Inter-Bold.ttf"));

export async function GET({ props }: Props) {
  const { post } = props;

  const fontSize = post.data.title.length > 100 ? "70px" : "100px";
  const bg = "white";
  const type = "blog post";

  const html = {
    key: "37059c9f-6d94-4d4f-a396-92b16b11f394",
    type: "div",
    props: {
      tw: "flex relative flex-col p-12 w-full h-full items-start",
      style: {
        color: bg,
        background: "linear-gradient(90deg, #000 0%, #111 100%)",
      },
      children: [
        {
          type: "div",
          props: {
            tw: "flex flex-col flex-1 py-10",
            children: [
              {
                type: "div",
                props: {
                  tw: "flex text-xl uppercase font-bold tracking-tight",
                  style: { fontFamily: "Inter", fontWeight: "normal" },
                  children: type,
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex leading-[1.1] text-[80px] font-bold",
                  style: {
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    marginLeft: "-3px",
                    fontSize,
                  },
                  children: post.data.title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "flex items-center w-full justify-between",
            children: [
              {
                type: "div",
                props: {
                  tw: "flex text-xl",
                  style: { fontFamily: "Inter", fontWeight: "normal" },
                  children: "dmitryanisov.com",
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: fontRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: fontBold,
        weight: 700,
        style: "normal",
      },
    ],
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection("blog");
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
