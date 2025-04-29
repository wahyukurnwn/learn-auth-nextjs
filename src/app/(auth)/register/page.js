"use client";

import { useActionState } from "react";
import Link from "next/link";

import { doRegisterAction } from "../_actions/doRegisterAction";

export default function Page() {
  const [state, formAction, pending] = useActionState(doRegisterAction, null);

  return (
    <section className="max-w-xl mx-auto p-4 ">
      <form action={formAction} className="grid place-items-center space-y-4">
        <h2 className="text-2xl font-bold">Add New User</h2>
        <section className="space-y-2">
          <input type="text" placeholder="Input your name" name="name" />
          <input type="email" placeholder="Input your email" name="email" />
          <input type="password" placeholder="Input your password" name="password" />
          <button disabled={pending}>Register</button>
        </section>

        <section>
          <p>
            Have an account ? <Link href="/login">Login</Link>
          </p>
        </section>
        {state?.success == false && <div className="text-center text-rose-500 text-sm bg-rose-50 p-2 rounded-lg font-semibold tracking-tight">{state?.errorMessage}</div>}
        {state?.success && <div className="text-center text-emerald-500 text-sm bg-emerald-50 p-2 rounded-lg font-semibold tracking-tight">{state?.message}</div>}
      </form>
    </section>
  );
}
