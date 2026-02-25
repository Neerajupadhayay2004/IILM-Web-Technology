import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { FeatureResult } from "@/lib/phishing-detector";

interface FeatureTableProps {
  features: FeatureResult[];
}

const categoryIcons: Record<string, string> = {
  url: "🔗",
  domain: "🌐",
  content: "📄",
  ssl: "🔒",
  api: "☁️",
};

const FeatureTable = ({ features }: FeatureTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full rounded-lg border border-border bg-card overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-sans font-semibold text-foreground">Feature Analysis</h3>
        <p className="text-xs text-muted-foreground mt-1">Detailed breakdown of URL characteristics</p>
      </div>

      <div className="divide-y divide-border">
        {features.map((feature, i) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="flex items-center gap-4 px-6 py-3 hover:bg-muted/30 transition-colors"
          >
            <span className="text-lg">{categoryIcons[feature.category]}</span>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-sans font-medium text-foreground">{feature.name}</p>
              <p className="text-xs text-muted-foreground truncate">{feature.description}</p>
            </div>

            <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-muted">
              {feature.weight > 0 ? "+" : ""}{feature.weight}
            </span>

            {feature.detected ? (
              feature.weight < 0 ? (
                <CheckCircle2 className="h-5 w-5 text-safe shrink-0" />
              ) : feature.weight >= 20 ? (
                <XCircle className="h-5 w-5 text-destructive shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
              )
            ) : (
              <CheckCircle2 className="h-5 w-5 text-muted-foreground/30 shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureTable;
