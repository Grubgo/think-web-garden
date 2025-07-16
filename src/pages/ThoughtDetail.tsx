import { useParams, Link } from "react-router-dom";
import { BrainLayout } from "@/components/BrainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ExternalLink, Edit } from "lucide-react";

const ThoughtDetail = () => {
  const { id } = useParams();

  // Sample thought data (in real app, this would come from your data source)
  const thought = {
    id: "startup-insights",
    title: "Building in Public vs Thinking in Public",
    content: `There's a fundamental difference between showcasing your work and sharing your thought process. Building in public focuses on the outcome, while thinking in public focuses on the journey of ideas.

## The Problem with Building in Public

Most "building in public" content is just marketing disguised as transparency. It shows:
- Revenue numbers
- User growth
- Product screenshots
- Launch announcements

But it rarely shows the **why** behind decisions.

## Thinking in Public is Different

When you think in public, you share:
- Your reasoning process
- Failed ideas and why they failed
- Mental models you use
- Questions you're wrestling with

This creates deeper connections and more valuable content.

## The [[Feynman Technique]] Connection

Similar to how explaining concepts helps you understand them better, thinking in public forces you to:
1. Clarify your thoughts
2. Get feedback from others
3. Build a knowledge base over time

## Links to Other Thoughts

This connects to [[Mental Models]] and [[Product Ideas]] - specifically how [[The Problem with Note-Taking Apps]] shows we need better tools for thinking, not just building.`,
    collection: "Startup Insights",
    date: "2 days ago",
    readTime: "3 min read",
    backlinks: [
      { title: "Mental Models", url: "/thought/mental-models" },
      { title: "The Problem with Note-Taking Apps", url: "/thought/note-taking-apps" }
    ]
  };

  return (
    <BrainLayout>
      <div className="container max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Brain
            </Link>
          </Button>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{thought.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {thought.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {thought.readTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{thought.collection}</Badge>
              <Button size="sm" variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              {thought.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-semibold mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.includes('[[') && paragraph.includes(']]')) {
                  // Handle backlinks
                  const parts = paragraph.split(/(\[\[[^\]]+\]\])/);
                  return (
                    <p key={index} className="mb-4">
                      {parts.map((part, partIndex) => {
                        if (part.startsWith('[[') && part.endsWith(']]')) {
                          const linkText = part.slice(2, -2);
                          return (
                            <span key={partIndex} className="backlink">
                              {linkText}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>

        {/* Backlinks */}
        {thought.backlinks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Linked References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {thought.backlinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </BrainLayout>
  );
};

export default ThoughtDetail;