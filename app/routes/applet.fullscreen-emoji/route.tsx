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
import emojiFavicon from "./emoji-favicon.png";
import whyYouNeedThisApp_Image from "./images/Why-you-need-an-app-for-full-screen-emoji.png";
import { Input } from "~/lib/ui/input";
import { Button } from "~/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/lib/ui/dialog";

const Sub = createSub({
  WhatIsThisAppFor: () => {
    const dialog = useToggler();

    const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
      (e) => {
        e.preventDefault();

        dialog.open();
      },
      [dialog]
    );

    return (
      <Dialog
        open={dialog.isOpen}
        onOpenChange={(open) => {
          !open && dialog.close();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="link" onClick={onClick as any} className="mb-4">
            What is this for?
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <div className="mt-4">
            <img
              src={whyYouNeedThisApp_Image}
              alt=""
              style={{ width: "100%", maxWidth: 500 }}
            />
            <div className="flex items-center gap-2">
              <Button variant="link" asChild>
                <a
                  href="https://www.youtube.com/watch?v=TfNnpsYATbQ"
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1 }}
                >
                  TBBT S10E14: The Emotion Detection Automation
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },

  EmojiDialog: ({ emoji, onClose }: { emoji: string; onClose: () => void }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const root = ref.current;
      if (!root) return;

      SwipeListener(root);
      root.addEventListener("swipe", onClose);
      return () => root.removeEventListener("swipe", onClose);
    }, [onClose]);

    return (
      <div
        ref={ref}
        className="z-1 fixed top-0 left-0 w-screen h-screen flex items-center justify-center
        bg-white dark:bg-black"
      >
        <div className="text-[256px]">{emoji}</div>
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
    <div className="px-4">
      <Sub.WhatIsThisAppFor />

      {isDialogOpen && <Sub.EmojiDialog emoji={emoji!} onClose={closeDialog} />}
      <div>
        <form {...{ onSubmit }}>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <span style={{ flex: 0 }}>Emoji</span>
              <Input name="emoji" {...{ onKeyUp }} />
            </label>
            <Button type="submit" size="sm">
              Show!
            </Button>
          </div>
        </form>

        <div className="flex items-center flex-wrap gap-2 mt-4">
          Shortcuts
          {getEmojiCache().map((x) => {
            return (
              <Button
                data-emoji={x.emoji}
                key={x.emoji}
                onClick={onShortcutButtonClick}
                variant="outline"
                size="icon"
                className="text-xl"
              >
                {x.emoji}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
