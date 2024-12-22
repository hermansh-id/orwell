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

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({ 
        email, 
        password, 
        name
     }, {
        onSuccess: (ctx) => { 
          toast({
            title: "Account created successfully.",
            description: "You are now signed up.",
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
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up for Orwell.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Button className="w-full" onClick={signUp}>
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
