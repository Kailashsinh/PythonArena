import { Terminal, Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-python-yellow" />
            <Code2 className="h-4 w-4 text-python-blue" />
            <span className="text-lg font-bold">
              <span className="text-python-yellow">Python</span>
              <span className="text-python-blue">Arena</span>
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built by{" "}
            <span className="font-semibold text-foreground">Kailashsinh Rajput</span>
          </p>
          
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} PythonArena. Practice Python. Think in Logic.
          </p>
        </div>
      </div>
    </footer>
  );
}
