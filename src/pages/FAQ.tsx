import { useNavigate } from "react-router-dom"
import { Button } from "@/shadcn/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card"

export default function FAQ() {
  const navi = useNavigate()

  const faqs = [
    {
      question: "What is Rebound AI?",
      answer: "Rebound AI is an advanced AI assistant designed for business strategy, planning, and productivity. It helps organizations with strategic planning, team collaboration, and data-driven insights."
    },
    {
      question: "How does prompt injection protection work?",
      answer: "Rebound AI incorporates advanced safeguards to prevent malicious prompt injections. Our system analyzes inputs to ensure secure and protected interactions, keeping your data safe."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, Rebound AI features enterprise-grade security with encrypted communications and compliance-ready architecture. We prioritize the protection of your sensitive information."
    },
    {
      question: "How do I get started?",
      answer: "Simply enter a prompt in the input field on the home page or click one of the quick action buttons. Then hit 'Start Chat' to begin your conversation with the AI."
    },
    {
      question: "What kind of tasks can Rebound AI help with?",
      answer: "Rebound AI can assist with business planning, marketing strategies, team management, report writing, and much more. It's tailored for organizational productivity."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Frequently Asked Questions</h1>
          <Button onClick={() => navi("/")} variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors">
            Back to Home
          </Button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-white/10 border-white/15 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}