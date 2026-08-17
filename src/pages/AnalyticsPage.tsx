export function AnalyticsPage() {
  return (
    <main className="dashboard">
      <section className="dashboard__intro">
        <p className="section-label">Analytics</p>
        <h2>Product analytics</h2>
        <p>
          Explore request volume, model usage, latency, errors, and product
          performance.
        </p>
      </section>

      <section className="panel">
        <div className="empty-state">
          SVG and Canvas visualizations will be implemented here.
        </div>
      </section>
    </main>
  )
}