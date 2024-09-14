import { WithZustandSet } from "@lib-react/types/zustand";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export type ScrollerDirection = "vertical" | "horizontal";
type ScrollingDirection = "backward" | "forward";
type ItemKey = string | number;

const itemDataKey = "data-auto-focus-item-when-scrolling";

type StoreFields = WithZustandSet<{
  scrollContainer: HTMLElement | null;
  scrollContainerRef: (el: HTMLElement) => void;
  scrollContainerObserver: IntersectionObserver | null;
  scrollingDirection: ScrollingDirection | null;
  itemElKeyMap: WeakMap<HTMLElement, ItemKey>;
  inViewItemEls: Set<HTMLElement>;
  inViewItemKeys: Set<ItemKey>;
  setInViewItemEls: (
    inViewEls: HTMLElement[],
    notInViewEls: HTMLElement[]
  ) => void;
  focusItemEl: HTMLElement | null;
  focusItemKey: ItemKey | null;
  updateFocus: () => void;
  useItem: (key: ItemKey) => {
    ref: any;
    isFocus: boolean;
    focus: () => void;
  };
}>;

type Store = UseBoundStore<StoreApi<StoreFields>>;

const StoreContext = createContext<Store>(null as any);
const useStoreContext = () => useContext(StoreContext);
const useStore: Store = ((...args: any[]) =>
  useStoreContext()(
    // @ts-ignore
    ...args
  )) as any;

const createStore = (scrollerDirection: ScrollerDirection) => {
  const store = createWithEqualityFn<StoreFields>((set, get, api) => {
    return {
      set,
      scrollContainer: null,
      scrollContainerRef(el) {
        set({ scrollContainer: el });
      },
      scrollContainerObserver: null,
      scrollingDirection: null,
      itemElKeyMap: new WeakMap(),
      inViewItemEls: new Set(),
      inViewItemKeys: new Set(),
      setInViewItemEls(inViewEls, notInViewEls) {
        const { inViewItemEls: current, itemElKeyMap } = get();

        inViewEls.forEach((x) => current.add(x));
        notInViewEls.forEach((x) => current.delete(x));

        const nextInViewItemEls = new Set(current),
          nextInViewItemKeys = new Set(
            [...nextInViewItemEls].map((x) => itemElKeyMap.get(x) ?? null)
          );

        nextInViewItemKeys.delete(null);

        set({
          inViewItemEls: new Set(current),
          inViewItemKeys: nextInViewItemKeys as any,
        });
      },

      focusItemEl: null,
      focusItemKey: null,
      updateFocus() {
        const {
          inViewItemEls,
          scrollContainer,
          scrollingDirection,
          focusItemEl,
          itemElKeyMap,
        } = get();

        if (inViewItemEls.has(focusItemEl!)) return;

        let targets = [
          ...(scrollContainer?.querySelectorAll(`[${itemDataKey}]`) ?? []),
        ];

        if (scrollingDirection === "backward") {
          targets.reverse();
        }

        const nextFocusItemEl = (targets.find((x) =>
            inViewItemEls.has(x as any)
          ) ?? null) as any,
          nextFocusItemKey = itemElKeyMap.get(nextFocusItemEl) ?? null;

        set({ focusItemEl: nextFocusItemEl, focusItemKey: nextFocusItemKey });
      },

      useItem(key) {
        const ref = useRef<HTMLElement>();
        const [focusItemEl, set, scrollContainerObserver, itemElKeyMap] =
          useStoreContext()((x) => [
            x.focusItemEl,
            x.set,
            x.scrollContainerObserver,
            x.itemElKeyMap,
          ]);

        useEffect(() => {
          if (ref.current && scrollContainerObserver) {
            ref.current.setAttribute(itemDataKey, "");
            scrollContainerObserver?.observe(ref.current);
          }
        }, [scrollContainerObserver]);

        useEffect(() => {
          if (!["string", "number"].includes(typeof key)) {
            console.error(
              `[useItem] item key should be string or number. Please check.`
            );
            return;
          }

          if (ref.current) {
            itemElKeyMap.set(ref.current, key);
          }
        }, [key]);

        const isFocus = focusItemEl === ref.current;

        const focus = useCallback(() => {
          set({ focusItemEl: ref.current!, focusItemKey: key });
        }, [set]);

        return useMemo(
          () => ({
            ref,
            isFocus,
            focus,
          }),
          [ref, isFocus]
        );
      },
    };
  }, shallow);

  return store;
};

const Provider = ({
  children,
  scrollerDirection,
}: PropsWithChildren<{ scrollerDirection: ScrollerDirection }>) => {
  const [useStore] = useState(() => createStore(scrollerDirection));

  const [scrollContainer, setInViewItemEls, updateFocus, set] = useStore(
    (x) => [x.scrollContainer, x.setInViewItemEls, x.updateFocus, x.set]
  );

  useEffect(() => {
    if (!scrollContainer) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observers) => {
        setInViewItemEls(
          entries.filter((x) => x.isIntersecting).map((x) => x.target as any),
          entries.filter((x) => !x.isIntersecting).map((x) => x.target as any)
        );
      },
      {
        root: scrollContainer,
        threshold: 1,
      }
    );

    set({ scrollContainerObserver: observer });

    return () => {
      observer.disconnect();
    };
  }, [scrollContainer, setInViewItemEls, set]);

  useEffect(() => {
    if (!scrollContainer) return;

    const handler = (e: WheelEvent) => {
      const delta = scrollerDirection === "horizontal" ? -e.deltaX : e.deltaY;
      const scrollingDirection = delta >= 0 ? "forward" : "backward";

      set({ scrollingDirection });
      updateFocus();
    };

    scrollContainer.addEventListener("wheel", handler);
    return () => scrollContainer.removeEventListener("wheel", handler);
  }, [scrollContainer, set, updateFocus, scrollerDirection]);

  return (
    <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
  );
};

export {
  Provider as AutoFocusWhenScrollingProvider,
  useStore as useAutoFocusWhenScrollingStore,
};
