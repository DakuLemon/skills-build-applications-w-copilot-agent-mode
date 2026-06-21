import ResourcePage from './ResourcePage.jsx'
import { api } from '../api/config.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : api.teams.list()

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      description="Team rosters, leaders, and descriptions exposed from the collaboration layer."
      endpoint={() => teamsEndpoint}
      emptyMessage="No teams have been created yet."
      badges={['GET /api/teams/']}
      columns={[
        {
          header: 'Team',
          render: (team) => team.name || 'Untitled team',
        },
        {
          header: 'Leader',
          render: (team) => team.leader?.name || team.leader?.email || 'Unassigned',
        },
        {
          header: 'Members',
          render: (team) => team.members?.length ?? 0,
        },
        {
          header: 'Description',
          render: (team) => team.description || 'No description',
        },
      ]}
    />
  )
}

export default Teams