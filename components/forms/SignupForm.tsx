"use client";

import React from "react";
import { ArrowRightIcon } from "../ui/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/supabaseClient";

// -----------------------------
// 1) Zod Validation Schema
// -----------------------------
const signupSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

// -----------------------------
// 2) Component
// -----------------------------
export default function SignupForm() {
  // Navigation helper (similar to PollCreateForm and AuthModal)
  const navigateToDashboard = () => {
    const targetUrl = '/dashboard';
    
    try {
      window.history.pushState({}, '', targetUrl);
    } catch (e) {
      console.warn('History API restricted, using internal event routing', e);
    }

    // Dispatch custom event to ensure Router picks up the change
    const navEvent = new CustomEvent('navigate', { detail: targetUrl });
    window.dispatchEvent(navEvent);
    
    window.scrollTo(0, 0);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  // -----------------------------
  // 3) Handle Submit
  // -----------------------------
  const onSubmit = async (data: SignupFormValues) => {
    const { email, password, restaurantName } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { restaurant_name: restaurantName },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Redirect to dashboard after successful signup
    navigateToDashboard();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Restaurant Name */}
      <div className="group">
        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">
          Restaurant Name
        </label>
        <input
          {...register("restaurantName")}
          type="text"
          placeholder="e.g. Gotham Burgers"
          className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
        />
        {errors.restaurantName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.restaurantName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="group">
        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="chef@example.com"
          className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="group">
        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating..." : "Create Account"}
        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
