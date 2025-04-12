import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nombres",
  },
  {
    accessorKey: "username",
    header: "Nombre de usuario",
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => row.original.role.toUpperCase(),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: "actions",
  },
];
