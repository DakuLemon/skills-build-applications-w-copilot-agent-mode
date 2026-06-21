/**
 * API Configuration utility
 * Supports both local development and GitHub Codespaces environments
 */

export const getApiUrl = (): string => {
  // Check if running in GitHub Codespaces
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    // Codespaces URL format
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  // Use environment variable if set, otherwise default to localhost
  const apiUrl = import.meta.env.VITE_API_URL;
  return apiUrl || 'http://localhost:8000/api';
};

export const api = {
  health: () => `${getApiUrl()}/health`,
  
  // Users endpoints
  users: {
    list: () => `${getApiUrl()}/users`,
    detail: (id: string) => `${getApiUrl()}/users/${id}`,
    create: () => `${getApiUrl()}/users`,
    update: (id: string) => `${getApiUrl()}/users/${id}`,
    delete: (id: string) => `${getApiUrl()}/users/${id}`,
  },

  // Teams endpoints
  teams: {
    list: () => `${getApiUrl()}/teams`,
    detail: (id: string) => `${getApiUrl()}/teams/${id}`,
    create: () => `${getApiUrl()}/teams`,
    update: (id: string) => `${getApiUrl()}/teams/${id}`,
    delete: (id: string) => `${getApiUrl()}/teams/${id}`,
  },

  // Activities endpoints
  activities: {
    list: () => `${getApiUrl()}/activities`,
    detail: (id: string) => `${getApiUrl()}/activities/${id}`,
    create: () => `${getApiUrl()}/activities`,
    update: (id: string) => `${getApiUrl()}/activities/${id}`,
    delete: (id: string) => `${getApiUrl()}/activities/${id}`,
  },

  // Leaderboard endpoints
  leaderboard: {
    global: () => `${getApiUrl()}/leaderboard`,
    teams: () => `${getApiUrl()}/leaderboard/teams`,
    timeframe: (timeframe: string) => `${getApiUrl()}/leaderboard/${timeframe}`,
    userRank: (userId: string) => `${getApiUrl()}/leaderboard/user/${userId}`,
  },

  // Workouts endpoints
  workouts: {
    list: () => `${getApiUrl()}/workouts`,
    detail: (id: string) => `${getApiUrl()}/workouts/${id}`,
    personalized: (userId: string) => `${getApiUrl()}/workouts/user/${userId}`,
    create: () => `${getApiUrl()}/workouts`,
    update: (id: string) => `${getApiUrl()}/workouts/${id}`,
    delete: (id: string) => `${getApiUrl()}/workouts/${id}`,
  },
};
