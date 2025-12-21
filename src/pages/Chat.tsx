import { useState, useRef, useEffect } from "react"
import { Send, User, Bot } from "lucide-react"
import { Button } from "@/shadcn/ui/button"
import { Input } from "@/shadcn/ui/input"
import { ScrollArea } from "@/shadcn/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/shadcn/ui/avatar"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { clearInitialPrompt } from "@/store/chat"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function Chat() {
  const dispatch = useAppDispatch()
  const initialPrompt = useAppSelector((state) => state.chatSlice.initialPrompt)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Rebound AI. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasProcessedPrompt = useRef(false)

  // Handle initial prompt from Home page
  useEffect(() => {
    if (initialPrompt && !hasProcessedPrompt.current) {
      hasProcessedPrompt.current = true
      setInput(initialPrompt)
      handleSendMessage(initialPrompt)
      dispatch(clearInitialPrompt())
    }
  }, [initialPrompt])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I received your message: "${messageContent}". This is a simulated response. Integrate with your AI API here.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = async () => {
    handleSendMessage(input)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Chat Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Rebound AI Chat</h1>
        <p className="text-sm text-muted-foreground">AI-powered conversation</p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="mx-auto max-w-3xl space-y-6 py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <Avatar className="size-8 shrink-0">
                <AvatarFallback
                  className={
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-indigo-500 to-pink-500"
                      : "bg-primary"
                  }
                >
                  {message.role === "assistant" ? (
                    <Bot className="size-4 text-white" />
                  ) : (
                    <User className="size-4 text-white" />
                  )}
                </AvatarFallback>
              </Avatar>

              {/* Message Content */}
              <div
                className={`flex-1 space-y-2 ${
                  message.role === "user" ? "text-right" : ""
                }`}
              >
                <div className="text-sm font-medium">
                  {message.role === "assistant" ? "Rebound AI" : "You"}
                </div>
                <div
                  className={`inline-block rounded-2xl px-4 py-3 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4">
              <Avatar className="size-8 shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-pink-500">
                  <Bot className="size-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                <div className="size-2 animate-bounce rounded-full bg-foreground/40" />
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="shrink-0"
            >
              <Send className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}