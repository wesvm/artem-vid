import type { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "@/pages/customers/data-table/row-actions";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return (
        <div className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap">
          <span>{row.getValue("id")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "documentType",
    header: "Tipo de documento",
  },
  {
    accessorKey: "documentNumber",
    header: "N° de documento",
  },
  {
    accessorKey: "name",
    header: "Nombres",
  },
  {
    accessorKey: "tradeName",
    header: "Nombre comercial",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "department",
    header: "Departamento",
  },
  {
    accessorKey: "province",
    header: "Provincia",
  },
  {
    accessorKey: "district",
    header: "Distrito",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row.original} />,
  },
];
