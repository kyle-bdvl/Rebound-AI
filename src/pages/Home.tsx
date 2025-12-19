import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * ShadCN UI components

 */
import { Button } from "@/shadcn/ui/button"
import { Input } from "@/shadcn/ui/input"
import { Card, CardContent } from "@/shadcn/ui/card"
import { Badge } from "@/shadcn/ui/badge"


/**
 * Home Page – AI Landing Page
 * This page acts as the entry point for Rebound AI.
 * Users can type a prompt or select a quick action
 * before navigating to the chat page.
 */
export default function Home() {
  const navi = useNavigate()

  // Stores the user’s input prompt
  const [prompt, setPrompt] = useState("")

  /**
   * Example prompts shown as quick-action buttons.
   * useMemo prevents unnecessary re-creation on re-renders.
   */
  const examples = useMemo(
    () => [
      { label: "Study plan", emoji: "📚", text: "Make me a 7-day study plan for SWE3305" },
      { label: "Explain simply", emoji: "🧠", text: "Explain this topic like I'm 10" },
      { label: "Project ideas", emoji: "💡", text: "Give me AI project ideas and modules" },
      { label: "Writing help", emoji: "✍️", text: "Help me write a report introduction" },
    ],
    []
  )

  return (
    /**
     * Fixed full-screen container.
     * Using fixed + inset-0 ensures the page
     * always covers the entire viewport.
     */
    <div className="fixed inset-0 overflow-hidden text-foreground">

      {/* 
        Background gradients.
        Kept separate from content so layout stays clean.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_10%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(700px_500px_at_80%_20%,rgba(236,72,153,0.35),transparent_60%),linear-gradient(180deg,#05070f,#0b1024)]" />

      {/* 
        Main content wrapper.
        Centers the card horizontally and vertically.
      */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">

        {/* 
          Main glassmorphism card.
         
        */}
        <Card className="w-full max-w-2xl border-white/15 bg-white/10 backdrop-blur-xl">
          <CardContent className="p-8 text-center space-y-6">

            {/* App badge / status */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="bg-white/10 text-white/90 border-white/15"
              >
                Rebound AI · Beta
              </Badge>
            </div>

            {/* Title and subtitle */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Rebound AI
              </h1>
              <p className="text-white/75">
                Your AI assistant for studying, planning, and getting work done.
              </p>
            </div>

            {}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Try: "Generate a study plan for SWE3305"'
                className="bg-black/20 border-white/15 text-white placeholder:text-white/40"
              />

              {/* 
                Start Chat button.
                Disabled until user enters a prompt.
              */}
              <Button
                onClick={() => navi("/chat")}
                disabled={!prompt.trim()}
                className="sm:w-[160px] bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90"
              >
                Start Chat →
              </Button>
            </div>

            {/* Quick prompt buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {examples.map((ex) => (
                <Button
                  key={ex.label}
                  variant="secondary"
                  onClick={() => setPrompt(ex.text)}
                  className="bg-white/10 text-white border border-white/15 hover:bg-white/15"
                >
                  <span className="mr-2">{ex.emoji}</span>
                  {ex.label}
                </Button>
              ))}
            </div>

            {/* Helper text */}
            <p className="text-xs text-white/55">
              Tip: click a quick action or type a prompt, then hit{" "}
              <span className="font-semibold">Start Chat</span>.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}


