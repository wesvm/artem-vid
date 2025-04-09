import { useAuth } from "@/setup/auth-context";
import { Dialog, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {}

export const LogoutModal = ({ ...props }: Props) => {
  const { logout } = useAuth();

  const logOut = () => {
    props.onOpenChange?.(false);
    logout();
  };

  return (
    <Modal
      title="Salir"
      description="Desea cerrar su sesión? Tendrás que volver a ingresar tus credenciales."
      {...props}
    >
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="button" variant="destructive" onClick={logOut}>
          Salir
        </Button>
      </DialogFooter>
    </Modal>
  );
};
