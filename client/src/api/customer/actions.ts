import { apiRequest } from "@/api/api-service";
import { CustomerSchema } from "@/api/customer/validations";

export const createCustomer = async (
  data: CustomerSchema
): Promise<ApiResponse> => {
  return apiRequest<ApiResponse>("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateCustomer = async (id: string, data: CustomerSchema) => {
  return apiRequest<ApiResponse>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export const deleteCustomer = async (id: string): Promise<ApiResponse> => {
  return apiRequest<ApiResponse>(`/customers/${id}`, {
    method: 'DELETE',
  });
}