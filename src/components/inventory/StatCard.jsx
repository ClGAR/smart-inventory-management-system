export default function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  valueTone = 'text-text-primary',
  iconTone = 'text-[#8A7A6B]',
  iconBg = 'bg-[#F8F2EA] border-[#E1D3C3]',
}) {
  return (
    <article className="rounded-xl border border-[#DED2C4] bg-surface px-6 py-5 shadow-[0_1px_3px_rgba(61,47,40,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-text-secondary">
          {label}
        </p>
        <div className={`grid h-8 w-8 place-items-center rounded-lg border ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconTone}`} aria-hidden="true" />
        </div>
      </div>
      <strong className={`mt-7 block text-2xl font-black leading-none ${valueTone}`}>
        {value}
      </strong>
      <p className="mt-3 text-[10px] leading-4 text-text-secondary">{sublabel}</p>
    </article>
  )
}
