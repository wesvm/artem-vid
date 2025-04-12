import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The number of searchable columns in the table.
   * @default 0
   * @type number | undefined
   */
  searchableColumnCount?: number;

  /**
   * The number of filterable columns in the table.
   * @default 0
   * @type number | undefined
   */
  filterableColumnCount?: number;
  /**
   * The width of each cell in the table.
   * The length of the array should be equal to the columnCount.
   * Any valid CSS width value is accepted.
   * @default ["auto"]
   * @type string[] | undefined
   */
  cellWidths?: string[];
}

export function DataTableSkeleton(props: DataTableSkeletonProps) {
  const {
    searchableColumnCount = 0,
    filterableColumnCount = 0,
    cellWidths = ["auto"],
    className,
    ...skeletonProps
  } = props;

  return (
    <div
      className={cn("w-full space-y-2.5 overflow-auto", className)}
      {...skeletonProps}
    >
      <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumnCount > 0
            ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-40 lg:w-60" />
              ))
            : null}
          {filterableColumnCount > 0
            ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-[4.5rem]" />
              ))
            : null}
        </div>
        <Skeleton className="h-8 w-[5.5rem]" />
      </div>
      <div>
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
