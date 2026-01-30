import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Terminal, CheckCircle, EyeOff, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Terminal,
    title: "Python-Only Judge",
    description: "Pure Python execution environment with secure sandboxing. Focus on one language, master it.",
  },
  {
    icon: EyeOff,
    title: "Hidden Test Cases",
    description: "Your code is validated against hidden test cases to ensure correctness beyond examples.",
  },
  {
    icon: Zap,
    title: "Instant Verdicts",
    description: "Get immediate feedback on your submissions. Accepted, Wrong Answer, or Runtime Error - know instantly.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-python-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-python-yellow/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  <Terminal className="h-16 w-16 text-python-yellow" />
                  <Code2 className="h-8 w-8 text-python-blue absolute -bottom-2 -right-2" />
                </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Practice{" "}
                <span className="python-gradient-text">Python</span>
                <br />
                Think in{" "}
                <span className="text-python-yellow">Logic</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Python-only coding practice platform. Solve problems, validate against hidden test cases, and get instant verdicts.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/problems">
                  <Button variant="hero" size="xl" className="group">
                    Start Solving
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/problems">
                  <Button variant="outline" size="xl">
                    View Problems
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Code preview mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 max-w-2xl mx-auto"
            >
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <span className="ml-3 text-sm text-muted-foreground font-mono">solution.py</span>
                </div>
                <pre className="p-6 text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-python-blue">def</span>{" "}
                    <span className="text-python-yellow">solve</span>
                    <span className="text-muted-foreground">(</span>
                    <span className="text-foreground">nums, target</span>
                    <span className="text-muted-foreground">):</span>
                    {"\n"}
                    <span className="text-muted-foreground">    # Your solution here</span>
                    {"\n"}
                    <span className="text-foreground">    seen = </span>
                    <span className="text-muted-foreground">{"{}"}</span>
                    {"\n"}
                    <span className="text-python-blue">    for</span>
                    <span className="text-foreground"> i, num </span>
                    <span className="text-python-blue">in</span>
                    <span className="text-foreground"> enumerate(nums):</span>
                    {"\n"}
                    <span className="text-foreground">        complement = target - num</span>
                    {"\n"}
                    <span className="text-python-blue">        if</span>
                    <span className="text-foreground"> complement </span>
                    <span className="text-python-blue">in</span>
                    <span className="text-foreground"> seen:</span>
                    {"\n"}
                    <span className="text-python-blue">            return</span>
                    <span className="text-foreground"> [seen[complement], i]</span>
                    {"\n"}
                    <span className="text-foreground">        seen[num] = i</span>
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why <span className="text-python-yellow">Python</span>
                <span className="text-python-blue">Arena</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A focused platform for mastering Python problem-solving
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover border-border bg-card hover:border-python-blue/50">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-python-blue/10 mb-6">
                        <feature.icon className="h-7 w-7 text-python-yellow" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 border-t border-border">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Jump into our collection of Python problems and start building your algorithmic thinking skills.
              </p>
              <Link to="/problems">
                <Button variant="hero" size="xl" className="group">
                  Browse Problems
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
