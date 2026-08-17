import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { DashboardPage } from './pages/DashboardPage'
import { AssistantPage } from './pages/AssistantPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'
import './styles/app.css'

type Page = 'dashboard' | 'assistant' | 'analytics' | 'settings'

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  assistant: 'AI Assistant',
  analytics: 'Analytics',
  settings: 'Settings',
}

function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'assistant':
        return <AssistantPage />
      case 'analytics':
        return <AnalyticsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <div className="app-main">
        <Topbar title={pageTitles[activePage]} />
        {renderPage()}
      </div>
    </div>
  )
}

export default App