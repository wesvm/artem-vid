import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/api/customer/queries";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { CustomerTable } from "@/pages/customers/data-table/data-table";
import { columns } from "@/pages/customers/data-table/columns";

export default function CustomersPage() {
  const { status, data } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });

  return (
    <div className="space-y-4">
      {status === "pending" && (
        <DataTableSkeleton
          searchableColumnCount={1}
          filterableColumnCount={1}
        />
      )}

      {data?.customers && (
        <CustomerTable columns={columns} data={data.customers} />
      )}
    </div>
  );
}
