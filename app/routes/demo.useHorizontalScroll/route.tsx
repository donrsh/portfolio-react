import React from "react";
import useHorizontalScroll from "@lib-react/hooks/useHorizontalScroll";
import SourceCodeRefs from "@lib-react/components/SourceCodeRefs";
import { sourceCodeReferences } from "./metadata";

export default function Page() {
  const scrollRef = useHorizontalScroll();

  return (
    <>
      <div>
        <p>Use your mouse wheel to scroll horizontally</p>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "20px 0",
            maxWidth: "100%",
          }}
        >
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 auto",
                width: "200px",
                height: "200px",
                margin: "0 10px",
                backgroundColor: `hsl(${index * 20}, 70%, 60%)`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                color: "white",
              }}
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
      <hr />

      <SourceCodeRefs
        open
        data={sourceCodeReferences}
        style={{ marginBlock: 16 }}
      />
    </>
  );
}
