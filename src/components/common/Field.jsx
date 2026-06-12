export default function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] font-black uppercase tracking-[0.14em] text-text-secondary">
        {label}
      </span>
      {children}
    </label>
  )
}
