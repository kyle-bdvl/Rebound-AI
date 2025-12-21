import { Home, MessageSquare, ShoppingCart, Settings, HelpCircle, PlusCircle } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
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
} from "@/shadcn/ui/sidebar"
import { Button } from "@/shadcn/ui/button"
import { Separator } from "@/shadcn/ui/separator"

const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageSquare,
  },
]

const bottomItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Help & FAQ",
    url: "/faq",
    icon: HelpCircle,
  },
]

export default function CustomSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500">
            <MessageSquare className="size-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">ReboundAi</h2>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* New Chat Button */}
        <div className="p-2">
          <Button
            onClick={() => navigate("/chat")}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <PlusCircle className="size-4" />
            New Chat
          </Button>
        </div>

        <Separator className="my-2" />

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                onClick={() => navigate(item.url)}
                isActive={location.pathname === item.url}
                tooltip={item.title}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}