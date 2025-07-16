import { useState } from "react";
import { BrainLayout } from "@/components/BrainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Save, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Daily = () => {
  const [todayEntry, setTodayEntry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleSave = async () => {
    if (!todayEntry.trim()) return;
    
    setIsLoading(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Daily log saved!",
      description: "Your thoughts have been captured for today.",
    });
    setIsLoading(false);
  };

  // Sample previous entries
  const previousEntries = [
    {
      date: "Yesterday",
      content: "Spent time thinking about the difference between building in public and thinking in public. The key insight: building in public is about outcomes, thinking in public is about process.",
      time: "2:30 PM"
    },
    {
      date: "2 days ago", 
      content: "Reading 'The Cold Start Problem' - interesting thoughts on network effects and how they apply to personal knowledge management systems.",
      time: "9:15 AM"
    },
    {
      date: "3 days ago",
      content: "Had a realization about the Eisenhower Matrix - most people focus on urgent tasks, but the real leverage is in the important but not urgent quadrant.",
      time: "11:45 AM"
    }
  ];

  return (
    <BrainLayout>
      <div className="container max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Daily Log</h1>
          </div>
          <p className="text-muted-foreground">
            Capture your thoughts, learnings, and insights
          </p>
        </div>

        {/* Today's Entry */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default" className="gap-1">
                <Calendar className="h-3 w-3" />
                Today
              </Badge>
              {today}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What's on your mind today? Share your thoughts, learnings, ideas, or anything worth remembering..."
              value={todayEntry}
              onChange={(e) => setTodayEntry(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                {todayEntry.length} characters
              </div>
              <Button 
                onClick={handleSave}
                disabled={!todayEntry.trim() || isLoading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Entry"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Previous Entries */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Previous Entries</h2>
          <div className="space-y-4">
            {previousEntries.map((entry, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{entry.date}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {entry.time}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Thought
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>
    </BrainLayout>
  );
};

export default Daily;