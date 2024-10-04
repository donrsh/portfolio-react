import { createSub } from "@lib-react/utils/createSub";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/lib/ui/button";
import { Typography } from "~/lib/ui/typogrphy";
import { Input } from "~/lib/ui/input";
import { Trash } from "lucide-react";

type ImageFile = {
  id: string;
  file: File;
  dataUrl: string;
};

const useImages = () => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const addImage = useCallback((file: File) => {
    setImages((prev) => [
      ...prev,
      {
        id: Math.random().toString().slice(2, 10),
        file,
        dataUrl: window.URL.createObjectURL(file),
      },
    ]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  return { images, addImage, removeImage };
};

const Sub = createSub({
  InputRegion: ({ title }: { title: string }) => {
    const { images, addImage, removeImage } = useImages();
    const editorRef = useRef<HTMLDivElement>(null);

    // handle paste event
    useEffect(() => {
      const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const item = event.clipboardData?.items?.[0];

        if (!item) return;

        if (item.type.startsWith("image/")) {
          addImage(item.getAsFile()!);
        }
      };

      editorRef.current?.addEventListener("paste", handlePaste);

      return () => editorRef.current?.removeEventListener("paste", handlePaste);
    }, []);

    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Typography variant="large">{title}</Typography>
          <span>-</span>
          <div>
            Paste images (Ctrl / Cmd + V) or{" "}
            <Sub.ImageFileInput addImage={addImage} />
          </div>
        </div>
        <div
          tabIndex={0}
          ref={editorRef}
          className="border rounded-md p-2 min-h-[300px] overflow-y-auto flex flex-wrap gap-2 focus:ring-2 focus:ring-blue-500"
        >
          {images.reverse().map((image) => (
            <Sub.Image
              key={image.id}
              {...image}
              remove={() => removeImage(image.id)}
            />
          ))}
        </div>
      </div>
    );
  },

  ImageFileInput: ({ addImage }: { addImage: (file: File) => void }) => {
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        addImage(file);
        event.target.value = "";
      }
    }, []);

    return (
      <label>
        <span className="cursor-pointer underline">select an image</span>
        <Input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
    );
  },

  Image: ({ dataUrl, remove, id }: ImageFile & { remove: () => void }) => {
    return (
      <div className="relative group border rounded-md overflow-hidden h-fit">
        <img src={dataUrl} className="h-[200px]" />
        <Button
          variant="outline"
          size="icon"
          onClick={remove}
          className={`absolute top-4 right-4 hidden group-hover:inline-flex`}
        >
          <Trash />
        </Button>
      </div>
    );
  },
});

export default function Page() {
  return (
    <div className="px-4">
      <div className="flex flex-col gap-8">
        <Sub.InputRegion title="Region 1" />
        <Sub.InputRegion title="Region 2" />
      </div>
    </div>
  );
}
