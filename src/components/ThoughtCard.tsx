import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ThoughtCardProps {
  id: string;
  title: string;
  content: string;
  collection: string;
  date: string;
  readTime: string;
  backlinks?: number;
}

export function ThoughtCard({
  id,
  title,
  content,
  collection,
  date,
  readTime,
  backlinks = 0
}: ThoughtCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 card-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              <Link to={`/thought/${id}`} className="hover:underline">
                {title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {collection}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {backlinks > 0 && (
              <Badge variant="secondary" className="text-xs">
                {backlinks} backlinks
              </Badge>
            )}
          </div>
          
          <Link 
            to={`/thought/${id}`}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Read more
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}