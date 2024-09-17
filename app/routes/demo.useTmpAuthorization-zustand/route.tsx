import { createTmpAuthorizationStore } from "@lib-react/hooks/useTmpAuthorization/zustand";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SourceCodeRefs from "~/components/ui/SourceCodeRefs";
import { sourceCodeReferences } from "./metadata";
import { Button } from "~/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/ui/dialog";
import { Typography } from "~/lib/ui/typogrphy";
import { Input } from "~/lib/ui/input";
import { TimerResetIcon, LogOutIcon } from "lucide-react";
import { T } from "ramda";

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
      <div className="mb-4">
        {!currentAuth ? (
          <Dialog
            open={isPrompting}
            onOpenChange={(open) => {
              if (!open) {
                promptCancel();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={prompt}>Click to start!</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <form {...{ onSubmit }}>
                  <Typography>What's your name?</Typography>
                  <Input type="text" name="name" id="" />
                  <br />

                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={promptCancel}
                      variant="outline"
                      className="ml-auto"
                    >
                      cancel
                    </Button>
                    <Button type="submit">confirm</Button>
                  </div>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <>
            <Typography variant="large">Hi, {currentAuth.name}</Typography>
            <Typography variant="muted" className="min-h-10">
              {timeToExpire
                ? `Your session will expire in ${timeToExpire} seconds`
                : " "}
            </Typography>
            <div className="flex gap-2">
              <Button onClick={() => prolong(5 * 60 * 1_000)} size="sm">
                <TimerResetIcon className="mr-2" />
                prolong 5 mins
              </Button>
              <Button onClick={clear} size="sm">
                <LogOutIcon className="mr-2" />
                leave
              </Button>
            </div>
          </>
        )}
      </div>

      <hr />

      <SourceCodeRefs open data={sourceCodeReferences} />
    </>
  );
}
