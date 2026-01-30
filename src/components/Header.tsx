import { Link, useLocation } from "react-router-dom";
import { Code2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Terminal className="h-8 w-8 text-python-yellow transition-transform group-hover:scale-110" />
            <Code2 className="h-4 w-4 text-python-blue absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-python-yellow">Python</span>
            <span className="text-python-blue">Arena</span>
          </span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/problems">
            <Button 
              variant={location.pathname === "/problems" ? "secondary" : "ghost"}
              className="text-foreground"
            >
              Problems
            </Button>
          </Link>
          <Link to="/problems">
            <Button variant="hero" size="default">
              Start Solving
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
