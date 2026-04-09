import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "soft";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
};

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-soft",
  secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  danger: "bg-rose-500 text-white hover:bg-rose-600",
  soft: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100",
};

const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({ href, variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
    buttonStyles[variant],
    buttonSizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur", className)} {...props} />
);

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 flex items-start justify-between gap-4", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-bold text-slate-900", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm leading-6 text-slate-600", className)} {...props} />
);

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50",
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50",
          className
        )}
        {...props}
      />
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("mb-2 block text-sm font-semibold text-slate-700", className)} {...props} />
);

export function Badge({ className, children }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-indigo-500">{eyebrow}</p> : null}
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <span className="inline-flex items-center gap-1 text-amber-500">★ {value.toFixed(1)}</span>
      {reviews !== undefined ? <span className="text-slate-500">({reviews} avaliações)</span> : null}
    </div>
  );
}

export function FlowSteps({ current }: { current: number }) {
  const steps = ["Detalhes", "Pagamento", "Confirmação"];

  return (
    <div className="mb-8 flex items-center gap-3 overflow-x-auto">
      {steps.map((step, index) => {
        const active = current === index + 1;
        const completed = current > index + 1;

        return (
          <div key={step} className="flex min-w-[140px] items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black",
                completed ? "bg-emerald-500 text-white" : active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
              )}
            >
              {index + 1}
            </div>
            <div>
              <p className={cn("text-sm font-bold", active || completed ? "text-slate-900" : "text-slate-500")}>{step}</p>
            </div>
            {index < steps.length - 1 ? <div className="h-px flex-1 bg-slate-200" /> : null}
          </div>
        );
      })}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-start gap-4 border-dashed bg-white/70 p-8 text-left">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">✦</div>
      <div>
        <h3 className="text-xl font-black text-slate-900">{title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {action}
    </Card>
  );
}

export function ArtworkFrame({
  title,
  subtitle,
  accent,
  compact = false,
}: {
  title: string;
  subtitle: string;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[28px] p-6 text-white shadow-soft", accent, compact ? "min-h-[200px]" : "min-h-[320px]") }>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.30),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_32%)]" />
      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/20 text-white backdrop-blur">Pronto para a festa</Badge>
          <div className="rounded-2xl bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur">Montagem segura</div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">{subtitle}</p>
          <h4 className="mt-3 max-w-sm text-3xl font-black tracking-tight">{title}</h4>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs font-semibold text-white/75">Montagem</p>
            <p className="mt-2 text-lg font-black">45 min</p>
          </div>
          <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs font-semibold text-white/75">Convidados</p>
            <p className="mt-2 text-lg font-black">A criançada adora</p>
          </div>
          <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
            <p className="text-xs font-semibold text-white/75">Clima</p>
            <p className="mt-2 text-lg font-black">Divertido</p>
          </div>
        </div>
      </div>
    </div>
  );
}
