import React from "react";
import useHorizontalScroll from "@lib-react/hooks/useHorizontalScroll";
import SourceCodeRefs from "~/components/ui/SourceCodeRefs";
import { sourceCodeReferences } from "./metadata";

export default function Page() {
  const scrollRef = useHorizontalScroll();

  return (
    <>
      <div>
        <p>Scroll vertically and observe the container scrolls horizontally.</p>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto whitespace-nowrap py-4 max-w-full"
        >
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="flex-none w-40 h-40 m-2 flex items-center justify-center text-white text-2xl first:ml-0 last:mr-0"
              style={{
                backgroundColor: `hsl(${index * 20}, 70%, 60%)`,
              }}
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
      <hr />

      <SourceCodeRefs open data={sourceCodeReferences} />
    </>
  );
}
