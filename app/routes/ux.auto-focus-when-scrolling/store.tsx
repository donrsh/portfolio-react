import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { create, StoreApi, UseBoundStore } from "zustand";

type ScrollingDirection = "upward" | "downward";
type ItemKey = string | number;

const itemDataKey = "data-auto-focus-item-when-scrolling";

type StoreFields = {
  scrollContainer: HTMLElement | null;
  scrollContainerRef: (el: HTMLElement) => void;
  scrollContainerObserver: IntersectionObserver | null;
  setScrollContainerObserver: (obeserver: IntersectionObserver | null) => void;
  scrollingDirection: ScrollingDirection | null;
  setScrollingDirection: (scrollingDirection?: ScrollingDirection) => void;
  itemElKeyMap: WeakMap<HTMLElement, ItemKey>;
  inViewItemEls: Set<HTMLElement>;
  inViewItemKeys: Set<ItemKey>;
  setInViewItemEls: (
    inViewEls: HTMLElement[],
    notInViewEls: HTMLElement[]
  ) => void;
  focusItemEl: HTMLElement | null;
  focusItemKey: ItemKey | null;
  setFocusItemEl: (itemEl: HTMLElement | null) => void;
  updateFocus: () => void;
  useItem: (key: ItemKey) => {
    ref: any;
    isFocus: boolean;
    focus: () => void;
  };
};

type Store = UseBoundStore<StoreApi<StoreFields>>;

const StoreContext = createContext<Store>(null as any);
const useStoreContext = () => useContext(StoreContext);

const store = create<StoreFields>((set, get, api) => {
  return {
    scrollContainer: null,
    scrollContainerRef(el) {
      set({ scrollContainer: el });
    },
    scrollContainerObserver: null,
    setScrollContainerObserver(obeserver) {
      set({ scrollContainerObserver: obeserver });
    },
    scrollingDirection: null,
    setScrollingDirection(scrollingDirection) {
      set({ scrollingDirection: scrollingDirection ?? null });
    },
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
    setFocusItemEl(focusEl) {
      const { itemElKeyMap } = get();

      set({
        focusItemEl: focusEl,
        focusItemKey: itemElKeyMap.get(focusEl!) ?? null,
      });
    },
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

      if (scrollingDirection === "upward") {
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
      const [
        focusItemEl,
        setFocusItemEl,
        scrollContainerObserver,
        itemElKeyMap,
      ] = useStoreContext()((x) => [
        x.focusItemEl,
        x.setFocusItemEl,
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
        setFocusItemEl(ref.current!);
      }, [setFocusItemEl]);

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
});

export const useStore = store;

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [
    scrollContainer,
    setScrollingDirection,
    setInViewItemEls,
    setScrollContainerObserver,
    updateFocus,
  ] = useStore((x) => [
    x.scrollContainer,
    x.setScrollingDirection,
    x.setInViewItemEls,
    x.setScrollContainerObserver,
    x.updateFocus,
  ]);

  useEffect(() => {
    if (!scrollContainer) return;

    const handler = (e: WheelEvent) => {
      const scrollingDirection = e.deltaY > 0 ? "downward" : "upward";
      setScrollingDirection(scrollingDirection);
      updateFocus();
    };

    scrollContainer.addEventListener("wheel", handler);
    return () => scrollContainer.removeEventListener("wheel", handler);
  }, [scrollContainer, setScrollingDirection, updateFocus]);

  useEffect(() => {
    if (!scrollContainer) {
      setScrollContainerObserver(null);
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
        // @ts-ignore
        // delay: 1000,
      }
    );

    setScrollContainerObserver(observer);

    return () => {
      observer.disconnect();
    };
  }, [scrollContainer, setInViewItemEls, setScrollContainerObserver]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
