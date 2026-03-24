import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal, Filter, Download, DollarSign, AlertTriangle, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const categoryLabels: Record<string, string> = {
  consumables: "Consumables",
  spare_parts: "Spare Parts",
  tools: "Tools",
};

const categoryColors: Record<string, string> = {
  consumables: "bg-primary/15 text-primary",
  spare_parts: "bg-warning/15 text-warning",
  tools: "bg-info/15 text-info",
};

const summaryCards = [
  { label: "Total Valuation", value: "$124,500", icon: DollarSign, color: "text-success" },
  { label: "Low Stock Alerts", value: "12 items", icon: AlertTriangle, color: "text-warning" },
  { label: "Active Suppliers", value: "28 partners", icon: Truck, color: "text-info" },
];

export default function Inventory() {
  const { data: inventoryData = [], isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select("*").order("item_id");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-1">Stock and supply management</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="h-9 px-4 rounded-lg bg-primary/15 text-primary text-sm font-medium flex items-center gap-1.5 hover:bg-primary/25 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-x-auto">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading inventory...</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground text-left">
                <th className="pb-3 font-medium">Item ID</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Stock Level</th>
                <th className="pb-3 font-medium">Min Threshold</th>
                <th className="pb-3 font-medium">Supplier</th>
                <th className="pb-3 font-medium">Last Restocked</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => {
                const pct = Math.min(100, (item.stock / item.min_threshold) * 100);
                const barColor = pct < 50 ? "bg-destructive" : pct < 100 ? "bg-warning" : "bg-success";
                return (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 font-mono text-xs">{item.item_id}</td>
                    <td className="py-3 text-foreground font-medium">{item.name}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                        {categoryLabels[item.category] || item.category}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{item.stock}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{item.min_threshold}</td>
                    <td className="py-3 text-muted-foreground">{item.supplier}</td>
                    <td className="py-3 text-muted-foreground">{item.last_restocked ? new Date(item.last_restocked).toLocaleDateString() : "—"}</td>
                    <td className="py-3">
                      <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${c.color}`}>
              <c.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="text-xl font-bold text-foreground">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
