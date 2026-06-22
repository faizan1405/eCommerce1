import { whatsAppGeneral } from "@/lib/products";

export function WhatsAppButton() {
  return (
    <a
      href={whatsAppGeneral()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] blur-2xl opacity-50 group-hover:opacity-80 transition" />
      <span className="relative grid place-items-center h-14 w-14 rounded-full bg-[#25D366] shadow-deep chrome-edge animate-pulse-red">
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-black" aria-hidden>
          <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.13-.42-2.15-1.33-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.47-.83-2.01-.22-.53-.45-.46-.61-.47l-.52-.01a1 1 0 0 0-.72.34c-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.16.16-1.28-.07-.12-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.18 1.6 6L4 28l6.2-1.62A11.93 11.93 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" />
        </svg>
      </span>
    </a>
  );
}
