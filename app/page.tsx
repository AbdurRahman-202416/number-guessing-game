import { Game } from "@/components/Game";

export default function Home() {
  return (
    <main className="relative z-10 mx-auto overflow-x-clip flex min-h-dvh w-full max-w-[520px] flex-col px-4 pb-10 pt-3">
      <Game />
    </main>
  );
}
