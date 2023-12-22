import { type MarkdownHeading } from "astro";

export type Heading = MarkdownHeading & {
  subheadings: Heading[];
};

export function createToc(headings: MarkdownHeading[]) {
  const toc: Heading[] = [];
  const parentHeadings = new Map();

  headings.forEach((h) => {
    const heading: Heading = {
      ...h,
      subheadings: [],
    };
    parentHeadings.set(h.depth, heading);
    if (h.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });

  return toc;
}
