import { BrainLayout } from "@/components/BrainLayout";
import { ThoughtCard } from "@/components/ThoughtCard";
import { Button } from "@/components/ui/button";
import { Brain, Plus, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample thoughts data
  const recentThoughts = [
    {
      id: "startup-insights",
      title: "Building in Public vs Thinking in Public",
      content: "There's a difference between showcasing your work and sharing your thought process. Building in public focuses on the outcome, while thinking in public focuses on the journey of ideas...",
      collection: "Startup Insights",
      date: "2 days ago",
      readTime: "3 min read",
      backlinks: 2
    },
    {
      id: "eisenhower-matrix",
      title: "The Eisenhower Matrix",
      content: "A simple but powerful framework for prioritizing tasks based on urgency and importance. What looks urgent might not be important, and what's important might not feel urgent...",
      collection: "Mental Models",
      date: "1 week ago",
      readTime: "5 min read",
      backlinks: 4
    },
    {
      id: "product-ideas",
      title: "The Problem with Note-Taking Apps",
      content: "Every note-taking app tries to be everything to everyone. But what if we focused on one thing: connecting thoughts naturally, like your brain does...",
      collection: "Product Ideas",
      date: "3 days ago",
      readTime: "2 min read",
      backlinks: 1
    }
  ];

  return (
    <BrainLayout>
      <div className="container max-w-4xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-primary rounded-2xl flex items-center justify-center glow-effect">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Digital Brain</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Where thoughts connect and ideas flourish
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/new">
                <Plus className="h-4 w-4" />
                New Thought
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/daily">
                <Calendar className="h-4 w-4" />
                Daily Log
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Thoughts */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Thoughts</h2>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/thoughts">
                View all
                <TrendingUp className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-6">
            {recentThoughts.map((thought) => (
              <ThoughtCard key={thought.id} {...thought} />
            ))}
          </div>
        </div>
      </div>
    </BrainLayout>
  );
};

export default Index;
