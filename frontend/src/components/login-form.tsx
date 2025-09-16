import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "@/utils/api";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormInput {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { register, handleSubmit } = useForm<LoginFormInput>();

  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: LoginFormInput) => {
    try {
      setLoading(true);
      setError("");
      const res = await login({
        email,
        password,
      });
      localStorage.setItem("authToken", res.data.token);

      if (res.data.token) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.message === "Request failed with status code 401") {
        setError("Invalid credentials");
      }
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>

              {error && (
                <p className="text-sm text-center text-red-600">{error}</p>
              )}
              <Button
                disabled={loading}
                aria-disabled={loading}
                type="submit"
                className="w-full"
              >
                {loading && <Loader className="animate-spin" />}
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
