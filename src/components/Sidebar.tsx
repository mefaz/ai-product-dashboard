const navigationItems = [
  'Dashboard',
  'AI Assistant',
  'Analytics',
  'Settings',
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">Nexa AI</div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            className={`sidebar__link ${
              item === 'Dashboard' ? 'sidebar__link--active' : ''
            }`}
            key={item}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="status-dot" />
        System operational
      </div>
    </aside>
  )
}