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

const App = () => {
  return (
    <div className="w-full h-dvh min-h-dvh">
      <Routes>
        <Route element={<Protected />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all-feedbacks" element={<AllFeedbacks />} />
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
