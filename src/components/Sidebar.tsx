type Page = 'dashboard' | 'assistant' | 'analytics' | 'settings'

type SidebarProps = {
  activePage: Page
  onPageChange: (page: Page) => void
}

const navigationItems: Array<{
  id: Page
  label: string
}> = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'assistant', label: 'AI Assistant' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
]

export function Sidebar({
  activePage,
  onPageChange,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">Nexa AI</div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <button
            className={`sidebar__link ${
              item.id === activePage ? 'sidebar__link--active' : ''
            }`}
            key={item.id}
            type="button"
            onClick={() => onPageChange(item.id)}
          >
            {item.label}
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