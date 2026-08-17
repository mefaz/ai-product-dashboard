export function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">Workspace</p>
        <h1 className="topbar__title">Dashboard</h1>
      </div>

      <div className="topbar__actions">
        <button className="button button--secondary" type="button">
          Export
        </button>

        <button className="button button--primary" type="button">
          New request
        </button>
      </div>
    </header>
  )
}