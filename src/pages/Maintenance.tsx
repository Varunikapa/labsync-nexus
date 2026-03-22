import { useState } from "react";
import { Plus, X } from "lucide-react";

const statusFilters = ["All", "Scheduled", "In Progress", "Completed", "Overdue"];

const maintenanceData = [
  { id: "MT-001", equipment: "Centrifuge X200", lab: "Biochemistry", type: "Preventive", status: "Scheduled", date: "2024-03-15", assignee: "Tech. Johnson" },
  { id: "MT-002", equipment: "Fume Hood B3", lab: "Chemistry", type: "Repair", status: "In Progress", date: "2024-03-12", assignee: "Tech. Williams" },
  { id: "MT-003", equipment: "PCR Machine", lab: "Biochemistry", type: "Calibration", status: "Completed", date: "2024-03-10", assignee: "Tech. Davis" },
  { id: "MT-004", equipment: "Oscilloscope", lab: "Physics", type: "Repair", status: "Overdue", date: "2024-03-08", assignee: "Tech. Brown" },
  { id: "MT-005", equipment: "Autoclave Unit", lab: "Chemistry", type: "Preventive", status: "Scheduled", date: "2024-03-18", assignee: "Tech. Johnson" },
  { id: "MT-006", equipment: "3D Printer", lab: "Robotics", type: "Repair", status: "In Progress", date: "2024-03-11", assignee: "Tech. Garcia" },
];

const statusStyles: Record<string, string> = {
  Scheduled: "bg-info/15 text-info",
  "In Progress": "bg-warning/15 text-warning",
  Completed: "bg-success/15 text-success",
  Overdue: "bg-destructive/15 text-destructive",
};

export default function Maintenance() {
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = filter === "All" ? maintenanceData : maintenanceData.filter((m) => m.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maintenance</h1>
          <p className="text-muted-foreground text-sm mt-1">Equipment maintenance tracking</p>
        </div>
        <button onClick={() => setShowModal(true)} className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Report New Issue
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === s ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
            }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-left">
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Equipment</th>
              <th className="pb-3 font-medium">Lab</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-3 font-mono text-xs">{m.id}</td>
                <td className="py-3 text-foreground font-medium">{m.equipment}</td>
                <td className="py-3 text-muted-foreground">{m.lab}</td>
                <td className="py-3 text-muted-foreground">{m.type}</td>
                <td className="py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[m.status]}`}>{m.status}</span></td>
                <td className="py-3 text-muted-foreground">{m.date}</td>
                <td className="py-3 text-muted-foreground">{m.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Report New Issue</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Equipment ID</label>
                <input placeholder="Search equipment ID..." className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Lab Location</label>
                <input placeholder="Enter lab location" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Issue Description</label>
                <textarea rows={3} placeholder="Describe the issue..." className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Reported By</label>
                <input placeholder="Your name" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Severity Level</label>
                <select className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Low Priority</option>
                  <option>Medium Priority</option>
                  <option>High Priority</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg bg-secondary border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
