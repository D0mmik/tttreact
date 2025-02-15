import { Circle, X } from "lucide-react";

export default function PlayerText({ isX }: { isX: boolean | undefined }) {
  return (
    <>
      {isX ? (
        <X color="#ff0000" size="30" />
      ) : (
        <Circle color="#0062ff" size="30" />
      )}
    </>
  );
}
