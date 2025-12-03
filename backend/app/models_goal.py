# backend/app/models_goal.py

from pydantic import BaseModel
from typing import Literal, Optional, List
from datetime import datetime

# Type aliases
Priority = Literal["low", "medium", "high"]
GoalCategory = Literal[
    "exam",
    "coding",
    "habit",
    "health",
    "career",
    "productivity",
    "other",
]


class RawGoalInput(BaseModel):
    """
    Raw input from the user.
    Example:
      text = "I want to crack JEE in 6 months"
    """
    text: str
    deadline: Optional[str] = None  # ISO date, e.g. "2025-12-31"
    hoursPerDay: Optional[float] = None


class SubGoal(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    priority: Priority
    estimatedHours: Optional[float] = None


class Goal(BaseModel):
    id: str
    mainGoal: str
    category: GoalCategory
    createdAt: str
    deadline: Optional[str] = None
    subGoals: List[SubGoal]
    priorityOverall: Priority


class GoalUnderstandingResponse(BaseModel):
    goal: Goal
