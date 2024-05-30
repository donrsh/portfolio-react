import useToggler from "@lib-react/hooks/useToggler";
import { createSub } from "@lib-react/utils/createSub";
import { KeyboardEventHandler, useCallback, useEffect } from "react";
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
    openWithData: openDialog,
    close: closeDialog,
    data: emoji,
  } = useToggler<string>();

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
    <div>
      <label>
        <span>Choose an emoji and hit enter</span>
        <br />
        <input type="text" onKeyUp={onKeyUp} />
      </label>
      {isDialogOpen && <Sub.Dialog emoji={emoji!} onClose={closeDialog} />}
    </div>
  );
}
