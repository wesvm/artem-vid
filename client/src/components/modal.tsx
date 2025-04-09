import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsMounted } from "@/hooks/use-mounted";

interface ModalProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  title: string;
  description: string;
  triggerContent?: React.ReactNode;
  onInteractOutside?: (event: Event) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Modal = ({
  title,
  description,
  triggerContent,
  onInteractOutside,
  className,
  children,
  ...props
}: ModalProps) => {
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  if (isMobile) {
    return (
      <Drawer {...props}>
        {triggerContent && (
          <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
        )}
        <DrawerContent
          className={className}
          onInteractOutside={onInteractOutside}
        >
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="mx-4 mb-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog {...props}>
      {triggerContent && (
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      )}
      <DialogContent
        className={className}
        onInteractOutside={onInteractOutside}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
