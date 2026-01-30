import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface ExecutionRequest {
  code: string;
  testCases: TestCase[];
  timeLimit: number;
}

interface ExecutionResult {
  verdict: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error";
  output?: string;
  expectedOutput?: string;
  executionTime?: number;
  error?: string;
}

// Using Piston API for code execution (free, no API key needed)
const PISTON_API = "https://emkc.org/api/v2/piston/execute";

async function executeCode(code: string, input: string, timeLimit: number): Promise<{ output: string; error: string | null; executionTime: number }> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), (timeLimit + 2) * 1000);
    
    const response = await fetch(PISTON_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "python",
        version: "3.10.0",
        files: [
          {
            name: "main.py",
            content: code,
          },
        ],
        stdin: input,
        run_timeout: timeLimit * 1000,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    const executionTime = Date.now() - startTime;
    
    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log("Piston result:", JSON.stringify(result, null, 2));
    
    // Check for compile errors
    if (result.compile && result.compile.code !== 0) {
      return {
        output: "",
        error: result.compile.stderr || result.compile.output || "Compilation error",
        executionTime,
      };
    }
    
    // Check for runtime errors
    if (result.run) {
      if (result.run.signal === "SIGKILL" || result.run.code === 137) {
        return {
          output: "",
          error: "Time Limit Exceeded",
          executionTime: timeLimit * 1000,
        };
      }
      
      if (result.run.stderr && result.run.code !== 0) {
        return {
          output: result.run.stdout || "",
          error: result.run.stderr,
          executionTime,
        };
      }
      
      return {
        output: result.run.stdout || "",
        error: null,
        executionTime,
      };
    }
    
    return {
      output: "",
      error: "No output from execution",
      executionTime,
    };
  } catch (err: unknown) {
    const executionTime = Date.now() - startTime;
    const error = err as Error;
    
    if (error.name === "AbortError") {
      return {
        output: "",
        error: "Time Limit Exceeded",
        executionTime: timeLimit * 1000,
      };
    }
    
    console.error("Execution error:", error);
    return {
      output: "",
      error: error.message || "Unknown error during execution",
      executionTime,
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { code, testCases, timeLimit = 1 }: ExecutionRequest = await req.json();
    
    console.log("Executing code for", testCases.length, "test cases");
    
    if (!code || !testCases || testCases.length === 0) {
      return new Response(
        JSON.stringify({ error: "Code and test cases are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    let totalExecutionTime = 0;
    
    // Run through each test case
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`Running test case ${i + 1}/${testCases.length}`);
      
      const { output, error, executionTime } = await executeCode(code, testCase.input, timeLimit);
      totalExecutionTime += executionTime;
      
      // Check for TLE
      if (error === "Time Limit Exceeded") {
        const result: ExecutionResult = {
          verdict: "Time Limit Exceeded",
          executionTime: totalExecutionTime,
        };
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Check for runtime error
      if (error) {
        const result: ExecutionResult = {
          verdict: "Runtime Error",
          error: error,
          executionTime: totalExecutionTime,
        };
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Compare output (trim whitespace)
      const actualOutput = output.trim();
      const expectedOutput = testCase.expectedOutput.trim();
      
      if (actualOutput !== expectedOutput) {
        const result: ExecutionResult = {
          verdict: "Wrong Answer",
          output: actualOutput,
          expectedOutput: expectedOutput,
          executionTime: totalExecutionTime,
        };
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    
    // All test cases passed
    const result: ExecutionResult = {
      verdict: "Accepted",
      executionTime: totalExecutionTime,
    };
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Handler error:", error);
    return new Response(
      JSON.stringify({ 
        verdict: "Runtime Error",
        error: error.message || "An error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});