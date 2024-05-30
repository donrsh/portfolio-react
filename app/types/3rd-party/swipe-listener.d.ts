declare module "swipe-listener" {
  // ref: https://github.com/umanghome/swipe-listener#api
  function SwipeListener(
    element: HTMLElement,
    options?: {
      minHorizontal?: number;
      minVertical?: number;
      deltaHorizontal?: number;
      deltaVertical?: number;
      preventScroll?: boolean;
      lockAxis?: boolean;
      touch?: boolean;
      mouse?: boolean;
    }
  ): void;

  export = SwipeListener;
}
