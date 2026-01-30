import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Problem } from "@/data/problems";

interface ProblemCardProps {
  problem: Problem;
  index: number;
  isSolved?: boolean;
}

export function ProblemCard({ problem, index, isSolved = false }: ProblemCardProps) {
  const difficultyVariant = problem.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link to={`/problems/${problem.id}`}>
        <Card className="group card-hover border-border bg-card hover:border-python-blue/50 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isSolved ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-mono text-sm">
                      #{problem.id}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-python-yellow transition-colors">
                      {problem.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={difficultyVariant}>
                      {problem.difficulty}
                    </Badge>
                    {isSolved && (
                      <Badge variant="solved">Solved</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-python-yellow group-hover:translate-x-1 transition-all" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
