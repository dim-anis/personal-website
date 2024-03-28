import { getCollection, type CollectionEntry } from "astro:content";
import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";

const fontRegular = fs.readFileSync(
  path.resolve("./public/fonts/Inter-Regular.ttf"),
);
const fontBold = fs.readFileSync(path.resolve("./public/fonts/Inter-Bold.ttf"));

export async function GET() {
  const fontSize = "100px";
  const bg = "white";

  const title = "Dmitry Anisov";
  const subtitle =
    "Personal blog about web development, developer productivity and more.";

  const html = {
    key: "46cf4c41-89fc-4435-9278-621c2dc845f8",
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
                  tw: "flex leading-[1.1] text-[80px] font-bold",
                  style: {
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    marginLeft: "-3px",
                    fontSize,
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex text-3xl font-bold tracking-tight py-5",
                  style: { fontFamily: "Inter", fontWeight: "normal" },
                  children: subtitle,
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
                  tw: "flex text-2xl",
                  style: { fontFamily: "Inter", fontWeight: "normal" },
                  children: "dmitryanisov.com",
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex text-2xl",
                  style: { fontFamily: "Inter", fontWeight: "normal" },
                  children: "github.com/dim-anis",
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
