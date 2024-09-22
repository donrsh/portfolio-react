import React, { useCallback, useMemo, useReducer, useState } from "react";
import { createSub } from "@lib-react/utils/createSub";
import {
  AutoFocusWhenScrollingProvider,
  ScrollerDirection,
  useAutoFocusWhenScrollingStore,
} from "./store";
import useHorizontalScroll from "@lib-react/hooks/useHorizontalScroll";
import { Label } from "~/lib/ui/label";
import { RadioGroup, RadioGroupItem } from "~/lib/ui/radio-group";
import { Typography } from "~/lib/ui/typogrphy";
import { Button } from "~/lib/ui/button";

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
      <div className="my-4">
        <Typography variant="large">Status</Typography>
        <div>
          <Typography variant="inlineCode">scrolling direction</Typography>:{" "}
          <code>{scrollingDirection}</code>
        </div>
        <div>
          <Typography variant="inlineCode">items in view</Typography>:{" "}
          {inViewItems.map((x) => x?.title).join(", ")}
        </div>
        <div>
          <Typography variant="inlineCode">focus item</Typography>:{" "}
          {focusItem?.title}
        </div>
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
        className={`border-b-2 border-gray-300 p-2 cursor-pointer w-[120px] shrink-0 text-center ${isFocus ? "opacity-100" : "opacity-40"}`}
        onClick={focus}
      >
        <p>
          <b>{title}</b>
        </p>
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
        className={`overflow-auto flex flex-none border-gray-300 ${scrollerDirection === "vertical" ? "border-r " : ""} `}
        style={{
          height: scrollerDirection === "vertical" ? "100%" : "fit-content",
          flexDirection: scrollerDirection === "horizontal" ? "row" : "column",
        }}
      >
        {items.map((x) => {
          return <Sub.Item key={x.id} {...x} />;
        })}
        <div
          className="sticky"
          style={{
            [scrollerDirection === "horizontal" ? "right" : "bottom"]: 0,
          }}
        >
          <Button onClick={addItem}>{`Add an item`}</Button>
        </div>
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
        <div className="p-4 overflow-auto">
          <Typography variant="large" className="-mb-3">
            {focusItem.title}
          </Typography>
          <Typography variant="p">{focusItem.text}</Typography>
        </div>
      )
    );
  },
});

export default function Page() {
  const [scrollerDirection, setScrollerDirection] =
    useState<ScrollerDirection>("vertical");

  return (
    <div className="px-4">
      <div className="flex gap-2 mb-2">
        <Label>Scroller Direction</Label>
        <RadioGroup className="flex gap-2" value={scrollerDirection}>
          {(["vertical", "horizontal"] as ScrollerDirection[]).map((x) => (
            <div
              key={x}
              className="flex items-center gap-2"
              onClick={() => setScrollerDirection(x)}
            >
              <RadioGroupItem key={x} value={x} />
              <Label>{x}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <hr />
      <AutoFocusWhenScrollingProvider
        key={scrollerDirection}
        {...{ scrollerDirection }}
      >
        <Sub.Status />
        <div
          className="w-full flex h-[300px] border border-gray-300"
          style={{
            flexDirection:
              scrollerDirection === "horizontal" ? "column" : "row",
          }}
        >
          <Sub.Items {...{ scrollerDirection }} />
          <Sub.FocusItem />
        </div>
      </AutoFocusWhenScrollingProvider>
    </div>
  );
}
