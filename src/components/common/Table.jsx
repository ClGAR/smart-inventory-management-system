export default function Table({ children, minWidth = 'min-w-[900px]' }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DED2C4] bg-surface shadow-[0_1px_3px_rgba(61,47,40,0.08)]">
      <div className="overflow-x-auto">
        <table className={`w-full ${minWidth} text-left`}>{children}</table>
      </div>
    </div>
  )
}
