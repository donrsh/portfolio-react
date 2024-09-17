import RenderedTimes from "@lib-react/components/RenderedTimes/RenderedTimes";
import useAnimateOnUpdate from "@lib-react/hooks/useAnimateOnUpdate";
import useRerender from "@lib-react/hooks/useRerender";
import { useRef, useState } from "react";
import { Button } from "~/lib/ui/button";

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
      <div className="flex gap-2 mt-2">
        <Button onClick={update}>rerender</Button>
        <Button onClick={() => setN((x) => x)}>
          <code>setState(x ={">"} x)</code>
        </Button>
      </div>

      <div
        ref={stateDivRef}
        className="border border-gray-300 rounded-md p-2 mt-2"
      >
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
