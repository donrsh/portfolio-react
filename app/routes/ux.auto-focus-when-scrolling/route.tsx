import React, { useCallback, useMemo, useReducer, useState } from "react";
import { createSub } from "@lib-react/utils/createSub";
import {
  AutoFocusWhenScrollingProvider,
  ScrollerDirection,
  useAutoFocusWhenScrollingStore,
} from "./store";
import useHorizontalScroll from "@lib-react/hooks/useHorizontalScroll";

type Item = {
  id: any;
  title: string;
  text: string;
};

const createItem = (idx: number) => ({
  id: idx as any,
  title: `Item ${idx + 1}`,
  text: [
    idx % 4 >= 0 && "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    idx % 4 >= 1 && "Minus quidem,",
    idx % 4 >= 2 &&
      "reprehenderit aliquid iure esse quibusdam perspiciatis modi doloremque nobis at voluptatem repellat dignissimos nihil enim aspernatur eos?",
    idx % 4 >= 3 && "Fuga, accusantium incidunt.",
  ]
    .filter(Boolean)
    .join(" "),
});

let items = new Array(20).fill(null).map((_, idx) => createItem(idx));
const getItemByKey = (key: any) => items.find((x) => x.id === key) ?? null;

const useMergeRefs = (...refs: any[]) => {
  return useMemo(() => {
    return (el: HTMLElement) => {
      refs.forEach((x) => {
        if (typeof x === "function") {
          x(el);
        }

        if (typeof x === "object" && x !== null) {
          x.current = el;
        }
      });
    };
  }, [refs]);
};

const Sub = createSub({
  Status: () => {
    const [scrollingDirection, inViewItemKeys, focusItemKey] =
      useAutoFocusWhenScrollingStore((x) => [
        x.scrollingDirection,
        x.inViewItemKeys,
        x.focusItemKey,
      ]);

    const inViewItems = useMemo(() => {
      return inViewItemKeys ? [...inViewItemKeys].map(getItemByKey) : [];
    }, [inViewItemKeys]);

    const focusItem = useMemo(() => {
      return getItemByKey(focusItemKey);
    }, [focusItemKey]);

    return (
      <div style={{ marginBottom: 20 }}>
        <code>
          <b>scrolling direction</b>: <code>{scrollingDirection}</code>
        </code>
        <br />
        <code>
          <b>items in view</b>: {inViewItems.map((x) => x?.title).join(", ")}
        </code>
        <br />
        <code>
          <b>focus item</b>: {focusItem?.title}
        </code>
      </div>
    );
  },

  Item: ({ id, title, text }: Item) => {
    const { ref, isFocus, focus } = useAutoFocusWhenScrollingStore((x) =>
      x.useItem(id)
    );

    return (
      <div
        ref={ref}
        style={{
          borderBottom: "1px solid gray",
          paddingInline: 8,
          cursor: "pointer",
          width: "100px",
          flexShrink: 0,
        }}
        onClick={focus}
      >
        <div style={{ opacity: isFocus ? 1 : 0.4 }}>
          <p>
            <b>{title}</b>
          </p>
        </div>
      </div>
    );
  },

  Items: ({ scrollerDirection }: { scrollerDirection: ScrollerDirection }) => {
    const scrollContainerRef = useAutoFocusWhenScrollingStore(
      (x) => x.scrollContainerRef
    );
    const horizontalScrollRef = useHorizontalScroll();
    const [, update] = useReducer((x) => x + 1, 0);

    const ref = useMergeRefs(
      scrollContainerRef,
      scrollerDirection === "horizontal" ? horizontalScrollRef : null
    );

    const addItem = useCallback(() => {
      items[items.length] = createItem(items.length);
      update();
    }, []);

    return (
      <div
        ref={ref as any}
        style={{
          height: scrollerDirection === "vertical" ? "100%" : "fit-content",
          background: "lightgray",
          overflow: "auto",
          flex: "none",
          display: "flex",
          flexDirection: scrollerDirection === "horizontal" ? "row" : "column",
        }}
      >
        {items.map((x) => {
          return <Sub.Item key={x.id} {...x} />;
        })}
        <div
          style={{
            position: "sticky",
            [scrollerDirection === "horizontal" ? "right" : "bottom"]: 0,
          }}
        >
          <button
            style={{ width: 100 }}
            onClick={addItem}
          >{`Add an item`}</button>
        </div>
        <div style={{ height: "100%" }} />
      </div>
    );
  },

  FocusItem: () => {
    const focusItemKey = useAutoFocusWhenScrollingStore((x) => x.focusItemKey);

    const focusItem = useMemo(() => {
      return getItemByKey(focusItemKey);
    }, [focusItemKey]);

    return (
      focusItem && (
        <div>
          <div>
            <p>
              <b>{focusItem.title}</b>
            </p>
            <p>{focusItem.text}</p>
          </div>
        </div>
      )
    );
  },
});

export default function Page() {
  const [scrollerDirection, setScrollerDirection] =
    useState<ScrollerDirection>("vertical");

  return (
    <>
      <h1>Auto Focus when Scrolling</h1>
      <div>
        <b>Scroller Direction</b>
        {(["vertical", "horizontal"] as ScrollerDirection[]).map((x) => (
          <label key={x}>
            <input
              type="radio"
              name="scrollerDirection"
              value={x}
              onChange={() => setScrollerDirection(x)}
              checked={scrollerDirection === x}
            />
            {x}
          </label>
        ))}
      </div>
      <hr />
      <AutoFocusWhenScrollingProvider
        key={scrollerDirection}
        {...{ scrollerDirection }}
      >
        <Sub.Status />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection:
              scrollerDirection === "horizontal" ? "column" : "row",
            gap: 20,
            height: 300,
            border: "1px solid gray",
          }}
        >
          <Sub.Items {...{ scrollerDirection }} />
          <Sub.FocusItem />
        </div>
      </AutoFocusWhenScrollingProvider>
    </>
  );
}
