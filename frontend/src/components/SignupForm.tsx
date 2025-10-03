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
import { login, signup } from "@/utils/api";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormInput {
  email: string;
  password: string;
}

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<LoginFormInput>();

  const navigate = useNavigate();

  const handleSignup = async ({ email, password }: LoginFormInput) => {
    try {
      setLoading(true);

      const res = await signup({
        email,
        password,
      });
      console.log(res.data);

      if (res.data === "User created successfully") {
        const res = await login({
          email,
          password,
        });
        localStorage.setItem("authToken", res.data.token);

        if (res.data.token) {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)}>
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
              <Button
                disabled={loading}
                aria-disabled={loading}
                type="submit"
                className="w-full"
              >
                {loading && <Loader className="animate-spin" />}
                Sign up
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
