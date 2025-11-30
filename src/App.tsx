import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/Utilities/ScrollToTop.jsx'
import Index from "./pages/Index";
import Apartments from "./pages/Apartments";
import NotFound from "./pages/NotFound";
import Proprietari from "./pages/Proprietari"
import ApartmentDetail from "./pages/ApartmentDetail"
import Payment from "./pages/Payment"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Proprietari" element={<Proprietari />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/ApartmentDetail/:id" element={<ApartmentDetail />} />
          <Route path="/Payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
