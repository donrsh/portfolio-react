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

export const targetDataKey = "data-observer-target";

type StoreFields = {
  scrollContainer: HTMLElement | null;
  scrollContainerRef: (el: HTMLElement) => void;
  scrollContainerObserver: IntersectionObserver | null;
  setScrollContainerObserver: (obeserver: IntersectionObserver | null) => void;
  scrollingDirection: ScrollingDirection | null;
  setScrollingDirection: (scrollingDirection?: ScrollingDirection) => void;
  inViewItemEls: Set<HTMLElement>;
  setInViewItemEls: (
    inViewEls: HTMLElement[],
    notInViewEls: HTMLElement[]
  ) => void;
  focusItemEl: HTMLElement | null;
  setFocusItemEl: (itemEl: HTMLElement | null) => void;
  updateFocus: () => void;
  useItem: () => {
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
    inViewItemEls: new Set(),
    setInViewItemEls(inViewEls, notInViewEls) {
      const { inViewItemEls: current } = get();

      inViewEls.forEach((x) => current.add(x));
      notInViewEls.forEach((x) => current.delete(x));

      set({ inViewItemEls: new Set(current) });
    },

    focusItemEl: null,
    setFocusItemEl(focusEl) {
      set({ focusItemEl: focusEl });
    },
    updateFocus() {
      const {
        inViewItemEls: inViewItemEls,
        scrollContainer: scrollContainer,
        scrollingDirection,
        focusItemEl: focusItemEl,
      } = get();

      if (inViewItemEls.has(focusItemEl!)) return;

      let targets = [
        ...(scrollContainer?.querySelectorAll(`[${targetDataKey}='true']`) ??
          []),
      ];

      if (scrollingDirection === "upward") {
        targets.reverse();
      }

      const nextFocusItemEl = (targets.find((x) =>
        inViewItemEls.has(x as any)
      ) ?? null) as any;
      set({ focusItemEl: nextFocusItemEl });
    },

    useItem() {
      const ref = useRef<HTMLElement>();
      const [focusItemEl, setFocusItemEl, scrollContainerObserver] =
        useStoreContext()((x) => [
          x.focusItemEl,
          x.setFocusItemEl,
          x.scrollContainerObserver,
        ]);

      useEffect(() => {
        if (ref.current && scrollContainerObserver) {
          ref.current.setAttribute(targetDataKey, "true");
          scrollContainerObserver?.observe(ref.current);
        }
      }, [scrollContainerObserver]);

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
