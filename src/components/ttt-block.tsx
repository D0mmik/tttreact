export default function TttBlock() {
  const player = Math.ceil(Math.random() * 2);
  const color = player == 1 ? "text-blue-500" : "text-red-500";

  return (
    <div className="bg-neutral-900 max-sm:w-24 max-sm:h-24 w-44 h-44 m-2 rounded-2xl flex justify-center items-center text-8xl">
      <p className={color}>{player == 1 ? "X" : "O"}</p>
    </div>
  );
}
