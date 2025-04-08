import { cn } from "@/lib/utils";
import { type UseFormReturn } from "react-hook-form";
import { type AuthSchema } from "@/api/auth/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { LoaderButton } from "@/components/loader-button";

interface Props extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<AuthSchema>;
  onSubmit: (data: AuthSchema) => void;
  classname?: string;
}

export const LoginForm = ({ form, onSubmit, className }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-4", className)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input
                  placeholder="admin"
                  type="text"
                  autoComplete="username"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="******"
                  autoComplete="current-password"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          type="submit"
          label="Ingresar"
          loadLabel="Ingresando.."
          disabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};
