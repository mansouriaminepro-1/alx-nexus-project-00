"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

// --- SUPABASE CLIENT SETUP ---
// We embed the supabase client creation here to avoid compiler issues with external/relative imports
import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

// Placeholder for Database type
type Database = any; 

const useSupabaseClient = () => {
    // Initializes the client using environment variables
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
// --- SUPABASE CLIENT SETUP END ---


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Initialize Supabase client
  const supabase = useSupabaseClient(); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Client-side sign-up logic
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError("")
    
    // Call Supabase client directly in the browser to sign up the user
    const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
    })
    
    if (error) {
      // Display specific error message from Supabase
      setError(error.message)
      setIsLoading(false)
      return
    }

    // Redirect on success to the email confirmation page 
    // Uses standard browser redirect (window.location.href) to bypass next/navigation errors
    window.location.href = "/auth/check-email"; 
  }

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Join Menufight to create your first poll.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="chef@restaurant.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            {/* Standard <a> tag replaces next/link to ensure compilation */}
            <a href="/login" className="underline text-blue-600">
                Login
            </a>
        </div>
      </CardContent>
    </Card>
  )
}