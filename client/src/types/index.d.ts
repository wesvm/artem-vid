type User = {
  id: string;
  name: string;
  username: string;
  role: string;
};

type Customer = {
  id: string;
  documentType: string;
  documentNumber: string;
  name: string;
  tradeName?: string;
  address?: string;
  department?: string;
  province?: string;
  district?: string;
  phone?: string;
  email?: string;
};

type AuthResponse = {
  user: User;
  token: string;
  error?: string;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

type DataTableRowAction<TData> = {
  row: Row<TData>;
  type: "update" | "delete";
};

type DataTableFilterField<TData> = {
  id: StringKeyOf<TData>;
  label: string;
  status?: error | success | pending;
  placeholder?: string;
  options?: Option[];
};

type Option = {
  label: string;
  value: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  count?: number;
};
