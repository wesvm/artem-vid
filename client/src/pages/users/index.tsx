import { getUsers } from "@/api/user/queries";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { columns } from "@/pages/users/data-table/columns";
import { UsersTable } from "@/pages/users/data-table/data-table";
import { useQuery } from "@tanstack/react-query";

export default function UsersPage() {
  const { status, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return (
    <div className="space-y-4">
      {status === "pending" && (
        <DataTableSkeleton
          searchableColumnCount={1}
          filterableColumnCount={1}
        />
      )}

      {data?.users && <UsersTable columns={columns} data={data.users} />}
    </div>
  );
}
