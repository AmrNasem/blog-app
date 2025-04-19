import Image from "next/image";

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <Image
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
