import useMounted from "@/hooks/use-mounted";
import { Heading } from "@/lib/toc";
import React from "react";
import classes from "./toc.module.css";

export default function TableOfContents({ toc }: { toc: Heading[] }) {
  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => flattenToc(item))
            .flat()
            .filter(Boolean)
        : [],
    [toc],
  );

  if (!itemIds) {
    return null;
  }

  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  return (
    mounted && (
      <div className={`${classes.tocContainer}`}>
        <p className={`${classes.tocTitle}`}>In this article</p>
        <Tree tree={toc} activeHeading={activeHeading} />
      </div>
    )
  );
}

function flattenToc(item: Heading) {
  if (!item) {
    return [];
  }

  const result = [item.slug];

  if (item.subheadings) {
    result.push(...item.subheadings.flatMap((subitem) => flattenToc(subitem)));
  }

  return result;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

export function Tree({
  tree,
  activeHeading,
}: {
  tree: Heading[];
  activeHeading: string;
}) {
  return tree.length ? (
    <ul className={`${classes.tocUl}`}>
      {tree.map((item, index) => {
        return (
          <li key={index} className={`${classes.tocLi}`}>
            <a
              href={`#${item.slug}`}
              className={`${
                item.slug === activeHeading
                  ? classes.tocAnchorActive
                  : classes.tocAnchor
              }`}
            >
              {item.text}
            </a>
            {item.subheadings.length ? (
              <Tree tree={item.subheadings} activeHeading={activeHeading} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
