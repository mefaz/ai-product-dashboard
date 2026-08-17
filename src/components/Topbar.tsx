type TopbarProps = {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">Workspace</p>
        <h1 className="topbar__title">{title}</h1>
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