"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { data, error } = await authClient.signIn.email({ 
        email, 
        password
     }, {
        onSuccess: (ctx) => { 
          toast({
            title: "Login successfully.",
            description: "Welcome.",
          })
          redirect("/dashboard")
        }, 
        onError: (ctx) => { 
          toast({
            variant: "destructive",
            title: "Ups! Something went wrong.",
            description: ctx.error.message,
          })
          console.log(ctx.error.message); 
        }, 
      }); 
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Orwell account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/auth/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
