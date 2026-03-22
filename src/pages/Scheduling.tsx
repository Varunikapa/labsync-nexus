import { useState } from "react";
import { Plus, AlertTriangle, X } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const bookings = [
  { day: 0, start: 1, dur: 2, lab: "Biochemistry", faculty: "Dr. Chen", color: "bg-primary/25 border-primary/40" },
  { day: 0, start: 5, dur: 1, lab: "Physics", faculty: "Prof. Kumar", color: "bg-info/20 border-info/40" },
  { day: 1, start: 0, dur: 3, lab: "Comp Science", faculty: "Dr. Patel", color: "bg-success/20 border-success/40" },
  { day: 1, start: 4, dur: 2, lab: "Electronics", faculty: "Prof. Lee", color: "bg-warning/20 border-warning/40" },
  { day: 2, start: 2, dur: 2, lab: "Chemistry", faculty: "Dr. Adams", color: "bg-primary/25 border-primary/40" },
  { day: 3, start: 0, dur: 2, lab: "Biochemistry", faculty: "Dr. Chen", color: "bg-info/20 border-info/40" },
  { day: 3, start: 3, dur: 3, lab: "Robotics", faculty: "Prof. Wang", color: "bg-success/20 border-success/40" },
  { day: 4, start: 1, dur: 2, lab: "Physics", faculty: "Dr. Foster", color: "bg-warning/20 border-warning/40" },
];

export default function Scheduling() {
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState("1");
  const [showConflict, setShowConflict] = useState(false);
  const [selectedLab, setSelectedLab] = useState("");

  const handleLabChange = (val: string) => {
    setSelectedLab(val);
    setShowConflict(val === "Biochemistry");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scheduling</h1>
          <p className="text-muted-foreground text-sm mt-1">Weekly lab booking calendar</p>
        </div>
        <button onClick={() => setShowModal(true)} className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card border border-border rounded-xl p-5 overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1">
            <div />
            {days.map((d) => (
              <div key={d} className="text-center text-sm font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {hours.map((h, hi) => (
              <>
                <div key={h} className="text-xs text-muted-foreground flex items-center justify-end pr-3 h-16">{h}</div>
                {days.map((_, di) => {
                  const booking = bookings.find((b) => b.day === di && hi >= b.start && hi < b.start + b.dur);
                  const isStart = booking && hi === booking.start;
                  return (
                    <div key={`${di}-${hi}`} className="border border-border/30 rounded-md h-16 relative">
                      {isStart && (
                        <div className={`absolute inset-0 ${booking.color} border rounded-md p-2 z-10`}
                          style={{ height: `${booking.dur * 68 - 4}px` }}>
                          <p className="text-xs font-medium text-foreground truncate">{booking.lab}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{booking.faculty}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">New Laboratory Booking</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            {showConflict && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Booking conflict detected for Biochemistry at this time slot.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Laboratory</label>
                <select value={selectedLab} onChange={(e) => handleLabChange(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select lab...</option>
                  {["Biochemistry", "Physics", "Electronics", "Comp Science", "Robotics", "Chemistry"].map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Faculty Member</label>
                <input placeholder="Enter faculty name" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Subject / Course</label>
                <input placeholder="Enter subject" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Duration</label>
                <div className="flex gap-2">
                  {["1", "2", "3"].map((d) => (
                    <button key={d} onClick={() => setDuration(d)} className={`flex-1 h-10 rounded-lg text-sm font-medium transition-colors ${
                      duration === d ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
                    }`}>
                      {d} Hr{d !== "1" ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Date</label>
                  <input type="date" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Start Time</label>
                  <input type="time" className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg bg-secondary border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
