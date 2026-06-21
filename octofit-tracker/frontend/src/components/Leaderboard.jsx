import ResourcePage from './ResourcePage.jsx'
import { api } from '../api/config.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : api.leaderboard.global()

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      description="All-time standings with rank, points, and accumulated performance metrics."
      endpoint={() => leaderboardEndpoint}
      emptyMessage="Leaderboard entries will appear once scores are calculated."
      badges={['GET /api/leaderboard/']}
      columns={[
        {
          header: 'Rank',
          render: (entry, index) => entry.rank || index + 1,
        },
        {
          header: 'Athlete',
          render: (entry) => entry.userId?.name || entry.userId?.email || 'Unknown athlete',
        },
        {
          header: 'Points',
          render: (entry) => entry.points ?? 0,
        },
        {
          header: 'Activities',
          render: (entry) => entry.totalActivities ?? 0,
        },
        {
          header: 'Distance',
          render: (entry) => `${entry.totalDistance ?? 0} km`,
        },
        {
          header: 'Calories',
          render: (entry) => `${entry.totalCalories ?? 0} kcal`,
        },
      ]}
    />
  )
}

export default Leaderboard