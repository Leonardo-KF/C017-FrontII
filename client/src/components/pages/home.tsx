import { useState } from "react";

export function Home() {
  const [number, setNumber] = useState<number>(0);

  let num2 = 0;

  function add() {
    setNumber(number + 1);
  }

  console.log("renderizou home");

  return (
    <div>
      <h1 id="number">{number}</h1>
      <button onClick={add}>Add number</button>
      <button
        onClick={() => {
          num2++;
          console.log(num2);
        }}
      >
        Add number 2
      </button>
    </div>
  );
}
