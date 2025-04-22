import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer } from "@/api/customer/actions";
import { CustomerSchema, customerSchema } from "@/api/customer/validations";
import { CustomerForm } from "@/pages/customers/form";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { LoaderButton } from "@/components/loader-button";
import { useUbigeos } from "@/hooks/use-ubigeos";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  customer?: Customer | null;
}

const defaultValues: CustomerSchema = {
  documentType: "DNI",
  documentNumber: "",
  name: "",
  tradeName: "",
  address: "",
  department: "",
  province: "",
  district: "",
  phone: "",
  email: "",
};

export const CreateUpdateCustomerModal = ({ customer, ...props }: Props) => {
  const { getDepartamento, getDistrito, getProvincia } = useUbigeos();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer
      ? { ...customer, documentType: customer?.documentType as "RUC" | "DNI" }
      : defaultValues,
  });

  useEffect(() => {
    form.reset(
      customer
        ? { ...customer, documentType: customer?.documentType as "RUC" | "DNI" }
        : defaultValues
    );
  }, [customer, form, open]);

  const onSubmit = async (data: CustomerSchema) => {
    try {
      const dep = getDepartamento(data.department ?? "");
      const prov = getProvincia(data.department ?? "", data.province ?? "");
      const dist = getDistrito(
        data.department ?? "",
        data.province ?? "",
        data.district ?? ""
      );

      const payload = {
        ...data,
        department: dep?.nombre,
        province: prov?.nombre,
        district: dist?.nombre,
      };

      const { error, message } = customer
        ? await updateCustomer(customer.id, data)
        : await createCustomer(payload);

      if (error) {
        toast.error(error);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["customers"] });
      form.reset();
      toast.success(message);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const title = customer ? "Actualizar cliente" : "Crear cliente";
  const description = customer
    ? "Actualiza la información del cliente"
    : "Crea un nuevo cliente";
  const triggerContent =
    customer === undefined ? <Button>Crear cliente</Button> : null;

  return (
    <Modal
      title={title}
      description={description}
      triggerContent={triggerContent}
      onInteractOutside={(e) => e.preventDefault()}
      open={open}
      onOpenChange={setOpen}
      {...props}
    >
      <CustomerForm form={form} onSubmit={onSubmit}>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <LoaderButton
            label="Guardar"
            loadLabel="Guardando.."
            disabled={form.formState.isSubmitting}
            type="submit"
          />
        </DialogFooter>
      </CustomerForm>
    </Modal>
  );
};
