import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HashRedirect from "./components/HashRedirect";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AudioBusProvider } from "@/hooks/use-audio-bus";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";

const Install = lazy(() => import("./pages/Install.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <AudioBusProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <HashRedirect />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<Index />} />
                <Route path="/capabilities" element={<Index />} />
                <Route path="/education" element={<Index />} />
                <Route path="/projects" element={<Index />} />
                <Route path="/experience" element={<Index />} />
                <Route path="/contact" element={<Index />} />
                <Route path="/install" element={<Install />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AudioBusProvider>
  </ThemeProvider>
);

export default App;
