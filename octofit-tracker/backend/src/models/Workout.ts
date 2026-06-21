import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in minutes
}

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: string; // 'beginner', 'intermediate', 'advanced'
  duration: number; // in minutes
  exercises: IExercise[];
  estimatedCalories: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      min: 1,
    },
    reps: {
      type: Number,
      min: 1,
    },
    duration: {
      type: Number,
      min: 1,
    },
  },
  { _id: false }
);

const workoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: {
      type: Number,
      required: true,
      min: 5,
    },
    exercises: [exerciseSchema],
    estimatedCalories: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
