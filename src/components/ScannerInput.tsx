import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield } from "lucide-react";

interface ScannerInputProps {
  onScan: (url: string) => void;
  isScanning: boolean;
}

const ScannerInput = ({ onScan, isScanning }: ScannerInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onScan(url.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className={`relative rounded-lg border border-border bg-card transition-all duration-300 ${isScanning ? "border-glow" : "hover:border-primary/50"}`}>
        <div className="flex items-center gap-3 px-4 py-3">
          <Shield className="h-5 w-5 text-primary shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to scan (e.g., https://example.com)"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none font-mono"
            disabled={isScanning}
          />
          <button
            type="submit"
            disabled={isScanning || !url.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-sans font-semibold transition-all hover:opacity-90 disabled:opacity-40"
          >
            {isScanning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Search className="h-4 w-4" />
              </motion.div>
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isScanning ? "Scanning..." : "Scan"}
          </button>
        </div>

        {isScanning && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.form>
  );
};

export default ScannerInput;
