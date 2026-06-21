/**
 * Seed Script for OctoFit Tracker Database
 * 
 * Description: Seed the octofit_db database with test data
 * 
 * Usage: npm run seed
 * 
 * This script will:
 * 1. Connect to MongoDB (octofit_db database)
 * 2. Clear existing collections
 * 3. Populate with realistic sample data
 * 4. Log results to console
 */

import { connectDatabase, disconnectDatabase } from '../database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

async function seed() {
  try {
    console.log('🌱 Seeding the octofit_db database with test data...\n');

    // Connect to MongoDB
    await connectDatabase();

    // Clear existing data
    console.log('\n📋 Clearing existing collections...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Collections cleared');

    // Create users
    console.log('\n👥 Creating users...');
    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'password123',
        bio: 'Marathon runner and fitness enthusiast',
        avatar: 'https://api.example.com/avatars/alice.jpg',
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'password123',
        bio: 'Cycling lover and fitness coach',
        avatar: 'https://api.example.com/avatars/bob.jpg',
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        password: 'password123',
        bio: 'Yoga instructor and wellness advocate',
        avatar: 'https://api.example.com/avatars/carol.jpg',
      },
      {
        name: 'David Chen',
        email: 'david@example.com',
        password: 'password123',
        bio: 'Gym enthusiast and personal trainer',
        avatar: 'https://api.example.com/avatars/david.jpg',
      },
      {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        password: 'password123',
        bio: 'Swimming athlete and water sports fan',
        avatar: 'https://api.example.com/avatars/emma.jpg',
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create teams
    console.log('\n🏢 Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Running Rebels',
        description: 'For marathon and distance running enthusiasts',
        members: [users[0]._id, users[1]._id, users[2]._id],
        leader: users[0]._id,
      },
      {
        name: 'Cycle Squad',
        description: 'Cycling and outdoor biking community',
        members: [users[1]._id, users[3]._id, users[4]._id],
        leader: users[1]._id,
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic fitness and wellness focused group',
        members: [users[2]._id, users[0]._id, users[3]._id],
        leader: users[2]._id,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Create activities
    console.log('\n🏃 Creating activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        distance: 10.5,
        duration: 65,
        calories: 850,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Morning run in the park',
      },
      {
        userId: users[0]._id,
        type: 'running',
        distance: 8.2,
        duration: 52,
        calories: 680,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Evening jog with friends',
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        distance: 25.3,
        duration: 90,
        calories: 750,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        notes: 'Long weekend ride',
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        distance: 15.7,
        duration: 60,
        calories: 580,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Commute ride to work',
      },
      {
        userId: users[2]._id,
        type: 'yoga',
        distance: 0,
        duration: 60,
        calories: 250,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Relaxing morning yoga session',
      },
      {
        userId: users[3]._id,
        type: 'gym',
        distance: 0,
        duration: 75,
        calories: 650,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Strength training workout',
      },
      {
        userId: users[4]._id,
        type: 'swimming',
        distance: 2.5,
        duration: 45,
        calories: 520,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        notes: 'Pool training session',
      },
      {
        userId: users[4]._id,
        type: 'swimming',
        distance: 3.0,
        duration: 50,
        calories: 600,
        timestamp: new Date(),
        notes: 'Evening swim workout',
      },
      {
        userId: users[0]._id,
        type: 'walking',
        distance: 5.0,
        duration: 60,
        calories: 280,
        timestamp: new Date(),
        notes: 'Casual walk around the neighborhood',
      },
      {
        userId: users[3]._id,
        type: 'running',
        distance: 6.5,
        duration: 45,
        calories: 520,
        timestamp: new Date(),
        notes: 'Quick morning run',
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create workouts
    console.log('\n💪 Creating workouts...');
    const workouts = await Workout.insertMany([
      {
        title: 'Beginner\'s Running Program',
        description: 'Perfect for those just starting their running journey',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Warm-up jog', duration: 5 },
          { name: 'Running intervals', duration: 20 },
          { name: 'Cool-down walk', duration: 5 },
        ],
        estimatedCalories: 300,
        createdBy: users[0]._id,
      },
      {
        title: 'Advanced HIIT Training',
        description: 'High-intensity interval training for experienced athletes',
        difficulty: 'advanced',
        duration: 45,
        exercises: [
          { name: 'Dynamic warm-up', duration: 5 },
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Mountain climbers', sets: 3, reps: 20 },
          { name: 'Jump squats', sets: 3, reps: 15 },
          { name: 'Cool-down stretch', duration: 5 },
        ],
        estimatedCalories: 600,
        createdBy: users[3]._id,
      },
      {
        title: 'Full Body Strength',
        description: 'Complete strength training routine for all muscle groups',
        difficulty: 'intermediate',
        duration: 60,
        exercises: [
          { name: 'Bench press', sets: 4, reps: 8 },
          { name: 'Squats', sets: 4, reps: 10 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
          { name: 'Pull-ups', sets: 3, reps: 10 },
          { name: 'Core work', duration: 10 },
        ],
        estimatedCalories: 550,
        createdBy: users[3]._id,
      },
      {
        title: 'Relaxing Yoga Flow',
        description: 'Gentle yoga session perfect for relaxation and flexibility',
        difficulty: 'beginner',
        duration: 45,
        exercises: [
          { name: 'Breathing exercises', duration: 5 },
          { name: 'Sun salutations', duration: 15 },
          { name: 'Standing poses', duration: 15 },
          { name: 'Savasana', duration: 10 },
        ],
        estimatedCalories: 200,
        createdBy: users[2]._id,
      },
      {
        title: 'Cycling Endurance',
        description: 'Build cycling stamina and endurance',
        difficulty: 'intermediate',
        duration: 90,
        exercises: [
          { name: 'Warm-up ride', duration: 10 },
          { name: 'Steady-state cycling', duration: 60 },
          { name: 'Cool-down', duration: 20 },
        ],
        estimatedCalories: 700,
        createdBy: users[1]._id,
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    // Create leaderboard entries
    console.log('\n🏆 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        points: 2530,
        rank: 1,
        timeframe: 'all-time',
        totalActivities: 3,
        totalDistance: 23.7,
        totalCalories: 2410,
      },
      {
        userId: users[1]._id,
        points: 1880,
        rank: 2,
        timeframe: 'all-time',
        totalActivities: 2,
        totalDistance: 41.0,
        totalCalories: 1330,
      },
      {
        userId: users[2]._id,
        points: 500,
        rank: 3,
        timeframe: 'all-time',
        totalActivities: 1,
        totalDistance: 0,
        totalCalories: 250,
      },
      {
        userId: users[3]._id,
        points: 1170,
        rank: 4,
        timeframe: 'all-time',
        totalActivities: 2,
        totalDistance: 6.5,
        totalCalories: 1170,
      },
      {
        userId: users[4]._id,
        points: 1120,
        rank: 5,
        timeframe: 'all-time',
        totalActivities: 2,
        totalDistance: 5.5,
        totalCalories: 1120,
      },
      // Weekly leaderboard
      {
        userId: users[0]._id,
        points: 1130,
        rank: 1,
        timeframe: 'week',
        totalActivities: 2,
        totalDistance: 13.2,
        totalCalories: 1130,
      },
      {
        userId: users[1]._id,
        points: 580,
        rank: 2,
        timeframe: 'week',
        totalActivities: 1,
        totalDistance: 15.7,
        totalCalories: 580,
      },
      {
        userId: users[3]._id,
        points: 520,
        rank: 3,
        timeframe: 'week',
        totalActivities: 1,
        totalDistance: 6.5,
        totalCalories: 520,
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Teams: ${teams.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Workouts: ${workouts.length}`);
    console.log(`   - Leaderboard entries: ${leaderboardEntries.length}`);
    console.log('\n🚀 You can now use the API endpoints to retrieve this data!');

    await disconnectDatabase();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seed();
