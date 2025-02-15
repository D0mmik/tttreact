export default function PlayerText({ isX }: { isX: boolean | undefined }) {
  return (
    <>
      {isX ? (
        <span className="text-red-500">X</span>
      ) : (
        <span className="text-blue-500">O</span>
      )}
    </>
  );
}
