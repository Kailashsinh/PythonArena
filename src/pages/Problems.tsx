import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProblemCard } from "@/components/ProblemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { problems } from "@/data/problems";

type Difficulty = "All" | "Easy" | "Medium" | "Hard";

export default function Problems() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  
  // Track solved problems in localStorage
  const getSolvedProblems = (): string[] => {
    try {
      const solved = localStorage.getItem("solvedProblems");
      return solved ? JSON.parse(solved) : [];
    } catch {
      return [];
    }
  };
  
  const solvedProblems = getSolvedProblems();
  
  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

  const difficulties: Difficulty[] = ["All", "Easy", "Medium", "Hard"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Problem <span className="text-python-yellow">List</span>
            </h1>
            <p className="text-muted-foreground">
              {problems.length} problems available • {solvedProblems.length} solved
            </p>
          </motion.div>
          
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={difficulty === diff ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setDifficulty(diff)}
                  className={
                    difficulty === diff
                      ? diff === "Easy"
                        ? "bg-success/20 text-success hover:bg-success/30"
                        : diff === "Medium"
                        ? "bg-warning/20 text-warning hover:bg-warning/30"
                        : diff === "Hard"
                        ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                        : ""
                      : ""
                  }
                >
                  {diff}
                </Button>
              ))}
            </div>
          </motion.div>
          
          {/* Problem List */}
          <div className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  index={index}
                  isSolved={solvedProblems.includes(problem.id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  No problems found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
