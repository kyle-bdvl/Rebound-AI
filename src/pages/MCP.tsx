import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/ui/card"
import { Button } from "@/shadcn/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/shadcn/ui/dialog"
import { Input } from "@/shadcn/ui/input"

function generateApiKey() {
  // 32 random bytes, base64url encoded (or hex if you prefer)
  const array = new Uint8Array(24)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

export default function MCP() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")

  const handleCreateApiKey = () => {
    setApiKey(generateApiKey())
    setDialogOpen(true)
  }

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Integrate ReboundAI with Your MCP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal pl-4 space-y-2">
            <li>
              <strong>Obtain your ReboundAI API Key:</strong>
              <br />
              Go to your account settings and copy your API key.
            </li>
            <li>
              <strong>Open your MCP dashboard:</strong>
              <br />
              Log in to your MCP (Management Control Panel) as an administrator.
            </li>
            <li>
              <strong>Navigate to Integrations:</strong>
              <br />
              Find the "Integrations" or "API" section in your MCP.
            </li>
            <li>
              <strong>Add ReboundAI:</strong>
              <br />
              Click "Add Integration" and select "ReboundAI" from the list.
            </li>
            <li>
              <strong>Paste your API Key:</strong>
              <br />
              Enter your ReboundAI API key and save the integration.
            </li>
            <li>
              <strong>Test the Integration:</strong>
              <br />
              Use the "Test Connection" button to ensure everything is working.
            </li>
          </ol>
          <div>
            <Button onClick={handleCreateApiKey}>Create API Key</Button>
          </div>
          <div>
            For more help, visit our <a href="/faq" className="text-primary underline">FAQ</a> or contact support.
          </div>
        </CardContent>
      </Card>

      {/* API Key Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your New API Key</DialogTitle>
            <DialogDescription>
              Copy and store this key securely. You will not be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <Input value={apiKey} readOnly className="font-mono" />
          <DialogClose asChild>
            <Button className="w-full mt-4" variant="default" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}