export default function IceCreamLoader({ label = 'Cargando helados...' }: { label?: string }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-8">
      <div className="relative h-32 w-24" aria-hidden>
        <span className="scoop left-5 top-0 bg-peach-light" />
        <span className="scoop left-0 top-8 bg-peach [animation-delay:0.2s]" />
        <span className="scoop left-5 top-16 bg-brand [animation-delay:0.4s]" />
        <span className="cone-shape" />
      </div>
      <p className="animate-pulse text-lg text-ink/70">{label}</p>
    </div>
  );
}
