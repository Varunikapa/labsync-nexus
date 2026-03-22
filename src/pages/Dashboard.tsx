import { TrendingUp, TrendingDown, Monitor, CheckCircle, AlertTriangle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Equipment", value: "240", change: "+12%", up: true, icon: Monitor },
  { label: "Available", value: "187", change: "+5.2%", up: true, icon: CheckCircle },
  { label: "Maintenance", value: "23", change: "+8.1%", up: false, icon: AlertTriangle },
  { label: "Active Today", value: "6", change: "+2", up: true, icon: Activity },
];

const labs = ["Biochemistry", "Physics", "Electronics", "Comp Sci", "Robotics", "Chemistry"];
const timeSlots = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const heatmapData: number[][] = [
  [0, 1, 3, 3, 2, 1, 2, 3, 1, 0],
  [1, 2, 2, 3, 3, 2, 1, 1, 0, 0],
  [0, 0, 1, 2, 2, 3, 3, 2, 1, 0],
  [2, 3, 3, 2, 1, 1, 2, 3, 3, 2],
  [0, 1, 1, 2, 3, 3, 2, 1, 0, 0],
  [1, 2, 3, 3, 2, 2, 1, 1, 2, 1],
];

const heatColors = ["bg-secondary", "bg-primary/20", "bg-primary/45", "bg-primary/80"];

const weeklyUsage = [
  { day: "Mon", usage: 72 }, { day: "Tue", usage: 85 }, { day: "Wed", usage: 68 },
  { day: "Thu", usage: 91 }, { day: "Fri", usage: 78 }, { day: "Sat", usage: 32 }, { day: "Sun", usage: 15 },
];

const riskEquipment = [
  { id: "EQ-001", lab: "Biochemistry", type: "Centrifuge", usage: 94, lastMaint: 45, risk: 92, status: "High Risk" },
  { id: "EQ-017", lab: "Chemistry", type: "Fume Hood", usage: 88, lastMaint: 38, risk: 85, status: "High Risk" },
  { id: "EQ-042", lab: "Physics", type: "Oscilloscope", usage: 76, lastMaint: 30, risk: 68, status: "Medium" },
  { id: "EQ-089", lab: "Electronics", type: "Soldering Station", usage: 71, lastMaint: 25, risk: 55, status: "Medium" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Laboratory resource overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground text-sm">{s.label}</span>
              <s.icon className="w-5 h-5 text-primary/60" />
            </div>
            <div className="text-3xl font-bold text-foreground">{s.value}</div>
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>
              {s.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {s.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap + Weekly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Lab Occupancy Heatmap</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex">
                <div className="w-24" />
                {timeSlots.map((t) => (
                  <div key={t} className="flex-1 text-center text-xs text-muted-foreground pb-2">{t}</div>
                ))}
              </div>
              {labs.map((lab, li) => (
                <div key={lab} className="flex items-center gap-0 mb-1">
                  <div className="w-24 text-xs text-muted-foreground truncate pr-2">{lab}</div>
                  {heatmapData[li].map((val, ti) => (
                    <div key={ti} className="flex-1 px-0.5">
                      <div className={`h-8 rounded-sm ${heatColors[val]} transition-colors`} />
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <span>Empty</span>
                {heatColors.map((c, i) => (
                  <div key={i} className={`w-6 h-3 rounded-sm ${c}`} />
                ))}
                <span>Full</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-1">Weekly Lab Usage</h2>
          <p className="text-xs text-muted-foreground mb-4">Avg. 63% daily usage</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(232,25%,18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(225,15%,55%)", fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(225,15%,55%)", fontSize: 12 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(232,38%,11%)", border: "1px solid hsl(232,25%,18%)", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="usage" fill="hsl(244,85%,69%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Table */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Fault Prediction — High Risk Equipment</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Lab / Type</th>
                <th className="pb-3 font-medium">Usage Intensity</th>
                <th className="pb-3 font-medium">Last Maint.</th>
                <th className="pb-3 font-medium">Risk Score</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {riskEquipment.map((eq) => (
                <tr key={eq.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 font-mono text-xs text-foreground">{eq.id}</td>
                  <td className="py-3"><span className="text-foreground">{eq.lab}</span> <span className="text-muted-foreground">/ {eq.type}</span></td>
                  <td className="py-3">{eq.usage}%</td>
                  <td className="py-3 text-muted-foreground">{eq.lastMaint} days</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${eq.risk >= 80 ? "bg-destructive" : "bg-warning"}`}
                          style={{ width: `${eq.risk}%` }}
                        />
                      </div>
                      <span className="text-xs">{eq.risk}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      eq.status === "High Risk" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                    }`}>
                      {eq.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="px-3 py-1.5 text-xs bg-primary/15 text-primary rounded-lg hover:bg-primary/25 transition-colors font-medium">
                      Schedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
