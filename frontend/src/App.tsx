import { Route, Routes } from "react-router-dom";
import Testing from "./components/Testing";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupForm";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/Protected";
import AllFeedbacks from "./pages/AllFeedbacks";
import DashboardLayout from "./pages/DashboardLayout";
import Home from "./pages/Home";
import TestPublic from "./pages/TestPublic";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <div className="w-full h-dvh min-h-dvh">
      <Routes>
        <Route element={<Protected />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/all-feedbacks" element={<AllFeedbacks />} />
        <Route path="/test-public" element={<TestPublic />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-right" // top-left, top-center, bottom-left, bottom-right, bottom-center
        richColors // enables rich color scheme for variants (success, error, warning)
        closeButton // show close button on every toast
        expand // expands toast to full width on mobile
        duration={4000} // auto close duration (ms), default is 4000
        visibleToasts={3} // number of toasts visible at once
        theme="system" // "light" | "dark" | "system"
        offset={24} // margin from screen edges in px
        gap={12} // space between stacked toasts in px
      />
    </div>
  );
};

export default App;
