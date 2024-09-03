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
  scrollEl: HTMLElement | null;
  scrollRef: (el: HTMLElement) => void;
  scrollElObserver: IntersectionObserver | null;
  setScrollElObserver: (obeserver: IntersectionObserver | null) => void;
  scrollingDirection: ScrollingDirection | null;
  setScrollingDirection: (scrollingDirection?: ScrollingDirection) => void;
  inViewEls: Set<HTMLElement>;
  setInViewEls: (inViewEls: HTMLElement[], notInViewEls: HTMLElement[]) => void;
  focusEl: HTMLElement | null;
  setFocusEl: (focusEl: HTMLElement | null) => void;
  updateFocusEl: () => void;
  useTarget: () => {
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
    scrollEl: null,
    scrollRef(el) {
      set({ scrollEl: el });
    },
    scrollElObserver: null,
    setScrollElObserver(obeserver) {
      set({ scrollElObserver: obeserver });
    },
    scrollingDirection: null,
    setScrollingDirection(scrollingDirection) {
      set({ scrollingDirection: scrollingDirection ?? null });
    },
    inViewEls: new Set(),
    setInViewEls(inViewEls, notInViewEls) {
      const { inViewEls: currentInViewEls } = get();

      inViewEls.forEach((x) => currentInViewEls.add(x));
      notInViewEls.forEach((x) => currentInViewEls.delete(x));

      set({ inViewEls: new Set(currentInViewEls) });
    },

    focusEl: null,
    setFocusEl(focusEl) {
      set({ focusEl });
    },
    updateFocusEl() {
      const { inViewEls, scrollEl, scrollingDirection, focusEl } = get();

      if (inViewEls.has(focusEl!)) return;

      let targets = [
        ...(scrollEl?.querySelectorAll(`[${targetDataKey}='true']`) ?? []),
      ];

      if (scrollingDirection === "upward") {
        targets.reverse();
      }

      const nextFocusEl = (targets.find((x) => inViewEls.has(x as any)) ??
        null) as any;
      set({ focusEl: nextFocusEl });
    },

    useTarget() {
      const ref = useRef<HTMLElement>();
      const [focusEl, setFocusEl, scrollElObserver] = useStoreContext()((x) => [
        x.focusEl,
        x.setFocusEl,
        x.scrollElObserver,
      ]);

      useEffect(() => {
        if (ref.current && scrollElObserver) {
          console.log("useTarget", ref.current, scrollElObserver);
          ref.current.setAttribute(targetDataKey, "true");
          scrollElObserver?.observe(ref.current);
        }
      }, [scrollElObserver]);

      const isFocus = focusEl === ref.current;

      const focus = useCallback(() => {
        setFocusEl(ref.current!);
      }, [setFocusEl]);

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
    scrollEl,
    setScrollingDirection,
    setInViewEls,
    setScrollElObserver,
    updateFocusEl,
  ] = useStore((x) => [
    x.scrollEl,
    x.setScrollingDirection,
    x.setInViewEls,
    x.setScrollElObserver,
    x.updateFocusEl,
  ]);

  useEffect(() => {
    if (!scrollEl) return;

    const handler = (e: WheelEvent) => {
      const scrollingDirection = e.deltaY > 0 ? "downward" : "upward";
      setScrollingDirection(scrollingDirection);
      updateFocusEl();
    };

    scrollEl.addEventListener("wheel", handler);
    return () => scrollEl.removeEventListener("wheel", handler);
  }, [scrollEl, setScrollingDirection, updateFocusEl]);

  useEffect(() => {
    if (!scrollEl) {
      setScrollElObserver(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observers) => {
        setInViewEls(
          entries.filter((x) => x.isIntersecting).map((x) => x.target as any),
          entries.filter((x) => !x.isIntersecting).map((x) => x.target as any)
        );
      },
      {
        root: scrollEl,
        threshold: 1,
        // @ts-ignore
        // delay: 1000,
      }
    );

    setScrollElObserver(observer);

    return () => {
      observer.disconnect();
    };
  }, [scrollEl, setInViewEls, setScrollElObserver]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
