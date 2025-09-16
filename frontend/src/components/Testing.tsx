// Example usage in App.tsx
import { signup, login, submitFeedback, getAllFeedback, getFeedbackByUserId } from "../utils/api";
import { useState } from "react";

const Testing = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userFeedbacks, setUserFeedbacks] = useState([]);

  const handleSignup = async () => {
    await signup({ email: "yasir@example.com", password: "password" });
  };

  const handleLogin = async () => {
    const res = await login({
      email: "yasir@example.com",
      password: "password",
    });
    setToken(res.data.token); // Adjust according to your backend response
    // If backend returns userId, set it here
    // setUserId(res.data.userId);
  };

  const handleFeedback = async () => {
    await submitFeedback({ message: "Hello from frontend!" }, token);
  };

  const handleGetFeedback = async () => {
    const res = await getAllFeedback(token);
    console.log(res.data);
  };

  const handleGetUserFeedbacks = async () => {
    if (!userId) {
      alert("Set userId first!");
      return;
    }
    const res = await getFeedbackByUserId(Number(userId), token);
    setUserFeedbacks(res.data);
    console.log(res.data);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-dvh">
      <button
        className="p-2 border-2 rounded-md bg-sky-400"
        onClick={handleSignup}
      >
        Signup
      </button>
      <button
        className="p-2 border-2 rounded-md bg-sky-500"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="p-2 border-2 rounded-md bg-sky-600"
        onClick={handleFeedback}
      >
        Submit Feedback
      </button>
      <button
        className="p-2 border-2 rounded-md bg-sky-700"
        onClick={handleGetFeedback}
      >
        Get All Feedback
      </button>
      <input
        type="text"
        placeholder="Enter userId"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        className="p-2 border rounded-md"
      />
      <button
        className="p-2 border-2 rounded-md bg-green-500"
        onClick={handleGetUserFeedbacks}
      >
        Get Feedbacks by User
      </button>
      <div>
        <h3>User Feedbacks:</h3>
        <pre>{JSON.stringify(userFeedbacks, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Testing;
