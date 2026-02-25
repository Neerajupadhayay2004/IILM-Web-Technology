import { motion } from "framer-motion";
import { Shield, AlertTriangle, XCircle, Activity } from "lucide-react";
import type { AnalysisResult } from "@/lib/phishing-detector";

interface StatsBarProps {
  history: AnalysisResult[];
}

const StatsBar = ({ history }: StatsBarProps) => {
  const total = history.length;
  const safe = history.filter(r => r.verdict === "safe").length;
  const suspicious = history.filter(r => r.verdict === "suspicious").length;
  const dangerous = history.filter(r => r.verdict === "dangerous").length;

  const stats = [
    { label: "Total Scans", value: total, icon: Activity, color: "text-primary" },
    { label: "Safe", value: safe, icon: Shield, color: "text-safe" },
    { label: "Suspicious", value: suspicious, icon: AlertTriangle, color: "text-warning" },
    { label: "Dangerous", value: dangerous, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card"
        >
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
          <div>
            <p className="text-xl font-sans font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBar;
