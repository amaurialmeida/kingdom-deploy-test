import Image from "next/image";
export default function Header() {
  return (
    <div className="w-full h-22.5 bg-tertiary-300 flex items-center justify-center z-10">
      <Image
        alt="logo alpha play"
        src="/assets/logo.svg"
        width={125}
        height={50}
        className="filter brightness-0 invert"
        draggable="false"
      />
    </div>
  );
}
