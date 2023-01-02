export function Home() {
  let number = 0;

  function add() {
    number++;
    console.log(number);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button className="button" onClick={add}>
        Add number
      </button>
    </div>
  );
}
