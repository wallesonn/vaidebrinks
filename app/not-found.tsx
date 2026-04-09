import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-4 py-20">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-indigo-500">404</p>
      <h1 className="text-4xl font-black tracking-tight text-slate-900">Essa página da festa desapareceu</h1>
      <p className="text-sm leading-7 text-slate-600">A rota que você pediu não existe neste protótipo.</p>
      <Link href="/" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft">
        Voltar ao início
      </Link>
    </div>
  );
}
