import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CustomerSchema } from "@/api/customer/validations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUbigeos } from "@/hooks/use-ubigeos";
import { Combobox } from "./combo-box";
import { LoaderCircle } from "lucide-react";

interface Props extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<CustomerSchema>;
  onSubmit: (data: CustomerSchema) => void;
  classname?: string;
  children: React.ReactNode;
}

export const CustomerForm = ({
  form,
  onSubmit,
  className,
  children,
}: Props) => {
  const { loading, departamentos, getProvincias, getDistritos } = useUbigeos();
  const departamentoSeleccionado = form.watch("department") ?? "";
  const provinciaSeleccionada = form.watch("province") ?? "";

  const provincias = getProvincias(departamentoSeleccionado);
  const distritos = getDistritos(
    departamentoSeleccionado,
    provinciaSeleccionada
  );
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Documento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DNI">DNI</SelectItem>
                    <SelectItem value="RUC">RUC</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Documento</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      form.watch("documentType") === "DNI"
                        ? "12345678"
                        : "12345678901"
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {form.watch("documentType") === "DNI"
                    ? "Debe contener 8 dígitos"
                    : "Debe contener 11 dígitos"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre / Razón Social</FormLabel>
              <FormControl>
                <Input placeholder="Nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tradeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Comercial</FormLabel>
              <FormControl>
                <Input placeholder="Nombre comercial (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección completa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {loading && (
            <LoaderCircle
              className="size-4 animate-spin col-span-3 w-full"
              aria-hidden="true"
            />
          )}

          {departamentos && (
            <>
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Combobox
                      options={departamentos}
                      value={field.value}
                      onChange={(value) => {
                        form.setValue("department", value);
                        form.setValue("province", "");
                        form.setValue("district", "");
                      }}
                      placeholder="Seleccionar"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provincia</FormLabel>
                    <Combobox
                      options={provincias}
                      value={field.value}
                      onChange={(value) => {
                        form.setValue("province", value);
                        form.setValue("district", "");
                      }}
                      placeholder="Seleccionar"
                      disabled={!departamentoSeleccionado}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distrito</FormLabel>
                    <Combobox
                      options={distritos}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Seleccionar"
                      disabled={!provinciaSeleccionada}
                    />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono de contacto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="micorreo@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {children}
      </form>
    </Form>
  );
};
