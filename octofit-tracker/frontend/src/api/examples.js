/**
 * Example: How to use the API configuration in your React components
 * 
 * The api/config.js file provides a centralized way to manage all API endpoints
 * with automatic Codespaces support.
 */

// Import the API utilities
import { api, getApiUrl } from './api/config';

// Example 1: Fetch all users
export async function fetchAllUsers() {
  const url = api.users.list();
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Example 2: Fetch user by ID
export async function fetchUser(userId) {
  const url = api.users.detail(userId);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
}

// Example 3: Create a new user
export async function createUser(userData) {
  const url = api.users.create();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example 4: Get global leaderboard
export async function fetchLeaderboard() {
  const url = api.leaderboard.global();
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

// Example 5: Get leaderboard for specific timeframe
export async function fetchLeaderboardByTimeframe(timeframe) {
  const url = api.leaderboard.timeframe(timeframe); // 'week', 'month', or 'all-time'
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching leaderboard for ${timeframe}:`, error);
    throw error;
  }
}

// Example 6: Get user ranking
export async function fetchUserRank(userId) {
  const url = api.leaderboard.userRank(userId);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ranking for user ${userId}:`, error);
    throw error;
  }
}

// Example 7: Get personalized workouts for user
export async function fetchPersonalizedWorkouts(userId) {
  const url = api.workouts.personalized(userId);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching workouts for user ${userId}:`, error);
    throw error;
  }
}

// Example 8: Log a new activity
export async function logActivity(activityData) {
  const url = api.activities.create();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: activityData.userId,
        type: activityData.type, // e.g., 'running', 'cycling', 'swimming'
        distance: activityData.distance,
        duration: activityData.duration,
        calories: activityData.calories,
        timestamp: new Date().toISOString(),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging activity:', error);
    throw error;
  }
}

// Example 9: Get all teams
export async function fetchAllTeams() {
  const url = api.teams.list();
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}

// Example 10: Create a new team
export async function createTeam(teamData) {
  const url = api.teams.create();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: teamData.name,
        description: teamData.description,
        members: teamData.members || [],
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
}

// Example 11: Check API health
export async function checkApiHealth() {
  const url = api.health();
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Health:', data);
    return data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
}

// Example 12: Get current API URL (useful for debugging)
export function displayApiUrl() {
  const apiUrl = getApiUrl();
  console.log('Current API URL:', apiUrl);
  console.log('Is in Codespaces:', import.meta.env.VITE_CODESPACE_NAME ? 'Yes' : 'No');
  return apiUrl;
}

/**
 * React Component Example:
 * 
 * import { useEffect, useState } from 'react';
 * import { fetchAllUsers, fetchLeaderboard } from './api-examples';
 * 
 * function Dashboard() {
 *   const [users, setUsers] = useState([]);
 *   const [leaderboard, setLeaderboard] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     const loadData = async () => {
 *       try {
 *         const usersData = await fetchAllUsers();
 *         const leaderboardData = await fetchLeaderboard();
 *         setUsers(usersData.data);
 *         setLeaderboard(leaderboardData.data);
 *       } catch (error) {
 *         console.error('Failed to load data:', error);
 *       } finally {
 *         setLoading(false);
 *       }
 *     };
 * 
 *     loadData();
 *   }, []);
 * 
 *   if (loading) return <div>Loading...</div>;
 * 
 *   return (
 *     <div>
 *       <h1>Dashboard</h1>
 *       <h2>Users ({users.length})</h2>
 *       <h2>Leaderboard</h2>
 *       {/* Render leaderboard data */}
 *     </div>
 *   );
 * }
 */
