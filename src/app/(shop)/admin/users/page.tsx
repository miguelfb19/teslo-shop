import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions/admin/users/get-paginated-users";
import { Title } from "@/components/ui/title/Title";

export default async function AdminUsersPage() {
  const { users, ok } = await getPaginatedUsers();

  if (!ok) {
    return redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users!} />
      </div>
    </>
  );
}
