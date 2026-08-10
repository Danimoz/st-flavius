type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  compact?: boolean;
};

export default function PageHero({ eyebrow, title, description, compact = false }: PageHeroProps) {
  return (
    <section className={`relative isolate overflow-hidden bg-[#181613] px-6 text-white lg:px-10 ${compact ? 'py-14 sm:py-16' : 'py-20 sm:py-24'}`}>
      <div aria-hidden="true" className="absolute left-1/2 top-7 h-72 w-52 -translate-x-1/2 rounded-t-full border border-[#c9a760]/30 sm:w-64" />
      <div aria-hidden="true" className="absolute left-1/2 top-16 h-60 w-40 -translate-x-1/2 rounded-t-full border border-[#c9a760]/20 sm:w-52" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#e3c77f]">{eyebrow}</p>
        <h1 className={`mt-4 max-w-4xl font-ecclesial leading-[1.04] ${compact ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl lg:text-7xl'}`}>{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-base leading-7 text-[#d8cdbd] sm:text-lg">{description}</p>}
      </div>
    </section>
  );
}
