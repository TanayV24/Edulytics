import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PersonalLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo.personal@edulytics.app");
  const [password, setPassword] = useState("DemoPersonal123!");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) {
      setError("Invalid demo credentials");
      return;
    }
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-personal/10 rounded-full blur-3xl top-20 left-1/4 animate-float" />
        <div className="absolute w-96 h-96 bg-personal/5 rounded-full blur-3xl bottom-20 right-1/4 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <GlassCard className="max-w-md w-full mx-4 animate-fade-in relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back,
          </h1>
          <h2 className="text-3xl font-bold text-personal">
            Learner
          </h2>
          <p className="text-muted-foreground mt-3">
            Continue your personalized learning journey and achieve your goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="learner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-input border-border focus:border-personal transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-input border-border focus:border-personal transition-colors"
              />
            </div>
          </div>

          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-personal transition-colors"
          >
            Forgot Password?
          </button>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-personal to-personal-glow hover:opacity-90 transition-opacity shadow-lg shadow-personal/30"
            size="lg"
          >
            Log In
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <button
              onClick={() => navigate("/personal/signup")}
              className="text-personal hover:text-personal-glow transition-colors font-medium"
            >
              Create account
            </button>
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default PersonalLogin;
