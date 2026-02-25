import { motion } from "framer-motion";
import type { AnalysisResult } from "@/lib/phishing-detector";

interface ThreatMeterProps {
  result: AnalysisResult;
}

const ThreatMeter = ({ result }: ThreatMeterProps) => {
  const getColor = () => {
    if (result.verdict === "safe") return "text-safe";
    if (result.verdict === "suspicious") return "text-warning";
    return "text-destructive";
  };

  const getGlow = () => {
    if (result.verdict === "safe") return "border-glow-safe";
    if (result.verdict === "suspicious") return "border-glow-warning";
    return "border-glow-danger";
  };

  const getBorderColor = () => {
    if (result.verdict === "safe") return "border-safe/30";
    if (result.verdict === "suspicious") return "border-warning/30";
    return "border-destructive/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center gap-4 p-8 rounded-lg border bg-card ${getBorderColor()} ${getGlow()}`}
    >
      <p className="text-sm text-muted-foreground font-sans uppercase tracking-widest">Threat Level</p>

      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={result.verdict === "safe" ? "hsl(var(--safe))" : result.verdict === "suspicious" ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - result.score / 100) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-3xl font-bold font-sans ${getColor()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {result.score}
          </motion.span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      <motion.span
        className={`text-lg font-sans font-bold uppercase tracking-wider ${getColor()}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {result.verdict}
      </motion.span>
    </motion.div>
  );
};

export default ThreatMeter;
