import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/ui/card"
import { Button } from "@/shadcn/ui/button"
import { Input } from "@/shadcn/ui/input"
import { Separator } from "@/shadcn/ui/separator"

const presetRules = [
  "Always answer politely.",
  "Do not share personal information.",
  "Summarize responses if they are too long.",
]

export default function Rules() {
  const [rules, setRules] = useState<string[]>(presetRules)
  const [newRule, setNewRule] = useState("")

  const addRule = () => {
    if (newRule.trim() && !rules.includes(newRule.trim())) {
      setRules([...rules, newRule.trim()])
      setNewRule("")
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>AI Instruction Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mb-4 space-y-2">
            {rules.map((rule, idx) => (
              <li key={idx} className="p-2 bg-muted rounded">{rule}</li>
            ))}
          </ul>
          <Separator className="mb-4" />
          <div className="flex gap-2">
            <Input
              placeholder="Type a new rule..."
              value={newRule}
              onChange={e => setNewRule(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") addRule() }}
            />
            <Button onClick={addRule} disabled={!newRule.trim()}>Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}