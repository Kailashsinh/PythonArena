import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, AlertTriangle, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Verdict = "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error" | "Running";

interface VerdictModalProps {
  isOpen: boolean;
  onClose: () => void;
  verdict: Verdict | null;
  output?: string;
  expectedOutput?: string;
  executionTime?: number;
  error?: string;
}

const verdictConfig = {
  "Accepted": {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    message: "All test cases passed!",
  },
  "Wrong Answer": {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    message: "Your output doesn't match the expected output.",
  },
  "Time Limit Exceeded": {
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    message: "Your code took too long to execute.",
  },
  "Runtime Error": {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    message: "Your code encountered an error during execution.",
  },
  "Running": {
    icon: Loader2,
    color: "text-python-yellow",
    bg: "bg-python-yellow/10",
    border: "border-python-yellow/30",
    message: "Executing your code...",
  },
};

export function VerdictModal({ 
  isOpen, 
  onClose, 
  verdict, 
  output, 
  expectedOutput,
  executionTime,
  error 
}: VerdictModalProps) {
  if (!verdict) return null;
  
  const config = verdictConfig[verdict];
  const Icon = config.icon;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-lg mx-4 rounded-xl border ${config.border} ${config.bg} p-6 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {verdict !== "Running" && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            
            <div className="flex flex-col items-center text-center gap-4">
              <Icon className={`h-16 w-16 ${config.color} ${verdict === "Running" ? "animate-spin" : ""}`} />
              
              <div>
                <h2 className={`text-2xl font-bold ${config.color}`}>
                  {verdict}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {config.message}
                </p>
              </div>
              
              {executionTime !== undefined && verdict !== "Running" && (
                <p className="text-sm text-muted-foreground">
                  Execution time: <span className="font-mono">{executionTime}ms</span>
                </p>
              )}
              
              {error && (
                <div className="w-full mt-2">
                  <p className="text-sm font-semibold text-destructive mb-2">Error:</p>
                  <pre className="w-full p-3 rounded-lg bg-background border border-border text-sm font-mono text-destructive overflow-x-auto text-left">
                    {error}
                  </pre>
                </div>
              )}
              
              {verdict === "Wrong Answer" && output && expectedOutput && (
                <div className="w-full mt-2 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-left">Your Output:</p>
                    <pre className="w-full p-3 rounded-lg bg-background border border-border text-sm font-mono text-foreground overflow-x-auto text-left">
                      {output || "(empty)"}
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2 text-left">Expected Output:</p>
                    <pre className="w-full p-3 rounded-lg bg-background border border-border text-sm font-mono text-success overflow-x-auto text-left">
                      {expectedOutput}
                    </pre>
                  </div>
                </div>
              )}
              
              {verdict !== "Running" && (
                <Button onClick={onClose} variant="outline" className="mt-4">
                  Close
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
