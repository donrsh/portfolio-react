import RenderedTimes from "@lib-react/components/RenderedTimes/RenderedTimes";
import useAnimateOnUpdate from "@lib-react/hooks/useAnimateOnUpdate";
import useRerender from "@lib-react/hooks/useRerender";
import { useRef, useState } from "react";

export default function Page() {
  const update = useRerender();
  const [, setN] = useState({});
  const [, stateDivRef] = useState<HTMLDivElement | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  useAnimateOnUpdate(rootRef.current, "outline-blink");

  return (
    <div ref={rootRef}>
      <div>
        #rendered = <RenderedTimes />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "self-start",
          gap: 4,
        }}
      >
        <button onClick={update}>rerender</button>
        <button onClick={() => setN((x) => x)}>
          <code>setState(x ={">"} x)</code>
        </button>
      </div>

      <div ref={stateDivRef} style={{ border: "1px solid gray", marginTop: 8 }}>
        This div accept <code>stateDivRef</code> as ref, which is actually from{" "}
        <code>useState</code>.
        <br />
        So every rerender should trigger a <code>setState</code> under the hood.
        <br />
        Does it cause additional rerender (except for the first render)?
      </div>
    </div>
  );
}
