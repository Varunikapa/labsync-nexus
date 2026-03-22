import { MoreHorizontal, Filter, Download, DollarSign, AlertTriangle, Truck } from "lucide-react";

const inventoryData = [
  { id: "INV-001", name: "Pipette Tips (1000μL)", category: "Consumables", stock: 85, min: 100, supplier: "LabCorp Inc.", restocked: "2024-03-01" },
  { id: "INV-002", name: "Soldering Iron Tips", category: "Spare Parts", stock: 23, min: 20, supplier: "TechParts Co.", restocked: "2024-02-15" },
  { id: "INV-003", name: "Digital Multimeter", category: "Tools", stock: 12, min: 5, supplier: "ElectroniX", restocked: "2024-01-20" },
  { id: "INV-004", name: "Petri Dishes (100mm)", category: "Consumables", stock: 45, min: 200, supplier: "BioSupply Ltd.", restocked: "2024-02-28" },
  { id: "INV-005", name: "Oscilloscope Probes", category: "Spare Parts", stock: 8, min: 10, supplier: "WaveTech", restocked: "2024-01-10" },
  { id: "INV-006", name: "Safety Goggles", category: "Consumables", stock: 150, min: 50, supplier: "SafetyFirst", restocked: "2024-03-05" },
  { id: "INV-007", name: "Hex Key Set", category: "Tools", stock: 30, min: 10, supplier: "ToolMaster", restocked: "2024-02-20" },
];

const categoryColors: Record<string, string> = {
  Consumables: "bg-primary/15 text-primary",
  "Spare Parts": "bg-warning/15 text-warning",
  Tools: "bg-info/15 text-info",
};

const summaryCards = [
  { label: "Total Valuation", value: "$124,500", icon: DollarSign, color: "text-success" },
  { label: "Low Stock Alerts", value: "12 items", icon: AlertTriangle, color: "text-warning" },
  { label: "Active Suppliers", value: "28 partners", icon: Truck, color: "text-info" },
];

export default function Inventory() {
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
              const pct = Math.min(100, (item.stock / item.min) * 100);
              const barColor = pct < 50 ? "bg-destructive" : pct < 100 ? "bg-warning" : "bg-success";
              return (
                <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 font-mono text-xs">{item.id}</td>
                  <td className="py-3 text-foreground font-medium">{item.name}</td>
                  <td className="py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>{item.category}</span></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.stock}</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{item.min}</td>
                  <td className="py-3 text-muted-foreground">{item.supplier}</td>
                  <td className="py-3 text-muted-foreground">{item.restocked}</td>
                  <td className="py-3">
                    <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
