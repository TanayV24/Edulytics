import { useLocation, useNavigate } from "react-router-dom";
import type { Goal } from "../lib/goalTypes.ts";

interface LocationState {
  goal?: Goal;
}

export default function GoalUnderstandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const goal = state?.goal;

  if (!goal) {
    // If user opens /goal directly without coming from chat
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-4">
        <p className="text-sm text-muted-foreground">
          No goal data found. Start by chatting with the AI.
        </p>
        <button
          onClick={() => navigate("/")}
          className="border rounded-md px-4 py-2 text-sm font-medium"
        >
          Go to AI Chat
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Goal Understanding
          </h1>
          <p className="text-sm text-muted-foreground">
            This is how the AI has structured your goal into sub-goals.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-xs underline text-muted-foreground"
          >
            ← Back to chat
          </button>
        </header>

        <section className="border rounded-2xl p-4 md:p-6 bg-card space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Main Goal</h2>
            <p className="font-medium text-sm md:text-base">
              {goal.mainGoal}
            </p>
            <p className="text-xs text-muted-foreground">
              Category: <span className="font-medium">{goal.category}</span>{" "}
              • Priority:{" "}
              <span className="font-medium">{goal.priorityOverall}</span>
              {goal.deadline && (
                <>
                  {" "}
                  • Deadline:{" "}
                  {new Date(goal.deadline).toLocaleDateString()}
                </>
              )}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Sub-goals</h3>
            <ul className="space-y-2 text-sm">
              {goal.subGoals.map((sg) => (
                <li
                  key={sg.id}
                  className="border rounded-md px-3 py-2 flex flex-col gap-1"
                >
                  <span className="font-medium">{sg.title}</span>
                  {sg.description && (
                    <span className="text-xs text-muted-foreground">
                      {sg.description}
                    </span>
                  )}
                  <span className="text-[11px] text-muted-foreground">
                    Priority: {sg.priority} • ~
                    {sg.estimatedHours ?? "?"} hours
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
