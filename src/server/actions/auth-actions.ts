"use server" // MUST BE THE FIRST LINE

import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

interface AuthResult {
    error?: string
}

export async function loginAction(formData: any): Promise<AuthResult | void> {
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    })

    if (error) {
        return { error: error.message }
    }
    redirect("/dashboard")
}

export async function signupAction(formData: any): Promise<AuthResult | void> {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    })

    if (error) {
        return { error: error.message }
    }
    redirect("/auth/check-email") 
}