import { apiRequest } from "@/api/api-service";

export const getCustomers = async (): Promise<{ customers: Customer[] }> => {
  return apiRequest<{ customers: Customer[] }>("/customers", {
    method: "GET",
  });
};
