import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, codespaceName } from './api/config.js'
import './App.css'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell bg-body-tertiary min-vh-100">
      <header className="border-bottom bg-white shadow-sm">
        <div className="container py-4">
          <div className="d-flex flex-column gap-3 flex-lg-row justify-content-lg-between align-items-lg-center">
            <div>
              <p className="eyebrow mb-2">Octofit Tracker</p>
              <h1 className="display-6 fw-semibold mb-2">Presentation tier dashboard</h1>
              <p className="lead text-secondary mb-0 app-intro">
                React 19 routes for users, teams, activities, leaderboard, and workouts.
              </p>
            </div>
            <div className="status-card card border-0 shadow-sm">
              <div className="card-body py-3 px-4">
                <p className="small text-uppercase text-secondary mb-2">API target</p>
                <p className="mb-1 fw-semibold text-break">{apiBaseUrl}</p>
                <p className="mb-0 small text-secondary">
                  {codespaceName
                    ? `Using VITE_CODESPACE_NAME=${codespaceName}`
                    : 'VITE_CODESPACE_NAME is unset. Falling back to VITE_API_URL or localhost.'}
                </p>
              </div>
            </div>
          </div>
          <nav className="nav nav-pills gap-2 mt-4 flex-wrap" aria-label="Primary">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? 'active' : 'text-secondary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
