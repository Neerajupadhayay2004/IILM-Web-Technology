import { motion } from "framer-motion";
import { Clock, ExternalLink } from "lucide-react";
import type { AnalysisResult } from "@/lib/phishing-detector";

interface ScanHistoryProps {
  history: AnalysisResult[];
  onSelect: (result: AnalysisResult) => void;
}

const ScanHistory = ({ history, onSelect }: ScanHistoryProps) => {
  if (history.length === 0) return null;

  const getVerdictColor = (verdict: string) => {
    if (verdict === "safe") return "text-safe";
    if (verdict === "suspicious") return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto rounded-lg border border-border bg-card"
    >
      <div className="px-6 py-4 border-b border-border flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-sans font-semibold text-foreground text-sm">Recent Scans</h3>
      </div>

      <div className="divide-y divide-border max-h-60 overflow-y-auto">
        {history.map((result, i) => (
          <button
            key={i}
            onClick={() => onSelect(result)}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-muted/30 transition-colors text-left"
          >
            <span className={`text-xs font-mono font-bold uppercase ${getVerdictColor(result.verdict)}`}>
              {result.verdict}
            </span>
            <span className="flex-1 text-sm text-foreground truncate font-mono">{result.url}</span>
            <span className="text-xs text-muted-foreground">{result.score}/100</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ScanHistory;
