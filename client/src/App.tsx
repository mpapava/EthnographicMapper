import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/useLanguage";
import Home from "@/pages/Home";
import Regions from "@/pages/Regions";
import RegionDetail from "@/pages/RegionDetail";
import Tours from "@/pages/Tours";
import Store from "@/pages/Store";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/regions" component={Regions} />
      <Route path="/regions/:slug" component={RegionDetail} />
      <Route path="/tours" component={Tours} />
      <Route path="/store" component={Store} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
