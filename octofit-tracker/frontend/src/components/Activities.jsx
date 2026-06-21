import ResourcePage from './ResourcePage.jsx'
import { api } from '../api/config.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : api.activities.list()

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : 'N/A'
}

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      description="Recent member activity logs pulled from the Express API tier."
      endpoint={() => activitiesEndpoint}
      emptyMessage="No activities have been logged yet."
      badges={['GET /api/activities/']}
      columns={[
        {
          header: 'Athlete',
          render: (activity) => activity.userId?.name || activity.userId?.email || 'Unknown athlete',
        },
        {
          header: 'Type',
          render: (activity) => <span className="text-capitalize">{activity.type || 'other'}</span>,
        },
        {
          header: 'Duration',
          render: (activity) => `${activity.duration ?? 0} min`,
        },
        {
          header: 'Distance',
          render: (activity) =>
            activity.distance !== undefined && activity.distance !== null ? `${activity.distance} km` : 'N/A',
        },
        {
          header: 'Calories',
          render: (activity) => `${activity.calories ?? 0} kcal`,
        },
        {
          header: 'When',
          render: (activity) => formatDate(activity.timestamp),
        },
      ]}
    />
  )
}

export default Activities