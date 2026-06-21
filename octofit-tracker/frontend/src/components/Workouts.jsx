import ResourcePage from './ResourcePage.jsx'
import { api } from '../api/config.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : api.workouts.list()

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      description="Suggested workouts with difficulty, duration, and estimated calorie burn."
      endpoint={() => workoutsEndpoint}
      emptyMessage="No workouts are available yet."
      badges={['GET /api/workouts/']}
      columns={[
        {
          header: 'Title',
          render: (workout) => workout.title || 'Untitled workout',
        },
        {
          header: 'Difficulty',
          render: (workout) => (
            <span className="text-capitalize">{workout.difficulty || 'intermediate'}</span>
          ),
        },
        {
          header: 'Duration',
          render: (workout) => `${workout.duration ?? 0} min`,
        },
        {
          header: 'Exercises',
          render: (workout) => workout.exercises?.length ?? 0,
        },
        {
          header: 'Calories',
          render: (workout) => `${workout.estimatedCalories ?? 0} kcal`,
        },
        {
          header: 'Coach',
          render: (workout) => workout.createdBy?.name || workout.createdBy?.email || 'N/A',
        },
      ]}
    />
  )
}

export default Workouts