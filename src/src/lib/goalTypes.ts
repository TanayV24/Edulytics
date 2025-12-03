// src/lib/goalTypes.ts

export type GoalCategory =
  | "exam"
  | "coding"
  | "habit"
  | "health"
  | "career"
  | "productivity"
  | "other";

export type Priority = "low" | "medium" | "high";

export interface RawGoalInput {
  text: string;
  deadline?: string;
  hoursPerDay?: number;
}

export interface SubGoal {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  estimatedHours?: number;
}

export interface Goal {
  id: string;
  mainGoal: string;
  category: GoalCategory;
  createdAt: string;
  deadline?: string;
  subGoals: SubGoal[];
  priorityOverall: Priority;
}

export interface GoalUnderstandingResponse {
  goal: Goal;
}
