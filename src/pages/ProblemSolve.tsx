import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Send, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { CodeEditor } from "@/components/CodeEditor";
import { VerdictModal, type Verdict } from "@/components/VerdictModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProblemById } from "@/data/problems";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function ProblemSolve() {
  const { id } = useParams<{ id: string }>();
  const problem = getProblemById(id || "");
  
  const [code, setCode] = useState(problem?.starterCode || "");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [output, setOutput] = useState<string>("");
  const [expectedOutput, setExpectedOutput] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  useEffect(() => {
    if (problem) {
      
      const savedCode = localStorage.getItem(`code_${problem.id}`);
      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(problem.starterCode);
      }
    }
  }, [problem]);
  
  
  useEffect(() => {
    if (problem && code) {
      localStorage.setItem(`code_${problem.id}`, code);
    }
  }, [code, problem]);
  
  if (!problem) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
            <Link to="/problems">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Problems
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const difficultyVariant = problem.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
  
  const runCode = async (isSubmission: boolean) => {
    if (isSubmission) {
      setIsSubmitting(true);
    } else {
      setIsRunning(true);
    }
    
    setVerdict("Running");
    setShowModal(true);
    setOutput("");
    setExpectedOutput("");
    setErrorMessage("");
    setExecutionTime(undefined);
    
    try {
      const testCases = isSubmission 
        ? problem.testCases 
        : problem.testCases.filter(tc => !tc.isHidden).slice(0, 1);
      
      const response = await supabase.functions.invoke("execute-python", {
        body: {
          code,
          testCases: testCases.map(tc => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
          })),
          timeLimit: problem.timeLimit,
        },
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to execute code");
      }
      
      const result = response.data;
      
      setVerdict(result.verdict);
      setOutput(result.output || "");
      setExpectedOutput(result.expectedOutput || "");
      setExecutionTime(result.executionTime);
      setErrorMessage(result.error || "");
      
      // Mark as solved if accepted
      if (isSubmission && result.verdict === "Accepted") {
        const solvedProblems = JSON.parse(localStorage.getItem("solvedProblems") || "[]");
        if (!solvedProblems.includes(problem.id)) {
          solvedProblems.push(problem.id);
          localStorage.setItem("solvedProblems", JSON.stringify(solvedProblems));
        }
        toast({
          title: "Congratulations! 🎉",
          description: "You solved the problem!",
        });
      }
    } catch (error) {
      console.error("Execution error:", error);
      setVerdict("Runtime Error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred while executing your code");
    } finally {
      setIsRunning(false);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Problem Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 border-r border-border overflow-y-auto"
        >
          <div className="p-6">
            <Link to="/problems" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Problems
            </Link>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-muted-foreground font-mono">#{problem.id}</span>
                <Badge variant={difficultyVariant}>{problem.difficulty}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{problem.title}</h1>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-python-yellow mb-3">Description</h3>
                <p className="text-foreground whitespace-pre-line">{problem.description}</p>
              </section>
              
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-python-yellow mb-3">Input Format</h3>
                <p className="text-foreground whitespace-pre-line">{problem.inputFormat}</p>
              </section>
              
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-python-yellow mb-3">Output Format</h3>
                <p className="text-foreground whitespace-pre-line">{problem.outputFormat}</p>
              </section>
              
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-python-yellow mb-3">Sample Input</h3>
                <pre className="p-4 rounded-lg bg-editor-bg border border-border font-mono text-sm overflow-x-auto">
                  {problem.sampleInput}
                </pre>
              </section>
              
              <section className="mb-6">
                <h3 className="text-lg font-semibold text-python-yellow mb-3">Sample Output</h3>
                <pre className="p-4 rounded-lg bg-editor-bg border border-border font-mono text-sm overflow-x-auto">
                  {problem.sampleOutput}
                </pre>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold text-muted-foreground mb-3">Constraints</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Time Limit: {problem.timeLimit} second(s)</li>
                  <li>• Memory Limit: ~128MB</li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
        
        {/*Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 flex flex-col"
        >
          {/* Editor Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
              <span className="ml-3 text-sm text-muted-foreground font-mono">solution.py</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCode(problem.starterCode)}
              >
                Reset
              </Button>
            </div>
          </div>
          
          {/* Editor */}
          <div className="flex-1 min-h-[400px]">
            <CodeEditor value={code} onChange={setCode} />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-border bg-card">
            <Button
              variant="outline"
              onClick={() => runCode(false)}
              disabled={isRunning || isSubmitting}
            >
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "Running..." : "Run"}
            </Button>
            
            <Button
              variant="hero"
              onClick={() => runCode(true)}
              disabled={isRunning || isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </motion.div>
      </main>
      
      <VerdictModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        verdict={verdict}
        output={output}
        expectedOutput={expectedOutput}
        executionTime={executionTime}
        error={errorMessage}
      />
    </div>
  );
}
