import { authSchema, AuthSchema } from "@/api/auth/validations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/setup/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthSchema) => {
    try {
      const { error } = await login(data);
      if (error) {
        toast.error(error);
        return;
      }

      navigate("/", { replace: true });
      form.reset();
      toast.success("Bienvenido!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Algo salió mal, por favor intenta de nuevo.");
    }
  };

  return (
    <main className="h-dvh flex items-center justify-center bg-muted">
      <Card className="w-full max-w-sm mx-auto shadow-md">
        <CardHeader className="items-center">
          <CardTitle>Inicio de sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm form={form} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </main>
  );
}
