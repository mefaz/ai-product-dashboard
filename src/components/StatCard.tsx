type StatCardProps = {
  label: string
  value: string
  change: string
}

export function StatCard({ label, value, change }: StatCardProps) {
  return (
    <article className="stat-card">
      <p className="stat-card__label">{label}</p>
      <strong className="stat-card__value">{value}</strong>
      <span className="stat-card__change">{change}</span>
    </article>
  )
}