import useToggler from "@lib-react/hooks/useToggler";
import { createSub } from "@lib-react/utils/createSub";
import {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useCallback,
  useEffect,
} from "react";
import { getEmojiCache, cacheEmojiUse } from "./cache";
import "./styles.css";

const Sub = createSub({
  Dialog: ({ emoji }: { emoji: string; onClose: () => void }) => {
    return (
      <div className="dialog center" style={{}}>
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
