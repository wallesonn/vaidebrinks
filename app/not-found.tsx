import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-4 py-20">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-indigo-500">404</p>
      <h1 className="text-4xl font-black tracking-tight text-slate-900">This party page went missing</h1>
      <p className="text-sm leading-7 text-slate-600">The route you requested does not exist in this prototype.</p>
      <Link href="/" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft">
        Return home
      </Link>
    </div>
  );
}
