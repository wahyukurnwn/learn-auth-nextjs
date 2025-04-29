import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    redirect("/login");
  }

  return <div>Protected Route</div>;
}
