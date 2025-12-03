# backend/app/services_goal_understanding.py

import uuid
from datetime import datetime
from typing import List

from .models_goal import (
    RawGoalInput,
    Goal,
    SubGoal,
    GoalCategory,
    Priority,
)


def _classify_category(text: str) -> GoalCategory:
    t = text.lower()

    if any(k in t for k in ["jee", "neet", "gate", "exam", "boards", "engineering entrance"]):
        return "exam"
    if any(k in t for k in ["developer", "full-stack", "frontend", "backend", "react", "coding", "programmer"]):
        return "coding"
    if any(k in t for k in ["habit", "routine", "daily", "every day", "consistency"]):
        return "habit"
    if any(k in t for k in ["gym", "workout", "health", "fitness", "diet", "weight"]):
        return "health"
    if any(k in t for k in ["career", "job", "internship", "promotion", "salary"]):
        return "career"
    if any(k in t for k in ["focus", "productivity", "time management", "deep work"]):
        return "productivity"
    return "other"


def _infer_priority(category: GoalCategory, text: str) -> Priority:
    t = text.lower()
    if any(k in t for k in ["urgent", "asap", "6 months", "3 months", "deadline"]):
        return "high"
    if category in ["exam", "career", "coding"]:
        return "high"
    return "medium"


def _create_subgoals(category: GoalCategory, text: str) -> List[SubGoal]:
    """
    Heuristic v1: later you can replace this with LLM-based subgoal generation.
    """
    subs: List[SubGoal] = []

    def sg(
        title: str,
        desc: str,
        priority: Priority = "medium",
        hours: float | None = None,
    ) -> SubGoal:
        return SubGoal(
            id=str(uuid.uuid4()),
            title=title,
            description=desc,
            priority=priority,
            estimatedHours=hours,
        )

    if category == "exam":
        subs = [
            sg(
                "Analyse syllabus & exam pattern",
                "Collect official syllabus + past year papers and mark weightage.",
                "high",
                4,
            ),
            sg(
                "Create subject-wise weekly plan",
                "Break Physics, Chemistry, Maths into weekly topic buckets.",
                "high",
                6,
            ),
            sg(
                "Daily practice routine",
                "Decide daily question count and revision blocks.",
                "high",
                40,
            ),
            sg(
                "Mock tests & analysis",
                "Weekly full-length or sectional tests with deep analysis.",
                "high",
                20,
            ),
        ]
    elif category == "coding":
        subs = [
            sg(
                "Setup development environment",
                "Install Node, Git, VSCode, and configure basic setup.",
                "medium",
                2,
            ),
            sg(
                "Strengthen fundamentals",
                "HTML, CSS, JavaScript/TypeScript basics.",
                "high",
                20,
            ),
            sg(
                "Learn chosen stack",
                "Frontend (React) + one backend (Node/Express, Django, etc.).",
                "high",
                40,
            ),
            sg(
                "Build portfolio projects",
                "2–3 solid projects deployed online with GitHub repos.",
                "high",
                60,
            ),
        ]
    elif category == "habit":
        subs = [
            sg(
                "Define habit clearly",
                "Specify trigger, behavior, and reward for the habit.",
                "high",
                2,
            ),
            sg(
                "Design supporting environment",
                "Remove friction and set up cues for the habit.",
                "medium",
                3,
            ),
            sg(
                "Daily tracking system",
                "Set up streak tracking and simple reflection routine.",
                "high",
                10,
            ),
        ]
    elif category == "health":
        subs = [
            sg(
                "Baseline assessment",
                "Measure weight, energy levels, and current routine.",
                "medium",
                1,
            ),
            sg(
                "Workout plan",
                "Plan weekly workouts (strength/cardio/flexibility).",
                "high",
                10,
            ),
            sg(
                "Diet improvements",
                "Plan meals and simple nutrition rules.",
                "high",
                10,
            ),
        ]
    else:
        subs = [
            sg(
                "Clarify what success looks like",
                "Write a one-paragraph description of 'done' state.",
                "high",
                2,
            ),
            sg(
                "Break into milestones",
                "Create 4–8 milestones that lead to the final goal.",
                "medium",
                4,
            ),
        ]

    return subs


def understand_goal(raw: RawGoalInput) -> Goal:
    """
    Main entry point for Module 1 – Goal Understanding.
    Converts RawGoalInput into a structured Goal.
    """
    category = _classify_category(raw.text)
    priority = _infer_priority(category, raw.text)
    subgoals = _create_subgoals(category, raw.text)

    return Goal(
        id=str(uuid.uuid4()),
        mainGoal=raw.text.strip(),
        category=category,
        createdAt=datetime.utcnow().isoformat(),
        deadline=raw.deadline,
        subGoals=subgoals,
        priorityOverall=priority,
    )
