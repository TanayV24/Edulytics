import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Calendar, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const InstitutionLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("student.xyz@academy.edu");
  const [password, setPassword] = useState("DemoStudent123!");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) {
      setError("Invalid demo credentials");
      return;
    }
    navigate("/institution/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-institution/10 rounded-full blur-3xl top-20 -left-20 animate-float" />
        <div className="absolute w-96 h-96 bg-institution/5 rounded-full blur-3xl bottom-20 -right-20 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Login Form */}
          <GlassCard className="max-w-md mx-auto w-full animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back to your
              </h1>
              <h2 className="text-3xl font-bold text-institution">
                Institution Space
              </h2>
              <p className="text-muted-foreground mt-3">
                Access your master timetables, manage tasks, and oversee your institution's schedule.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email or Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@institution.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input border-border focus:border-institution transition-colors"
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
                    className="pl-10 bg-input border-border focus:border-institution transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-institution to-institution-glow hover:opacity-90 transition-opacity shadow-lg shadow-institution/30"
                size="lg"
              >
                Log In to Institution
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </GlassCard>

          {/* Right - Stats & Preview */}
          <div className="space-y-6">
            {/* Utilization Card */}
            <GlassCard hover>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Timetable Utilization</p>
                  <p className="text-2xl font-bold text-foreground">89%</p>
                </div>
                <div className="p-3 rounded-2xl bg-institution/20">
                  <Calendar className="w-6 h-6 text-institution" />
                </div>
              </div>
              <ProgressBar value={89} />
              <p className="text-xs text-muted-foreground mt-2">
                Based on active sessions across all departments this week.
              </p>
            </GlassCard>

            {/* Network Card */}
            <GlassCard hover>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-institution/20">
                  <Users className="w-6 h-6 text-institution" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Teacher Network</h3>
                  <p className="text-sm text-muted-foreground mb-4">Connected</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-muted rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionLogin;
