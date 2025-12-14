import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/shadcn/ui/sidebar";
import CustomSidebar from "../components/CustomSidebar";
import Home from '../pages/Home'
import Shopping from '../pages/Shopping'

export function AppRoutes(){
  return (
    <SidebarProvider>
      <CustomSidebar />
      <main className="w-full p-4">
        <SidebarTrigger />
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="shopping" element={<Shopping/>}/>
        </Routes>
      </main>
    </SidebarProvider>
  );
}