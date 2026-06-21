import ResourcePage from './ResourcePage.jsx'
import { api } from '../api/config.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : api.users.list()

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'N/A'
}

function Users() {
  return (
    <ResourcePage
      title="Users"
      description="Registered athletes and profile details from the authentication layer."
      endpoint={() => usersEndpoint}
      emptyMessage="No users are available yet."
      badges={['GET /api/users/']}
      columns={[
        {
          header: 'Name',
          render: (user) => user.name || 'Unnamed user',
        },
        {
          header: 'Email',
          render: (user) => user.email || 'N/A',
        },
        {
          header: 'Bio',
          render: (user) => user.bio || 'No bio provided',
        },
        {
          header: 'Joined',
          render: (user) => formatDate(user.createdAt),
        },
      ]}
    />
  )
}

export default Users