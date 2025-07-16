import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BrainSidebar } from "@/components/BrainSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BrainLayoutProps {
  children: React.ReactNode;
}

export function BrainLayout({ children }: BrainLayoutProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <BrainSidebar onCommandOpen={() => setCommandOpen(true)} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger />
            
            <div className="flex-1" />
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCommandOpen(true)}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                ⌘K
              </kbd>
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
        
        <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
      </div>
    </SidebarProvider>
  );
}