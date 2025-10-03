import { Eye, MessageSquare, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LandingNavbar = () => {
  const token = localStorage.getItem("authToken");

  return (
    <nav className="w-full py-4 flex items-center justify-between bg-transparent">
      <Link
        to={"/"}
        className="text-xl font-medium text-foreground flex items-center gap"
      >
        <MessageSquare className="h-5 w-5 text-primary mr-2" />
        Whisper<span className="text-primary">Box</span>
      </Link>

      {token ? (
        <Link to={"/dashboard"}>
          <Button>
            Dashboard
            <MoveRight />
          </Button>
        </Link>
      ) : (
        <Link to={"/all-feedbacks"}>
          <Button>
            View Feedbacks
            <Eye />
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default LandingNavbar;
