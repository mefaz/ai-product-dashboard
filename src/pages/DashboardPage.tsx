import { StatCard } from '../components/StatCard'

const stats = [
  {
    label: 'AI Requests',
    value: '12,482',
    change: '+12.4% this week',
  },
  {
    label: 'Tokens Used',
    value: '4.8M',
    change: '+8.1% this week',
  },
  {
    label: 'Avg. Latency',
    value: '842 ms',
    change: '-6.3% this week',
  },
  {
    label: 'Success Rate',
    value: '99.2%',
    change: '+0.4% this week',
  },
]

export function DashboardPage() {
  return (
    <main className="dashboard">
      <section className="dashboard__intro">
        <div>
          <p className="section-label">Overview</p>
          <h2>AI product activity</h2>
          <p>
            Monitor request volume, system performance, and realtime product
            activity.
          </p>
        </div>
      </section>

      <section className="stats-grid" aria-label="Product statistics">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel panel--large">
          <div className="panel__header">
            <div>
              <p className="section-label">Usage</p>
              <h3>Requests overview</h3>
            </div>

            <button className="text-button" type="button">
              Last 7 days
            </button>
          </div>

          <div className="chart-placeholder">
            Analytics visualization will be added here.
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <p className="section-label">Realtime</p>
              <h3>System status</h3>
            </div>
          </div>

          <div className="status-list">
            <div>
              <span>API</span>
              <strong>Operational</strong>
            </div>
            <div>
              <span>AI Stream</span>
              <strong>Operational</strong>
            </div>
            <div>
              <span>Realtime Events</span>
              <strong>Operational</strong>
            </div>
          </div>
        </article>

        <article className="panel panel--full">
          <div className="panel__header">
            <div>
              <p className="section-label">Activity</p>
              <h3>Recent requests</h3>
            </div>
          </div>

          <div className="empty-state">
            Request history will appear here after API integration.
          </div>
        </article>
      </section>
    </main>
  )
}