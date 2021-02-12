import Image from "next/image";

export default function CustomImage(props: {
  url: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image
      src={props.url}
      width={props.width}
      height={props.height}
      alt={props.alt}
      objectFit="contain"
    />
  );
}
