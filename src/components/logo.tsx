import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-10 w-auto">
      <Image
        src="/image/logo.png"
        alt="BIRCOVET Logo"
        width={100}
        height={100}
        className="object-contain"
        priority
      />
    </div>
  );
}
