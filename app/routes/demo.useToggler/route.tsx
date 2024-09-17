import useToggler from "@lib-react/hooks/useToggler";
import SourceCodeRefs from "~/components/ui/SourceCodeRefs";
import { sourceCodeReferences } from "./metadata";
import { Button } from "~/lib/ui/button";

const popoverId = "popover";

type Animal = { name: string; emoji: string };
const animals = [
  { name: "dog", emoji: "🐶" },
  { name: "cat", emoji: "🐱" },
  { name: "chicken", emoji: "🐥" },
  { name: "pig", emoji: "🐷" },
  { name: "fish", emoji: "🐟" },
];

export default function Page() {
  const animalPopover = useToggler<Animal>();

  return (
    <>
      <div className="flex gap-2 mb-4">
        {animals.map((animal) => (
          <Button
            key={animal.name}
            onClick={() => animalPopover.openWithData(animal)}
            style={{ width: "fit-content" }}
          >
            {animal.name}
          </Button>
        ))}
      </div>

      <dialog
        className="border-2 border-gray-300 dark:bg-black dark:text-white"
        open={animalPopover.isOpen}
      >
        <Button
          variant="outline"
          className="border-0 absolute top-0 right-0"
          onClick={animalPopover.close}
        >
          ╳
        </Button>
        <br />
        <div id={popoverId}>
          <span className="m-4 text-[256px]">{animalPopover.data?.emoji}</span>
        </div>
      </dialog>

      <hr />

      <SourceCodeRefs open data={sourceCodeReferences} />
    </>
  );
}
