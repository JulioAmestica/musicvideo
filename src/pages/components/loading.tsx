import Image from "next/image";

export default function Loading() {
  return (
    <Image
      src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
      alt="Loading"
      width={200}
      height={200}
      priority
    />
  );
}
