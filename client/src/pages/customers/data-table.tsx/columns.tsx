import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "documentType",
    header: "Tipo de documento",
  },
  {
    accessorKey: "documentNumber",
    header: "Número de documento",
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
  },
];
