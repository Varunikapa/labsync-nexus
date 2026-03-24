import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const statusColors: Record<string, string> = {
  available: "text-success",
  in_use: "text-info",
  faulty: "text-destructive",
  maintenance: "text-warning",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  in_use: "In Use",
  faulty: "Faulty",
  maintenance: "Maintenance",
};

const riskColors: Record<string, string> = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive",
};

export default function Labs() {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);

  const { data: labsData = [] } = useQuery({
    queryKey: ["labs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("labs").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const activeLab = selectedLabId || labsData[0]?.id;

  const { data: equipmentData = [] } = useQuery({
    queryKey: ["equipment", activeLab],
    queryFn: async () => {
      if (!activeLab) return [];
      const { data, error } = await supabase.from("equipment").select("*").eq("lab_id", activeLab).order("equipment_id");
      if (error) throw error;
      return data;
    },
    enabled: !!activeLab,
  });

  const selectedLabName = labsData.find((l) => l.id === activeLab)?.name || "";

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
        {labsData.map((lab) => {
          const usage = lab.seats_total > 0 ? Math.round((lab.seats_occupied / lab.seats_total) * 100) : 0;
          return (
            <button
              key={lab.id}
              onClick={() => setSelectedLabId(lab.id)}
              className={`bg-card border rounded-xl p-5 text-left transition-all hover:border-primary/40 ${
                activeLab === lab.id ? "border-primary" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{lab.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                  lab.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  {lab.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">{lab.equipment_count} equipment</p>
                  <p className="text-muted-foreground">Seats: {lab.seats_occupied}/{lab.seats_total}</p>
                </div>
                <div className="relative w-14 h-14">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(232,25%,18%)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(244,85%,69%)" strokeWidth="3"
                      strokeDasharray={`${usage} ${100 - usage}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">{usage}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Equipment Table */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-base font-semibold text-foreground">Equipment Inventory — {selectedLabName}</h2>
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
              {equipmentData.map((eq) => {
                const statusLabel = statusLabels[eq.status] || eq.status;
                const statusColor = statusColors[eq.status] || "text-muted-foreground";
                const riskColor = riskColors[eq.risk_level] || "bg-muted text-muted-foreground";
                return (
                  <tr key={eq.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 font-mono text-xs">{eq.equipment_id}</td>
                    <td className="py-3 text-foreground font-medium">{eq.name}</td>
                    <td className="py-3 text-muted-foreground">{eq.type}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${statusColor.replace("text-", "bg-")}`} />
                        <span className={statusColor}>{statusLabel}</span>
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{Number(eq.usage_hours).toLocaleString()}</td>
                    <td className="py-3 text-muted-foreground">{eq.last_maintained ? new Date(eq.last_maintained).toLocaleDateString() : "—"}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${riskColor}`}>{eq.risk_level}</span>
                    </td>
                    <td className="py-3">
                      <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {equipmentData.length === 0 && (
                <tr><td colSpan={8} className="py-6 text-center text-muted-foreground">No equipment found for this lab.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
