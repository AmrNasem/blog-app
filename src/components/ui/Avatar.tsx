import Image from "next/image";

function Avatar({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <Image
        priority={priority}
        width="200"
        height="200"
        src={src}
        alt={alt}
        className="object-cover"
      />
    </div>
  );
}

export default Avatar;
