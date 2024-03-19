import useMounted from "@/hooks/use-mounted";
import { Heading } from "@/lib/toc";
import React from "react";

export default function TableOfContents({ toc }: { toc: Heading[] }) {
  const itemIds = React.useMemo(
    () => (toc ? toc.flatMap((item) => flattenToc(item)).filter(Boolean) : []),
    [toc],
  );

  if (!itemIds) {
    return null;
  }

  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  return (
    mounted && (
      <div className="sticky top-8 text-sm">
        <p className="m-0 font-bold pl-4">In this article</p>
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
    <ul className="pl-4">
      {tree.map((item, index) => {
        return (
          <li key={index} className="mt-0 pt-2">
            <a
              href={`#${item.slug}`}
              className={`${
                item.slug === activeHeading
                  ? "text-foreground"
                  : "text-muted-foreground"
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
