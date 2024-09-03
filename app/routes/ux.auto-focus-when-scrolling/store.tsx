import {
  createContext,
  PropsWithChildren,
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
  getFocusEl: () => HTMLElement | null;
  useTarget: () => {
    ref: any;
    isFocus: boolean;
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
    getFocusEl() {
      const { inViewEls, scrollEl, scrollingDirection } = get();
      let targets = [
        ...(scrollEl?.querySelectorAll(`[${targetDataKey}='true']`) ?? []),
      ];

      if (scrollingDirection === "upward") {
        targets.reverse();
      }

      return (targets.find((x) => inViewEls.has(x as any)) ?? null) as any;
    },

    useTarget() {
      const ref = useRef<HTMLElement>();
      const [getFocusEl, scrollElObserver] = useStoreContext()((x) => [
        x.getFocusEl,
        x.scrollElObserver,
      ]);

      useEffect(() => {
        if (ref.current && scrollElObserver) {
          console.log("useTarget", ref.current, scrollElObserver);
          ref.current.setAttribute(targetDataKey, "true");
          scrollElObserver?.observe(ref.current);
        }
      }, [scrollElObserver]);

      const isFocus = getFocusEl() === ref.current;

      return useMemo(
        () => ({
          ref,
          isFocus,
        }),
        [ref, isFocus]
      );
    },
  };
});

export const useStore = store;

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [scrollEl, setScrollingDirection, setInViewEls, setScrollElObserver] =
    useStore((x) => [
      x.scrollEl,
      x.setScrollingDirection,
      x.setInViewEls,
      x.setScrollElObserver,
    ]);

  useEffect(() => {
    if (!scrollEl) return;

    scrollEl.addEventListener("wheel", (e) => {
      setScrollingDirection(e.deltaY > 0 ? "downward" : "upward");
    });
  }, [scrollEl, setScrollingDirection]);

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
        delay: 1000,
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
