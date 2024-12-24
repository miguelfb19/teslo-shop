import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const session = await auth()

  if(session?.user) redirect("/")

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-4/5 px-10 flex justify-center">{children}</div>
    </main>
  );
}
