import { useState } from "react";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";

const labsData = [
  { name: "Biochemistry", status: "ACTIVE", equipment: 42, seats: "38/40", usage: 95 },
  { name: "Physics", status: "ACTIVE", equipment: 35, seats: "28/35", usage: 80 },
  { name: "Electronics", status: "ACTIVE", equipment: 48, seats: "30/40", usage: 75 },
  { name: "Comp Science", status: "ACTIVE", equipment: 60, seats: "55/60", usage: 92 },
  { name: "Robotics", status: "CLOSED", equipment: 25, seats: "0/30", usage: 0 },
  { name: "Chemistry", status: "ACTIVE", equipment: 30, seats: "22/30", usage: 73 },
];

const equipmentData = [
  { id: "EQ-001", name: "Centrifuge X200", type: "Analysis", status: "Available", hours: 1240, maintained: "2024-01-15", risk: "Low" },
  { id: "EQ-002", name: "Spectrophotometer", type: "Analysis", status: "In Use", hours: 890, maintained: "2024-02-01", risk: "Low" },
  { id: "EQ-003", name: "PCR Machine", type: "Synthesis", status: "Available", hours: 2100, maintained: "2024-01-20", risk: "Medium" },
  { id: "EQ-004", name: "Autoclave Unit", type: "Sterilization", status: "Faulty", hours: 3200, maintained: "2023-11-10", risk: "High" },
  { id: "EQ-005", name: "Microscope Array", type: "Imaging", status: "In Use", hours: 560, maintained: "2024-02-10", risk: "Low" },
  { id: "EQ-006", name: "Fume Hood B3", type: "Safety", status: "Available", hours: 4100, maintained: "2023-12-05", risk: "Medium" },
];

const statusColors: Record<string, string> = {
  Available: "text-success",
  "In Use": "text-info",
  Faulty: "text-destructive",
};

const riskColors: Record<string, string> = {
  Low: "bg-success/15 text-success",
  Medium: "bg-warning/15 text-warning",
  High: "bg-destructive/15 text-destructive",
};

export default function Labs() {
  const [selectedLab, setSelectedLab] = useState("Biochemistry");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Labs & Equipment</h1>
          <p className="text-muted-foreground text-sm mt-1">Laboratory overview and equipment management</p>
        </div>
      </div>

      {/* Lab Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labsData.map((lab) => (
          <button
            key={lab.name}
            onClick={() => setSelectedLab(lab.name)}
            className={`bg-card border rounded-xl p-5 text-left transition-all hover:border-primary/40 ${
              selectedLab === lab.name ? "border-primary" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{lab.name}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                lab.status === "ACTIVE" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
              }`}>
                {lab.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">{lab.equipment} equipment</p>
                <p className="text-muted-foreground">Seats: {lab.seats}</p>
              </div>
              {/* Progress Ring */}
              <div className="relative w-14 h-14">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(232,25%,18%)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke="hsl(244,85%,69%)" strokeWidth="3"
                    strokeDasharray={`${lab.usage} ${100 - lab.usage}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">{lab.usage}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Equipment Table */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-base font-semibold text-foreground">Equipment Inventory — {selectedLab}</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search equipment..." className="h-9 pl-9 pr-4 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <button className="h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Status
            </button>
            <button className="h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Risk
            </button>
            <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Usage Hrs</th>
                <th className="pb-3 font-medium">Last Maintained</th>
                <th className="pb-3 font-medium">Risk Level</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {equipmentData.map((eq) => (
                <tr key={eq.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 font-mono text-xs">{eq.id}</td>
                  <td className="py-3 text-foreground font-medium">{eq.name}</td>
                  <td className="py-3 text-muted-foreground">{eq.type}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${statusColors[eq.status].replace("text-", "bg-")}`} />
                      <span className={statusColors[eq.status]}>{eq.status}</span>
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{eq.hours.toLocaleString()}</td>
                  <td className="py-3 text-muted-foreground">{eq.maintained}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${riskColors[eq.risk]}`}>{eq.risk}</span>
                  </td>
                  <td className="py-3">
                    <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
                      <MoreHorizontal className="w-4 h-4" />
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
