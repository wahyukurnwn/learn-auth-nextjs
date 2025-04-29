import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className=" space-y-4 p-12">
      <header className="flex p-4 rounded-lg bg-slate-100">
        <div>devsclae.</div>
        <div>{session.user.name}</div>
      </header>
      <div>{children}</div>
    </main>
  );
}
