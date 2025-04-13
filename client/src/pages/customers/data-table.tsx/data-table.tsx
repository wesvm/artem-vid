import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";

interface Props {
  columns: ColumnDef<Customer>[];
  data: Customer[];
}

export function CustomerTable({ columns, data }: Props) {
  const filterFields: DataTableFilterField<Customer>[] = [
    {
      id: "documentNumber",
      label: "Número de documento",
      placeholder: "Busca por número de documento..",
    },
  ];

  return (
    <DataTable columns={columns} data={data} filterFields={filterFields}>
      <Button>añanir</Button>
    </DataTable>
  );
}
