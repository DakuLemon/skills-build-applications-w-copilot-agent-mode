import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  timeframe: string; // 'week', 'month', 'all-time'
  totalActivities: number;
  totalDistance: number; // in kilometers
  totalCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    rank: {
      type: Number,
      default: 0,
      min: 0,
    },
    timeframe: {
      type: String,
      enum: ['week', 'month', 'all-time'],
      default: 'all-time',
    },
    totalActivities: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for unique leaderboard entries
leaderboardSchema.index({ userId: 1, timeframe: 1 }, { unique: true });

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
