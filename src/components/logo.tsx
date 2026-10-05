import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-10 w-auto">
      <Image
        src="/images/logo/logo.svg"
        alt="BIRCOVET Logo"
        width={150}
        height={50}
        className="object-contain"
        priority
      />
    </div>
  );
}
