import React, { useCallback, useMemo, useReducer } from "react";
import { createSub } from "@lib-react/utils/createSub";
import { StoreProvider, useStore } from "./store";

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

const Sub = createSub({
  Status: () => {
    const [scrollingDirection, inViewItemKeys, focusItemKey] = useStore((x) => [
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
          <b>scrolling direction</b>:{" "}
          {scrollingDirection === "downward"
            ? "⬇️"
            : scrollingDirection === "upward"
              ? "⬆️"
              : "null"}
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
    const { ref, isFocus, focus } = useStore((x) => x.useItem(id));

    return (
      <div
        ref={ref}
        style={{
          borderBottom: "1px solid gray",
          paddingInline: 8,
          cursor: "pointer",
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

  Items: () => {
    const scrollRef = useStore((x) => x.scrollContainerRef);
    const [, update] = useReducer((x) => x + 1, 0);

    const addItem = useCallback(() => {
      items[items.length] = createItem(items.length);
      update();
    }, []);

    return (
      <div
        ref={scrollRef as any}
        style={{
          background: "lightgray",
          height: "100%",
          overflow: "auto",
          flex: "0 0 150px",
        }}
      >
        {items.map((x) => {
          return <Sub.Item key={x.id} {...x} />;
        })}
        <div>
          <button onClick={addItem}>Add an item</button>
        </div>
        <div style={{ height: "100%" }} />
      </div>
    );
  },

  FocusItem: () => {
    const focusItemKey = useStore((x) => x.focusItemKey);

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
  return (
    <StoreProvider>
      <h1>Auto Focus when Scrolling</h1>
      <Sub.Status />
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: 20,
          height: 300,
          border: "1px solid gray",
        }}
      >
        <Sub.Items />
        <Sub.FocusItem />
      </div>
    </StoreProvider>
  );
}
