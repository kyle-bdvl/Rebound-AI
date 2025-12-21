import { Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar"
import CustomSidebar from "../components/CustomSidebar"

import Home from "../pages/Home"
import Chat from "../pages/Chat"
import FAQ from "../pages/FAQ"

export function AppRoutes() {
  return (
    <Routes>
      {/* 🔹 HOME — NO SIDEBAR */}
      <Route path="/" element={<Home />} />

      {/* 🔹 FAQ — NO SIDEBAR */}
      <Route path="/faq" element={<FAQ />} />

      {/* 🔹 PAGES WITH SIDEBAR */}
      <Route
        path="/chat"
        element={
          <SidebarProvider>
            <CustomSidebar />
            <main className="w-full p-4">
              <SidebarTrigger />
              <Chat />
            </main>
          </SidebarProvider>
        }
      />
    </Routes>
  )
}
