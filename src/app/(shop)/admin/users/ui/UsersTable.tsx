"use client";

import { changeRole } from "@/actions/admin/users/change-role";
import { User } from "@/interfaces/user";
import { Rol } from "@prisma/client";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  const roles = Object.values(Rol);

  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Rol
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="text-sm text-gray-900 font-light px-6">
              <select
                className="text-sm text-gray-900 p-2 w-32"
                value={user.role}
                onChange={(e) => changeRole(user.id, e.target.value as Rol)}
              >
                {roles.map((rol) => (
                  <option value={rol} key={rol}>{rol}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
