import Image from "next/image";

function Avatar({
  src,
  alt,
  className,
  priority
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-10 h-10 rounded-full overflow-hidden ${className}`}
    >
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
