import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, MessageSquare } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

interface INavLinks {
  name: string;
  url: string;
}

const Navbar = () => {
  const navLinks: INavLinks[] = [
    { name: "Home", url: "/dashboard" },
    { name: "All feedbacks", url: "/all-feedbacks" },
  ];

  const navigate = useNavigate();

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <Link
        to={"/dashboard"}
        className="text-xl font-medium text-foreground flex items-center gap"
      >
        <MessageSquare className="h-5 w-5 text-primary mr-2" />
        Whisper<span className="text-primary">Box</span>
      </Link>

      <div className="flex gap-4">
        {navLinks.map((navLink, idx) => (
          <NavLink
            className={({ isActive }) =>
              `text-sm font-medium hover:text-primary transition-all duration-100 ease-linear ${
                isActive ? "text-primary underline" : "text-foreground"
              }`
            }
            to={navLink.url}
            key={idx}
          >
            {navLink.name}
          </NavLink>
        ))}

        <FeedbackForm>
          <h1 className="text-sm font-medium hover:text-primary transition-all duration-100 ease-linear cursor-pointer">
            Submit a feedback
          </h1>
        </FeedbackForm>
      </div>

      <Button
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/");
        }}
      >
        <LogOut />
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
