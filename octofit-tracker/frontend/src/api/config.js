const defaultApiUrl = 'http://localhost:8000/api'

export const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || ''

const stripTrailingSlash = (value) => value.replace(/\/+$/, '')

export const getApiUrl = () => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
  return configuredApiUrl ? stripTrailingSlash(configuredApiUrl) : defaultApiUrl
}

export const apiBaseUrl = getApiUrl()

const resourceUrl = (resource, suffix = '') => `${apiBaseUrl}/${resource}/${suffix}`

export const api = {
  health: () => `${apiBaseUrl}/health`,
  users: {
    list: () => resourceUrl('users'),
    detail: (id) => resourceUrl('users', id),
    create: () => resourceUrl('users'),
    update: (id) => resourceUrl('users', id),
    delete: (id) => resourceUrl('users', id),
  },
  teams: {
    list: () => resourceUrl('teams'),
    detail: (id) => resourceUrl('teams', id),
    create: () => resourceUrl('teams'),
    update: (id) => resourceUrl('teams', id),
    delete: (id) => resourceUrl('teams', id),
  },
  activities: {
    list: () => resourceUrl('activities'),
    detail: (id) => resourceUrl('activities', id),
    create: () => resourceUrl('activities'),
    update: (id) => resourceUrl('activities', id),
    delete: (id) => resourceUrl('activities', id),
  },
  leaderboard: {
    global: () => resourceUrl('leaderboard'),
    timeframe: (timeframe) => resourceUrl('leaderboard', timeframe),
    userRank: (userId) => resourceUrl('leaderboard', `user/${userId}`),
  },
  workouts: {
    list: () => resourceUrl('workouts'),
    detail: (id) => resourceUrl('workouts', id),
    personalized: (userId) => resourceUrl('workouts', `user/${userId}`),
    create: () => resourceUrl('workouts'),
    update: (id) => resourceUrl('workouts', id),
    delete: (id) => resourceUrl('workouts', id),
  },
}

export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      count: payload.length,
      meta: {},
      raw: payload,
    }
  }

  const items =
    payload?.data?.items ??
    payload?.items ??
    payload?.results ??
    payload?.data ??
    []

  return {
    items: Array.isArray(items) ? items : [],
    count:
      payload?.count ??
      payload?.total ??
      payload?.pagination?.total ??
      (Array.isArray(items) ? items.length : 0),
    meta: payload?.pagination ?? payload?.meta ?? {},
    raw: payload,
  }
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}
