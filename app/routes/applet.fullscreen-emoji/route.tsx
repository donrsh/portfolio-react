import useToggler from "@lib-react/hooks/useToggler";
import { createSub } from "@lib-react/utils/createSub";
import {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";
import SwipeListener from "swipe-listener";
import { getEmojiCache, cacheEmojiUse } from "./cache";
import "./styles.css";
import emojiFavicon from "./emoji-favicon.png";

const Sub = createSub({
  Dialog: ({ emoji, onClose }: { emoji: string; onClose: () => void }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const root = ref.current;
      if (!root) return;

      SwipeListener(root);
      root.addEventListener("swipe", onClose);
      return () => root.removeEventListener("swipe", onClose);
    }, [onClose]);

    return (
      <div ref={ref} className="dialog center" style={{}}>
        <div className="emoji">{emoji}</div>
      </div>
    );
  },
});

export default function Page() {
  const {
    isOpen: isDialogOpen,
    openWithData: rawOpenDialog,
    close: closeDialog,
    data: emoji,
  } = useToggler<string>();

  const openDialog = useCallback(
    (emoji: string) => {
      rawOpenDialog(emoji);
      cacheEmojiUse(emoji);
    },
    [rawOpenDialog]
  );

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = (e.currentTarget.value ?? "").trim();

      if (!value) return;

      if (e.key === "Enter") {
        e.currentTarget.value = "";
        openDialog(value);
      }
    },
    [openDialog]
  );

  const onShortcutButtonClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        const emoji = e.currentTarget.dataset["emoji"];
        if (emoji) {
          openDialog(emoji);
        }
      },
      [openDialog]
    );

  useEffect(() => {
    const closeDialogOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDialog();
      }
    };

    window.addEventListener("keydown", closeDialogOnEscape);

    return () => window.removeEventListener("keydown", closeDialogOnEscape);
  }, [closeDialog]);

  // Change icon dynamically
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = emojiFavicon;
  }, []);

  return (
    <>
      {isDialogOpen && <Sub.Dialog emoji={emoji!} onClose={closeDialog} />}
      <div>
        <label>
          <span>Choose an emoji and hit enter</span>
          <br />
          <input type="text" onKeyUp={onKeyUp} />
        </label>
        <hr />
        <div className="shortcut-buttons">
          {getEmojiCache().map((x) => {
            return (
              <button
                data-emoji={x.emoji}
                key={x.emoji}
                onClick={onShortcutButtonClick}
              >
                {x.emoji}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
