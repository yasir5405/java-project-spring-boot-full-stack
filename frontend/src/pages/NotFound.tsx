import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <div className="text-center min-h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <Ghost className="w-16 h-16 text-gray-500" />
        <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
        <p className="text-gray-600">
          Oops! The page you are looking for doesn’t exist.
        </p>
        
      </div>
    </>
  );
};

export default NotFound;
