import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Terminal } from "lucide-react";
import ScannerInput from "@/components/ScannerInput";
import ThreatMeter from "@/components/ThreatMeter";
import FeatureTable from "@/components/FeatureTable";
import ScanHistory from "@/components/ScanHistory";
import StatsBar from "@/components/StatsBar";
import { analyzeUrl, type AnalysisResult } from "@/lib/phishing-detector";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  const handleScan = useCallback(async (url: string) => {
    setIsScanning(true);
    setCurrentResult(null);

    const result = await analyzeUrl(url);
    setCurrentResult(result);
    setHistory((prev) => [result, ...prev].slice(0, 20));
    setIsScanning(false);
  }, []);

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl flex items-center gap-3 py-4">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="font-sans font-bold text-foreground text-lg">
            Phish<span className="text-gradient-primary">Guard</span>
          </h1>
          <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
            <Terminal className="h-3 w-3" /> ML-Powered Detection
          </span>
        </div>
      </header>

      <main className="container max-w-4xl py-12 space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground">
            Detect <span className="text-gradient-primary">Phishing</span> Websites
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Analyze URLs using machine learning heuristics to identify potential phishing threats in real-time.
          </p>
        </motion.div>

        {/* Scanner */}
        <ScannerInput onScan={handleScan} isScanning={isScanning} />

        {/* Stats */}
        {history.length > 0 && <StatsBar history={history} />}

        {/* Results */}
        <AnimatePresence mode="wait">
          {currentResult && (
            <motion.div
              key={currentResult.url + currentResult.timestamp.getTime()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <ThreatMeter result={currentResult} />
                <div className="flex-1">
                  <FeatureTable features={currentResult.features} />
                </div>
              </div>

              {/* Scanned URL */}
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="text-xs text-muted-foreground mb-1">Scanned URL</p>
                <p className="text-sm text-foreground font-mono break-all">{currentResult.url}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        <ScanHistory history={history} onSelect={setCurrentResult} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container max-w-4xl text-center">
          <p className="text-xs text-muted-foreground">
            PhishGuard combines heuristic analysis with Google Safe Browsing API for real-time threat detection.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
