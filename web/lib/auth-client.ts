import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
 
export const authClient =  createAuthClient({
  baseURL:  process.env.NEXT_PUBLIC_BETTER_AUTH_URL
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;