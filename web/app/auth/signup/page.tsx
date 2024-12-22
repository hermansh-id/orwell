import { SignupForm } from "@/components/form/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

export default function SignupPage() {
  return (
    <>
        <SignupForm />
    </>
  )
}
