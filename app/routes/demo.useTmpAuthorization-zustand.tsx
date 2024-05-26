import { createTmpAuthorizationStore } from "@lib-react/hooks/useTmpAuthorization/zustand";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Auth = { name: string };

const useTmpAuthorization = createTmpAuthorizationStore<Auth>({
  expireTime: 3 * 60 * 1_000,
});

export default function Page() {
  const {
    current: currentAuth,
    prompt,
    isPrompting,
    promptCancel,
    promptConfirm,
    getTimeToExpire,
    prolong,
    clear,
  } = useTmpAuthorization();

  const dialogElRef = useRef<HTMLDialogElement>();

  const watcherRef = useRef<number>();
  const [timeToExpire, setTimeToExpire] = useState<number>();

  useEffect(() => {
    isPrompting
      ? dialogElRef.current?.showModal()
      : dialogElRef.current?.close();
  }, [isPrompting]);

  useEffect(() => {
    clearInterval(watcherRef.current);
    setTimeToExpire(undefined);

    if (currentAuth) {
      watcherRef.current = window.setInterval(() => {
        setTimeToExpire(Math.round((getTimeToExpire() ?? 0) / 1_000));
      }, 1_000);
    }
  }, [currentAuth]);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target as any);

    const name = formData.get("name") as string | null;

    if (name && name.trim()) {
      promptConfirm({ name });
    }
  }, []);

  return (
    <>
      <div>
        {!currentAuth ? (
          <button onClick={prompt}>Click to start!</button>
        ) : (
          <>
            <div>
              Hi, {currentAuth.name} {timeToExpire && timeToExpire + "s"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => prolong(5 * 60 * 1_000)}>
                prolong 5 mins
              </button>
              <button onClick={clear}>leave</button>
            </div>
          </>
        )}
      </div>
      <dialog ref={dialogElRef as any}>
        <form {...{ onSubmit }}>
          <p>What's your name?</p>
          <input type="text" name="name" id="" />
          <br />

          <div
            className="row-vcenter"
            style={{ marginTop: 20, justifyContent: "space-between" }}
          >
            <button type="button" onClick={promptCancel}>
              cancel
            </button>
            <button type="submit">confirm</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
