import { 
  Brain,
  Calendar,
  FileText,
  Book,
  Lightbulb,
  Search,
  Plus,
  Settings,
  ChevronRight,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Daily Log", url: "/daily", icon: Calendar },
  { title: "All Thoughts", url: "/thoughts", icon: FileText },
  { title: "Reading List", url: "/reading", icon: Book },
  { title: "Idea Board", url: "/ideas", icon: Lightbulb },
];

const collections = [
  { title: "Startup Insights", url: "/collection/startup-insights", count: 12 },
  { title: "Mental Models", url: "/collection/mental-models", count: 8 },
  { title: "Product Ideas", url: "/collection/product-ideas", count: 5 },
  { title: "Tech Rants", url: "/collection/tech-rants", count: 15 },
  { title: "Readwise Highlights", url: "/collection/readwise", count: 23 },
];

interface BrainSidebarProps {
  onCommandOpen: () => void;
}

export function BrainSidebar({ onCommandOpen }: BrainSidebarProps) {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-accent-foreground font-medium border-l-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={!open ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Brain className="h-5 w-5 text-white" />
          </div>
          {open && (
            <div>
              <h1 className="font-semibold text-sidebar-foreground">Brain</h1>
              <p className="text-xs text-sidebar-foreground/70">Your digital mind</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          <div className="px-4 py-2">
            <Button
              onClick={onCommandOpen}
              variant="outline"
              className={`w-full justify-start gap-2 ${!open ? 'px-2' : ''}`}
            >
              <Search className="h-4 w-4" />
              {open && (
                <>
                  <span className="flex-1 text-left">Search</span>
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    ⌘K
                  </kbd>
                </>
              )}
            </Button>
          </div>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collections */}
        {open && (
          <SidebarGroup>
            <SidebarGroupLabel>Collections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {collections.map((collection) => (
                  <SidebarMenuItem key={collection.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={collection.url} className={getNavCls}>
                        <FileText className="h-4 w-4" />
                        <span className="flex-1">{collection.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {collection.count}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Quick Add */}
        <SidebarGroup>
          <div className="px-4">
            <Button 
              asChild
              className={`w-full gap-2 ${!open ? 'px-2' : ''}`}
            >
              <NavLink to="/new">
                <Plus className="h-4 w-4" />
                {open && "New Thought"}
              </NavLink>
            </Button>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start gap-2 ${!open ? 'px-2' : ''}`}
          >
            <Settings className="h-4 w-4" />
            {open && "Settings"}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}