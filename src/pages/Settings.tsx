import { DashboardHeader } from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import { GlassCard } from "@/components/GlassCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Settings as SettingsIcon, Bell, Moon, Globe } from "lucide-react";

const Settings = () => {
  const { mode, role } = useAuth();
  const userRole = role || "student";
  const dashboardMode = mode || "institution";

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-institution/10 rounded-full blur-3xl top-20 -left-20 animate-float" />
        <div className="absolute w-96 h-96 bg-personal/10 rounded-full blur-3xl bottom-20 -right-20 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <DashboardHeader mode={dashboardMode} />

      <div className="flex relative z-10">
        <Sidebar mode={dashboardMode} userRole={userRole} />

        <main className="flex-1 container mx-auto px-6 py-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your preferences</p>
          </div>

          <div className="max-w-2xl space-y-6">
            {/* Notifications */}
            <GlassCard hover className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl ${dashboardMode === "institution" ? "bg-institution/20" : "bg-personal/20"}`}>
                  <Bell className={`w-5 h-5 ${dashboardMode === "institution" ? "text-institution" : "text-personal"}`} />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-card/30">
                  <div className="flex-1">
                    <Label htmlFor="task-notifications" className="text-foreground font-medium">Task Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new tasks and deadlines</p>
                  </div>
                  <Switch id="task-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-card/30">
                  <div className="flex-1">
                    <Label htmlFor="email-notifications" className="text-foreground font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch id="email-notifications" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-card/30">
                  <div className="flex-1">
                    <Label htmlFor="reminder-notifications" className="text-foreground font-medium">Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded before task deadlines</p>
                  </div>
                  <Switch id="reminder-notifications" defaultChecked />
                </div>
              </div>
            </GlassCard>

            {/* Appearance */}
            <GlassCard hover className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl ${dashboardMode === "institution" ? "bg-institution/20" : "bg-personal/20"}`}>
                  <Moon className={`w-5 h-5 ${dashboardMode === "institution" ? "text-institution" : "text-personal"}`} />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-card/30">
                  <div className="flex-1">
                    <Label htmlFor="dark-mode" className="text-foreground font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-card/30">
                  <div className="flex-1">
                    <Label htmlFor="compact-mode" className="text-foreground font-medium">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing for denser layouts</p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
              </div>
            </GlassCard>

            {/* Language & Region */}
            <GlassCard hover className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl ${dashboardMode === "institution" ? "bg-institution/20" : "bg-personal/20"}`}>
                  <Globe className={`w-5 h-5 ${dashboardMode === "institution" ? "text-institution" : "text-personal"}`} />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Language & Region</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card/30">
                  <Label className="text-foreground font-medium mb-2 block">Language</Label>
                  <p className="text-sm text-muted-foreground">English (US)</p>
                </div>

                <div className="p-4 rounded-xl bg-card/30">
                  <Label className="text-foreground font-medium mb-2 block">Time Zone</Label>
                  <p className="text-sm text-muted-foreground">GMT-05:00 Eastern Time</p>
                </div>
              </div>
            </GlassCard>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                className={dashboardMode === "institution" ? "bg-institution hover:bg-institution/90" : "bg-personal hover:bg-personal/90"}
              >
                Save Changes
              </Button>
              <Button variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
