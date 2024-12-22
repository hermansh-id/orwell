import { LoginForm } from "@/components/form/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
      <LoginForm />
  )
}
