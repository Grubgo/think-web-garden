import { useState } from "react";
import { BrainLayout } from "@/components/BrainLayout";
import { ThoughtCard } from "@/components/ThoughtCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AllThoughts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const thoughts = [
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
    },
    {
      id: "cold-start-problem",
      title: "Cold Start Problem Insights",
      content: "Network effects are powerful, but getting started is the hardest part. The key is finding the smallest viable network that can sustain itself...",
      collection: "Readwise Highlights",
      date: "5 days ago",
      readTime: "4 min read",
      backlinks: 3
    },
    {
      id: "feynman-technique",
      title: "The Feynman Technique for Learning",
      content: "If you can't explain something simply, you don't understand it well enough. This technique forces you to identify gaps in your knowledge...",
      collection: "Mental Models",
      date: "1 week ago",
      readTime: "3 min read",
      backlinks: 5
    },
    {
      id: "api-design",
      title: "Why Most APIs Are Terrible",
      content: "Good API design is about empathy for the developer. Most APIs are designed from the inside out, not the outside in...",
      collection: "Tech Rants",
      date: "2 weeks ago",
      readTime: "6 min read",
      backlinks: 2
    }
  ];

  const collections = ["all", "Startup Insights", "Mental Models", "Product Ideas", "Tech Rants", "Readwise Highlights"];

  const filteredThoughts = thoughts.filter(thought => {
    const matchesSearch = thought.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thought.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection = selectedCollection === "all" || thought.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  const sortedThoughts = [...filteredThoughts].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "backlinks") {
      return b.backlinks - a.backlinks;
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <BrainLayout>
      <div className="container max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">All Thoughts</h1>
          </div>
          <p className="text-muted-foreground">
            Explore your complete collection of ideas and insights
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search thoughts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem key={collection} value={collection}>
                      {collection === "all" ? "All Collections" : collection}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="backlinks">Most Linked</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">
            {filteredThoughts.length} thoughts found
          </div>
          <Button asChild className="gap-2">
            <Link to="/new">
              <Plus className="h-4 w-4" />
              New Thought
            </Link>
          </Button>
        </div>

        {/* Thoughts Grid */}
        <div className="grid gap-6">
          {sortedThoughts.map((thought) => (
            <ThoughtCard key={thought.id} {...thought} />
          ))}
        </div>

        {filteredThoughts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No thoughts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button asChild>
              <Link to="/new">Create your first thought</Link>
            </Button>
          </div>
        )}
      </div>
    </BrainLayout>
  );
};

export default AllThoughts;