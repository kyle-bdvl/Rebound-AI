import { Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar"
import CustomSidebar from "../components/CustomSidebar"

import Home from "../pages/Home"
import Chat from "../pages/Chat"
import FAQ from "../pages/FAQ"
import Rules from "@/pages/Rules"

export function AppRoutes() {
  return (
    <Routes>
      {/* 🔹 HOME — NO SIDEBAR */}
      <Route path="/" element={<Home />} />

      {/* 🔹 FAQ — NO SIDEBAR */}
      <Route path="/faq" element={<FAQ />} />

      {/* 🔹 RULES — WITH SIDEBAR */}
      <Route
        path="/rules"
        element={
          <SidebarProvider>
            <CustomSidebar />
            <main className="w-full p-4">
              <SidebarTrigger />
              <Rules />
            </main>
          </SidebarProvider>
        }
      />

      {/* 🔹 CHAT — WITH SIDEBAR */}
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
