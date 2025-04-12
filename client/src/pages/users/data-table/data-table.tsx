import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";

interface Props {
  columns: ColumnDef<User>[];
  data: User[];
}

export function UsersTable({ columns, data }: Props) {
  const filterFields: DataTableFilterField<User>[] = [
    {
      id: "name",
      label: "Nombre",
      placeholder: "Busca por nombres..",
    },
    {
      id: "role",
      label: "Rol",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Usuario", value: "user" },
      ],
    },
  ];

  return (
    <DataTable columns={columns} data={data} filterFields={filterFields} />
  );
}
