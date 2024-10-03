import { createSub } from "@lib-react/utils/createSub";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  ImageInput: ({ addImage }: { addImage: (file: File) => void }) => {
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
  Image: ({ dataUrl, remove }: ImageFile & { remove: () => void }) => {
    return (
      <div className="relative group border rounded-md overflow-hidden">
        <img src={dataUrl} className="h-[200px] " />
        <Button
          variant="outline"
          size="icon"
          onClick={remove}
          className="absolute top-4 right-4 hidden group-hover:inline-flex"
        >
          <Trash />
        </Button>
      </div>
    );
  },
});

export default function Page() {
  const { images, addImage, removeImage } = useImages();

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const item = event.clipboardData?.items?.[0];

      if (!item) return;

      if (item.type.startsWith("image/")) {
        addImage(item.getAsFile()!);
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div className="px-4">
      <div className="flex flex-col items-center">
        <Typography
          variant="large"
          className="flex items-center gap-1 mb-4 text-center"
        >
          Paste images (Ctrl/Cmd + V) or <Sub.ImageInput addImage={addImage} />
        </Typography>
      </div>

      <hr className="mx-[100px] mb-4" />

      <div className="flex flex-wrap gap-4">
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
}
