import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainLayout } from "@/components/BrainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Plus, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const NewThought = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [collection, setCollection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const collections = [
    "Startup Insights",
    "Mental Models", 
    "Product Ideas",
    "Tech Rants",
    "Readwise Highlights",
    "Daily Thoughts"
  ];

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please add both a title and content for your thought.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Thought saved!",
      description: "Your new thought has been added to your brain.",
    });
    
    // Navigate to the new thought (in real app, use the actual ID)
    navigate(`/thought/new-thought-${Date.now()}`);
  };

  const handlePreview = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Nothing to preview",
        description: "Add some content first to see the preview.",
        variant: "destructive",
      });
      return;
    }
    // In real app, this would open a preview modal
    toast({
      title: "Preview mode",
      description: "Preview functionality coming soon!",
    });
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
          
          <div className="flex items-center gap-3 mb-2">
            <Plus className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">New Thought</h1>
          </div>
          <p className="text-muted-foreground">
            Capture and connect your ideas
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create Your Thought</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Give your thought a clear title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Collection */}
            <div className="space-y-2">
              <Label>Collection</Label>
              <Select value={collection} onValueChange={setCollection}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a collection or leave blank" />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((col) => (
                    <SelectItem key={col} value={col}>
                      {col}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Start writing your thought... Use [[double brackets]] to link to other thoughts."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none font-mono"
              />
              <div className="text-sm text-muted-foreground">
                {content.length} characters • Markdown supported
              </div>
            </div>

            {/* Tips */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">💡 Tips for better thoughts:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use [[double brackets]] to link to other thoughts</li>
                <li>• Add ## headers to structure your content</li>
                <li>• Include questions to explore later</li>
                <li>• Connect ideas to existing mental models</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSave}
                disabled={isLoading}
                className="gap-2 flex-1"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Thought"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handlePreview}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BrainLayout>
  );
};

export default NewThought;