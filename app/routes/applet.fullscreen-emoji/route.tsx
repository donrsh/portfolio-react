import useToggler from "@lib-react/hooks/useToggler";
import { createSub } from "@lib-react/utils/createSub";
import {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  FormEventHandler,
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

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const formEl = e.currentTarget;
      const formData = new FormData(e.currentTarget);
      const emoji = (formData.get("emoji") as string)?.trim();
      const emojiInput = formEl.querySelector(
        "input[name='emoji']"
      ) as HTMLInputElement;

      if (emoji && emojiInput) {
        emojiInput.blur();
        emojiInput.value = "";
        openDialog(emoji);
      }
    },
    [openDialog]
  );

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === "Enter") {
      e.currentTarget.form?.submit();
    }
  }, []);

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
        <form {...{ onSubmit }}>
          <label className="row-vcenter" style={{ gap: 8, width: "100%" }}>
            <span style={{ flex: 0 }}>Emoji</span>
            <input
              name="emoji"
              {...{ onKeyUp }}
              style={{ flex: 1, fontSize: 20 }}
            />
            <button type="submit" style={{ flex: 0, paddingBlock: 4 }}>
              Show!
            </button>
          </label>
        </form>
        <hr />
        <div className="shortcut-buttons">
          {getEmojiCache().map((x) => {
            return (
              <button
                data-emoji={x.emoji}
                key={x.emoji}
                onClick={onShortcutButtonClick}
                style={{ fontSize: 20 }}
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
