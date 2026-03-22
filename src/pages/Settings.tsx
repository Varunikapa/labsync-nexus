import { useState } from "react";
import { Moon, Sun, Zap, TreePine } from "lucide-react";

const themes = [
  { name: "Midnight", icon: Moon, active: true },
  { name: "Daylight", icon: Sun, active: false },
  { name: "Cyber", icon: Zap, active: false },
  { name: "Forest", icon: TreePine, active: false },
];

export default function SettingsPage() {
  const [riskThreshold, setRiskThreshold] = useState(75);
  const [refreshRate, setRefreshRate] = useState("Real-time");
  const [selectedTheme, setSelectedTheme] = useState("Midnight");
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [maintUpdates, setMaintUpdates] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and system preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground">Profile Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
            <input defaultValue="Dr. Sarah Chen" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <input defaultValue="s.chen@labsync.edu" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Role</label>
            <select defaultValue="Lab Director" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Lab Director</option>
              <option>Researcher</option>
              <option>Technician</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground">Notification Preferences</h2>
        <div className="space-y-3">
          {[
            { label: "High Risk Alerts", desc: "Get notified when equipment risk score exceeds threshold", value: highRiskAlerts, set: setHighRiskAlerts },
            { label: "Maintenance Updates", desc: "Receive updates on scheduled maintenance activities", value: maintUpdates, set: setMaintUpdates },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <button onClick={() => n.set(!n.value)}
                className={`w-11 h-6 rounded-full transition-colors relative ${n.value ? "bg-primary" : "bg-secondary border border-border"}`}>
                <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-0.5 transition-transform ${n.value ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-foreground">System Configuration</h2>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-foreground">AI Risk Score Threshold</p>
              <p className="text-xs text-muted-foreground">Equipment above this score will be flagged for maintenance</p>
            </div>
            <span className="text-sm font-semibold text-primary">{riskThreshold}%</span>
          </div>
          <input type="range" min="0" max="100" value={riskThreshold} onChange={(e) => setRiskThreshold(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Data Refresh Rate</p>
          <div className="flex gap-2">
            {["Real-time", "5 Minutes", "15 Minutes"].map((r) => (
              <button key={r} onClick={() => setRefreshRate(r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  refreshRate === r ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground">Theme Settings</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {themes.map((t) => (
            <button key={t.name} onClick={() => setSelectedTheme(t.name)}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                selectedTheme === t.name ? "border-primary bg-primary/10" : "border-border bg-secondary hover:border-primary/30"
              }`}>
              <t.icon className={`w-6 h-6 ${selectedTheme === t.name ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${selectedTheme === t.name ? "text-foreground" : "text-muted-foreground"}`}>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button className="h-10 px-6 rounded-lg bg-secondary border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Discard Changes
        </button>
        <button className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
