import { Download, FileText, Wrench, Building2 } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend,
} from "recharts";

const reportTypes = [
  { title: "Equipment Usage", desc: "Detailed usage statistics for all laboratory equipment over selected time periods.", icon: FileText },
  { title: "Maintenance Summary", desc: "Overview of maintenance activities, costs, and upcoming scheduled tasks.", icon: Wrench },
  { title: "Lab Utilization", desc: "Comprehensive lab space utilization metrics and booking efficiency analysis.", icon: Building2 },
];

const usageOverTime = [
  { day: "Mon", usage: 65 }, { day: "Tue", usage: 78 }, { day: "Wed", usage: 72 },
  { day: "Thu", usage: 85 }, { day: "Fri", usage: 90 }, { day: "Sat", usage: 45 }, { day: "Sun", usage: 30 },
];

const statusBreakdown = [
  { name: "Available", value: 60, color: "hsl(152,60%,50%)" },
  { name: "In Use", value: 25, color: "hsl(244,85%,69%)" },
  { name: "Faulty", value: 15, color: "hsl(0,72%,51%)" },
];

const maintenanceByLab = [
  { lab: "Biochem", high: 8, routine: 15 },
  { lab: "Physics", high: 3, routine: 12 },
  { lab: "Electronics", high: 5, routine: 10 },
  { lab: "Comp Sci", high: 2, routine: 8 },
  { lab: "Robotics", high: 6, routine: 7 },
  { lab: "Chemistry", high: 7, routine: 14 },
];

const chartTooltipStyle = { background: "hsl(232,38%,11%)", border: "1px solid hsl(232,25%,18%)", borderRadius: 8, color: "#fff" };

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports Center</h1>
        <p className="text-muted-foreground text-sm mt-1">Analytics and downloadable reports</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reportTypes.map((r) => (
          <div key={r.title} className="bg-card border border-border rounded-xl p-5">
            <r.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{r.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{r.desc}</p>
            <button className="h-9 px-4 rounded-lg bg-primary/15 text-primary text-sm font-medium flex items-center gap-1.5 hover:bg-primary/25 transition-colors">
              <Download className="w-3.5 h-3.5" /> Download CSV
            </button>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Equipment Usage Over Time</h2>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(232,25%,18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(225,15%,55%)", fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(225,15%,55%)", fontSize: 12 }} axisLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="usage" stroke="hsl(244,85%,69%)" strokeWidth={2} dot={{ fill: "hsl(244,85%,69%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">Equipment Status Breakdown</h2>
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4} strokeWidth={0}>
                  {statusBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {statusBreakdown.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-muted-foreground">{s.name} {s.value}%</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">142 total units</p>
        </div>
      </div>

      {/* Grouped Bar */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">Maintenance Issues by Lab</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={maintenanceByLab}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(232,25%,18%)" />
              <XAxis dataKey="lab" tick={{ fill: "hsl(225,15%,55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(225,15%,55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: "hsl(225,15%,55%)" }} />
              <Bar dataKey="high" name="High Priority" fill="hsl(0,72%,51%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="routine" name="Routine" fill="hsl(244,85%,69%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
