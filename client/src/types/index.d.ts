type User = {
  id: string;
  name: string;
  username: string;
  role: string;
}

type AuthResponse = {
  user: User;
  token: string;
  error?: string;
}

type ApiResponse = {
  message?: string;
  error?: string;
}