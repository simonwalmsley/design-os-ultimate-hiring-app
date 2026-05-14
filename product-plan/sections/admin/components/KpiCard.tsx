interface KpiCardProps {
  value: string | number
  label: string
  highlight?: boolean
}

export function KpiCard({ value, label, highlight = false }: KpiCardProps) {
  return (
    <div
      className={[
        'rounded-lg px-5 py-4 outline -outline-offset-1',
        highlight ? 'bg-[#ffcd05]/10 outline-[#ffcd05]/20' : 'bg-white/5 outline-white/10',
      ].join(' ')}
    >
      <p
        className={`text-2xl font-semibold ${highlight ? 'text-[#ffcd05]' : 'text-white'}`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {value}
      </p>
      <p className="mt-1 text-sm/6 font-medium text-gray-400">{label}</p>
    </div>
  )
}
