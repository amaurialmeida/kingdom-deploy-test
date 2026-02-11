import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full z-10 relative">
      <Image
        className="absolute -top-19.5 left-0 w-screen min-w-full overflow-hidden"
        alt=""
        src={"/assets/rectangle.svg"}
        draggable="false"
        width={1440}
        height={183}
      />

      <div className="relative w-full mx-auto px-6 flex items-center justify-between z-20">
        <div className="flex items-center">
          <Image
            alt="logo da alpha com nome da marca ao lado"
            src={"/assets/logo-footer.svg"}
            draggable="false"
            width={303}
            height={50}
          />
        </div>

        <nav className="flex gap-6">
          <a
            href="pdfs/politica-de-privacidade.pdf"
            target="_blank"
            className="font-nunito text-[16px] leading-5.5 tracking-[0.005em] text-[#1F1C1B] underline"
          >
            Políticas de Privacidade
          </a>
          <a
            href="pdfs/termos-de-uso.pdf"
            target="_blank"
            className="font-nunito text-[16px] leading-5.5 tracking-[0.005em] text-[#1F1C1B] underline"
          >
            Termos e Condições
          </a>
          <a
            href="/contato"
            className="font-nunito text-[16px] leading-5.5 tracking-[0.005em] text-[#1F1C1B] underline"
          >
            Contato/Suporte
          </a>
        </nav>
      </div>
    </footer>
  );
}
