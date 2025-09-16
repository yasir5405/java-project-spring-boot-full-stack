import BG from "@/components/BG";
import LandingNavbar from "@/components/LandingNavbar";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-dvh min-h-dvh px-20 relative">
      <BG />
      <LandingNavbar />
      <div className="h-[60vh] md:h-[79dvh] w-full flex items-center justify-center relative">
        {/* Hero Section */}
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-transparent md:h-full">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-purple-700 to-indigo-300 dark:from-indigo-500 dark:to-gray-100 md:dark:to-gray-200 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight mb-4 md:mb-0">
            Your Feedback Buddy, <br /> Keeping you anonymous.
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg  text-center">
            {/* WhisperBox lets you share honest thoughts without revealing your
            identity. Collect, and manage feedbacks in a safe, anonymous way. */}
            Share your thoughts freely. WhisperBox keeps your feedback
            anonymous, secure, and easy to manage.
          </p>

          <div className="w-full flex items-center justify-center mt-8 gap-4">
            <Button
              variant="default"
              className=" duration-200 ease-linear z-40"
              onClick={() => navigate("/dashboard")}
            >
              Get started
            </Button>
            <Button
              variant="outline"
              className="z-40 bg-transparent hover:bg-transparent text-primary hover:text-primary border-primary"
              onClick={() => navigate("/all-feedbacks")}
            >
              View Feedbacks <ArrowRight size={16} />
            </Button>
          </div>
        </BackgroundLines>
      </div>
    </div>
  );
};

export default Home;
