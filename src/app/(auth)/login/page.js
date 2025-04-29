"use client";

import { useActionState } from "react";
import Link from "next/link";

import { doLoginAction } from "../_actions/doLoginAction";

export default function Page() {
  const [state, formAction, isPending] = useActionState(doLoginAction, null);

  return (
    <section className="max-w-xl mx-auto p-4">
      <form action={formAction} className="grid place-items-center space-y-4">
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <section className="space-y-2">
          <input type="email" placeholder="Input your email" name="email" />
          <input type="password" placeholder="Input your password" name="password" />
          <button disabled={isPending}>{isPending ? "Logging in..." : "Log-in"}</button>
        </section>
        <section>
          <p>
            Don&apos;t have an account ? <Link href="/register">Register</Link>
          </p>
        </section>
        {state?.success == false && <div className="text-center text-rose-500 text-sm bg-rose-50 p-2 rounded-lg font-semibold tracking-tight">{state?.errorMessage}</div>}
        {state?.success && <div className="text-center text-emerald-500 text-sm bg-emerald-50 p-2 rounded-lg font-semibold tracking-tight">{state?.message}</div>}
      </form>
    </section>
  );
}
