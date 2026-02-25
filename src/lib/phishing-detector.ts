import { supabase } from "@/integrations/supabase/client";

export interface AnalysisResult {
  url: string;
  score: number;
  verdict: "safe" | "suspicious" | "dangerous";
  features: FeatureResult[];
  timestamp: Date;
  apiResult?: ApiThreatResult;
}

export interface FeatureResult {
  name: string;
  description: string;
  detected: boolean;
  weight: number;
  category: "url" | "domain" | "content" | "ssl" | "api";
}

export interface ApiThreatResult {
  isPhishing: boolean;
  threats: { type: string; platform: string }[];
  error?: string;
}

const SUSPICIOUS_TLDS = [".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top", ".club", ".work", ".buzz"];
const TRUSTED_DOMAINS = ["google.com", "facebook.com", "amazon.com", "microsoft.com", "apple.com", "github.com", "twitter.com", "linkedin.com", "youtube.com", "netflix.com"];
const PHISHING_KEYWORDS = ["login", "verify", "account", "secure", "update", "confirm", "banking", "paypal", "signin", "password", "credential"];

function runHeuristics(urlString: string): { features: FeatureResult[]; parsedUrl: URL | null } {
  const features: FeatureResult[] = [];
  let url: URL;

  try {
    if (!urlString.startsWith("http")) urlString = "https://" + urlString;
    url = new URL(urlString);
  } catch {
    return {
      features: [{ name: "Invalid URL", description: "The URL format is invalid", detected: true, weight: 80, category: "url" }],
      parsedUrl: null,
    };
  }

  const hostname = url.hostname.toLowerCase();
  const path = url.pathname.toLowerCase();
  const fullUrl = url.href.toLowerCase();

  const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
  features.push({ name: "IP Address URL", description: "Uses IP address instead of domain name", detected: isIP, weight: 25, category: "domain" });

  const hasSuspiciousTLD = SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld));
  features.push({ name: "Suspicious TLD", description: "Uses a commonly abused top-level domain", detected: hasSuspiciousTLD, weight: 15, category: "domain" });

  const subdomainCount = hostname.split(".").length - 2;
  features.push({ name: "Excessive Subdomains", description: `Found ${subdomainCount} subdomains (threshold: 2)`, detected: subdomainCount > 2, weight: 15, category: "domain" });

  features.push({ name: "Excessive URL Length", description: `URL is ${fullUrl.length} characters long`, detected: fullUrl.length > 75, weight: 10, category: "url" });

  features.push({ name: "Contains @ Symbol", description: "URL contains @ which can redirect to a different domain", detected: fullUrl.includes("@"), weight: 20, category: "url" });

  const hasKeywords = PHISHING_KEYWORDS.some(kw => path.includes(kw) || hostname.includes(kw));
  features.push({ name: "Phishing Keywords", description: "Contains common phishing-related keywords", detected: hasKeywords, weight: 10, category: "content" });

  features.push({ name: "Hyphens in Domain", description: "Main domain contains hyphens", detected: hostname.split(".")[0].includes("-"), weight: 8, category: "domain" });

  features.push({ name: "No HTTPS", description: "Site does not use HTTPS encryption", detected: url.protocol !== "https:", weight: 12, category: "ssl" });

  const mimicking = TRUSTED_DOMAINS.some(d => {
    const base = d.split(".")[0];
    return hostname.includes(base) && !hostname.endsWith(d);
  });
  features.push({ name: "Domain Mimicking", description: "Domain appears to mimic a trusted website", detected: mimicking, weight: 25, category: "domain" });

  features.push({ name: "Excessive Special Characters", description: "URL path contains many special characters", detected: (path.match(/[%&=\?]/g) || []).length > 5, weight: 8, category: "url" });

  const isTrusted = TRUSTED_DOMAINS.some(d => hostname === d || hostname.endsWith("." + d));
  features.push({ name: "Trusted Domain", description: "Domain is in the trusted whitelist", detected: isTrusted, weight: -30, category: "domain" });

  return { features, parsedUrl: url };
}

async function checkWithApi(url: string): Promise<ApiThreatResult> {
  try {
    const { data, error } = await supabase.functions.invoke("check-url", {
      body: { url },
    });

    if (error) {
      console.error("Edge function error:", error);
      return { isPhishing: false, threats: [], error: error.message };
    }

    if (data.error) {
      return { isPhishing: false, threats: [], error: data.error };
    }

    return { isPhishing: data.isPhishing, threats: data.threats || [] };
  } catch (e) {
    console.error("API check failed:", e);
    return { isPhishing: false, threats: [], error: "Failed to reach API" };
  }
}

export async function analyzeUrl(urlString: string): Promise<AnalysisResult> {
  if (!urlString.startsWith("http")) urlString = "https://" + urlString;

  // Run heuristics and API check in parallel
  const [heuristicResult, apiResult] = await Promise.all([
    Promise.resolve(runHeuristics(urlString)),
    checkWithApi(urlString),
  ]);

  const features = [...heuristicResult.features];

  // Add API result as a feature
  if (!apiResult.error) {
    features.push({
      name: "Google Safe Browsing",
      description: apiResult.isPhishing
        ? `Threats found: ${apiResult.threats.map(t => t.type).join(", ")}`
        : "No threats detected by Google Safe Browsing",
      detected: apiResult.isPhishing,
      weight: 40,
      category: "api",
    });
  } else {
    features.push({
      name: "Google Safe Browsing",
      description: `API check unavailable: ${apiResult.error}`,
      detected: false,
      weight: 0,
      category: "api",
    });
  }

  const rawScore = features.reduce((sum, f) => sum + (f.detected ? f.weight : 0), 0);
  const score = Math.max(0, Math.min(100, rawScore));
  const verdict: AnalysisResult["verdict"] = score >= 50 ? "dangerous" : score >= 25 ? "suspicious" : "safe";

  return { url: urlString, score, verdict, features, timestamp: new Date(), apiResult };
}
