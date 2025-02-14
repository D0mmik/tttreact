import TttBlock from "./ttt-block.tsx";

export default function TttGame() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 bg-neutral-700 items-center h-1/3 justify-items-center mt-40 rounded-3xl sm:p-1">
        <TttBlock />
        <TttBlock />
        <TttBlock />
        <TttBlock />
        <TttBlock />
        <TttBlock />
        <TttBlock />
        <TttBlock />
        <TttBlock />
      </div>
    </div>
  );
}
