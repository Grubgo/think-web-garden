import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  FileText, 
  Calendar, 
  Book, 
  Lightbulb,
  Plus,
  ArrowRight
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  action: () => void;
  group: string;
}

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Sample data - this would come from your note/thought system
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "daily",
      title: "Daily Log",
      subtitle: "Open today's thoughts",
      icon: Calendar,
      action: () => {
        navigate("/daily");
        setOpen(false);
      },
      group: "Navigate"
    },
    {
      id: "thoughts",
      title: "All Thoughts",
      subtitle: "Browse all notes",
      icon: FileText,
      action: () => {
        navigate("/thoughts");
        setOpen(false);
      },
      group: "Navigate"
    },
    {
      id: "reading",
      title: "Reading List",
      subtitle: "Books and highlights",
      icon: Book,
      action: () => {
        navigate("/reading");
        setOpen(false);
      },
      group: "Navigate"
    },
    {
      id: "ideas",
      title: "Idea Board",
      subtitle: "Startup concepts & projects",
      icon: Lightbulb,
      action: () => {
        navigate("/ideas");
        setOpen(false);
      },
      group: "Navigate"
    },
    // Actions
    {
      id: "new-thought",
      title: "New Thought",
      subtitle: "Create a new note",
      icon: Plus,
      action: () => {
        navigate("/new");
        setOpen(false);
      },
      group: "Create"
    },
    // Sample thoughts (this would be dynamic)
    {
      id: "startup-insights",
      title: "Building in Public vs Thinking in Public",
      subtitle: "Startup Insights • 2 days ago",
      icon: FileText,
      action: () => {
        navigate("/thought/startup-insights");
        setOpen(false);
      },
      group: "Thoughts"
    },
    {
      id: "mental-models",
      title: "The Eisenhower Matrix",
      subtitle: "Mental Models • 1 week ago",
      icon: FileText,
      action: () => {
        navigate("/thought/eisenhower-matrix");
        setOpen(false);
      },
      group: "Thoughts"
    }
  ];

  const filteredCommands = commands.filter((command) =>
    command.title.toLowerCase().includes(search.toLowerCase()) ||
    (command.subtitle && command.subtitle.toLowerCase().includes(search.toLowerCase()))
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.group]) {
      acc[command.group] = [];
    }
    acc[command.group].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 command-palette">
        <Command className="bg-transparent">
          <div className="flex items-center border-b border-border px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              placeholder="Search thoughts, notes, or navigate..."
              value={search}
              onValueChange={setSearch}
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            
            {Object.entries(groupedCommands).map(([group, items]) => (
              <Command.Group key={group} heading={group} className="mb-2">
                {items.map((command) => {
                  const Icon = command.icon;
                  return (
                    <Command.Item
                      key={command.id}
                      onSelect={() => command.action()}
                      className="flex items-center px-2 py-2 text-sm cursor-pointer rounded-md hover:bg-muted/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      <Icon className="mr-3 h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">{command.title}</div>
                        {command.subtitle && (
                          <div className="text-xs text-muted-foreground">
                            {command.subtitle}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="ml-2 h-3 w-3 text-muted-foreground" />
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}
          </Command.List>
          
          <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">⌘K</kbd> to toggle
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}