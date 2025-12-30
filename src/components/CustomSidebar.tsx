import { Home, MessageSquare, Scale, Settings, HelpCircle, PlusCircle } from "lucide-react"
import { Server } from "lucide-react"
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
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/shadcn/ui/dialog"
import { KeySquare } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { resetChat, setMessages } from "@/store/chat"

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
  {
    title: "Rules",
    url: "/rules",
    icon: Scale,
  },
  {
    title: "MCP",
    url: "/mcp",
    icon: Server,
  }
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

const accessOptions = [
  { key: "terminal", label: "Terminal" },
  { key: "files", label: "Files" },
  { key: "other", label: "Other Apps" },
]

export default function CustomSidebar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const histories = useAppSelector(state => state.historySlice.histories)
  const [accessOpen, setAccessOpen] = useState(false)
  const [accessStates, setAccessStates] = useState<{ [key: string]: boolean }>({
    terminal: false,
    files: false,
    other: false,
  })

  const handleAccess = (key: string, enabled: boolean) => {
    setAccessStates((prev) => ({ ...prev, [key]: enabled }))
    // Optionally, handle side effects here
  }

  // Optional: handle loading a history (stub)
  const handleHistoryClick = (historyId: string) => {
    const selectedHistory = histories.find(h => h.id === historyId)
    if (selectedHistory) {
      dispatch(setMessages(selectedHistory.messages))
      navigate("/chat")
    }
  }

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-l-to-br from-indigo-500 to-pink-500">
            <MessageSquare className="size-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">ReboundAi</h2>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Access Button */}
        <div className="p-2">
          <Button
            onClick={() => setAccessOpen(true)}
            className="w-full justify-start gap-2"
            variant="secondary"
          >
            <KeySquare className="size-4" />
            Access
          </Button>
        </div>

        {/* Access Dialog */}
        <Dialog open={accessOpen} onOpenChange={setAccessOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allow AI to access:</DialogTitle>
              <DialogDescription>
                Enable or disable access to different parts of your computer.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              {accessOptions.map((option) => (
                <div key={option.key} className="flex items-center justify-between">
                  <span>{option.label}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={accessStates[option.key] ? "default" : "outline"}
                      onClick={() => handleAccess(option.key, true)}
                      disabled={accessStates[option.key]}
                    >
                      Enable
                    </Button>
                    <Button
                      size="sm"
                      variant={!accessStates[option.key] ? "default" : "outline"}
                      onClick={() => handleAccess(option.key, false)}
                      disabled={!accessStates[option.key]}
                    >
                      Disable
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <DialogClose asChild>
              <Button variant="ghost" className="mt-4 w-full">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* New Chat Button */}
        <div className="p-2">
          <Button
            onClick={() => {
              dispatch(resetChat())
              navigate("/chat")
            }}
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

        {/* Chat Histories Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Chat Histories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {histories.length === 0 && (
                <SidebarMenuItem>
                  <span className="text-xs text-muted-foreground">No chat history yet.</span>
                </SidebarMenuItem>
              )}
              {histories.map(history => (
                <SidebarMenuItem key={history.id}>
                  <SidebarMenuButton
                    onClick={() => handleHistoryClick(history.id)}
                    isActive={false}
                    tooltip={history.title}
                  >
                    <span className="truncate">{history.title}</span>
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