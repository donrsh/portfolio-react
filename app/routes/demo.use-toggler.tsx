import useToggler from "@react-hook/useToggler";
import { createPortal } from "react-dom";

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
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {animals.map((animal) => (
          <>
            <button
              onClick={() => animalPopover.openWithData(animal)}
              style={{ width: "fit-content" }}
            >
              {animal.name}
            </button>
          </>
        ))}
      </div>

      <dialog open={animalPopover.isOpen}>
        <button onClick={animalPopover.close}>╳</button>
        <br />
        <div id={popoverId}>
          <span style={{ fontSize: 256 }}>{animalPopover.data?.emoji}</span>
        </div>
      </dialog>
    </>
  );
}
