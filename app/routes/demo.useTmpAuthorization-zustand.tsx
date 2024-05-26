import { createTmpAuthorizationStore } from "@lib-react/hooks/useTmpAuthorization/zustand";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SourceCodeRefs, {
  ReferenceEntry,
} from "@lib-react/components/SourceCodeRefs";

const sourceCodeReferences: ReferenceEntry[] = [
  {
    title: "This page",
    link: "https://github.com/donrsh/portfolio-react/blob/main/app/routes/demo.useTmpAuthorization-zustand.tsx",
  },
  {
    title: (
      <>
        <code>TmpAuthorization</code> type def
      </>
    ),
    link: "https://github.com/donrsh/web-apps-workspace/blob/main/libs/react/src/hooks/useTmpAuthorization/types/index.ts",
  },
  {
    title: (
      <>
        <code>useTmpAuthorization</code> zustand implementation
      </>
    ),
    link: "https://github.com/donrsh/web-apps-workspace/tree/main/libs/react/src/hooks/useTmpAuthorization/zustand",
  },
];

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

      <hr />

      <SourceCodeRefs
        open
        data={sourceCodeReferences}
        style={{ marginBlock: 16 }}
      />
    </>
  );
}
