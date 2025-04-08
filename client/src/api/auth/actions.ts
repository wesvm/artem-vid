import { apiRequest } from "@/api/api-service";
import type { AuthSchema } from "@/api/auth/validations";

export const signIn = async (credentials: AuthSchema): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }, false);
};