"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/src/actions/authAction";
import { LoginState } from "../types";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const initialState: LoginState = {
  success: false,
  error: undefined,
  user: undefined,
};

export function useLoginForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.user) {
      setUser(state.user);
      router.push("/");
    }
  }, [state, setUser, router]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    state,
    formAction,
    isPending,
    showPassword,
    togglePassword,
  };
}
