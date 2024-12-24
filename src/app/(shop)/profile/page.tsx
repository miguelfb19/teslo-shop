import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) redirect("/auth/login?returnTo=/profile");

  const { user } = session;

  return (
    <div>
      <Title title="Perfil de Usuario" />
      <div className="flex flex-col items-center gap-5">
        <Image
          src={user?.image || "/imgs/not-profile-image.png"}
          alt={user?.name!}
          width={100}
          height={100}
          className="bg-slate-100 rounded-full"
        />
        <h1>
          <strong>Nombre: </strong>
          {user?.name}
        </h1>
        <p>
          <strong>ID: </strong>
          {user?.id}
        </p>
        <p>
          <strong>Email: </strong>
          {user?.email}
        </p>
        <p>
          <strong>Rol: </strong>
          {user?.role}
        </p>
      </div>
    </div>
  );
}
