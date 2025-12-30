import { Home, MessageSquare, Scale, Settings, HelpCircle, PlusCircle } from "lucide-react"
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
    title:"Rules",
    url:"/rules",
    icon: Scale,
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

export default function CustomSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [accessOpen, setAccessOpen] = useState(false)
  const [accessType, setAccessType] = useState<string | null>(null)

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
            <RadioGroup
              value={accessType ?? ""}
              onValueChange={setAccessType}
              className="flex flex-col gap-4 mt-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="terminal" id="terminal" />
                <label htmlFor="terminal" className="cursor-pointer">Terminal</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="files" id="files" />
                <label htmlFor="files" className="cursor-pointer">Files</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="other" id="other" />
                <label htmlFor="other" className="cursor-pointer">Other Apps</label>
              </div>
            </RadioGroup>
            <div className="flex justify-between mt-4">
              <Button
                variant={accessType ? "default" : "outline"}
                disabled={!accessType}
                onClick={() => {
                  // handle enabling access for selected type
                  setAccessOpen(false)
                }}
              >
                Enable
              </Button>
              <Button
                variant="outline"
                disabled={!accessType}
                onClick={() => {
                  setAccessType(null)
                  // handle disabling access for selected type
                  setAccessOpen(false)
                }}
              >
                Disable
              </Button>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" className="mt-4 w-full">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

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