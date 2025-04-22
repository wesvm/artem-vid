import type { ColumnDef } from "@tanstack/react-table";
import { CreateUpdateCustomerModal } from "@/pages/customers/create-update-modal";
import { DataTable } from "@/components/data-table/data-table";
import { createRowActionStore } from "@/store/row-action-store";

interface Props {
  columns: ColumnDef<Customer>[];
  data: Customer[];
}

export const useCustomerRowActionStore = createRowActionStore<Customer>();

export function CustomerTable({ columns, data }: Props) {
  const { row, type, clearRowAction } = useCustomerRowActionStore();
  const filterFields: DataTableFilterField<Customer>[] = [
    {
      id: "documentNumber",
      label: "Número de documento",
      placeholder: "Busca por número de documento..",
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} filterFields={filterFields}>
        <CreateUpdateCustomerModal />
      </DataTable>
      <CreateUpdateCustomerModal
        open={type === "update"}
        onOpenChange={clearRowAction}
        customer={row}
      />
    </>
  );
}
