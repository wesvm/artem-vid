import { Link } from "react-router";
import { Droplet, LogOut, User, UsersRound } from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutModal } from "@/components/auth/logout-modal";
import { useState } from "react";

export const items = {
  main: [
    {
      title: "Usuarios",
      url: "/users",
      icon: User,
    },
    {
      title: "Clientes",
      url: "/customers",
      icon: UsersRound,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = useState(false);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/" className="justify-center">
                <Droplet className="h-5 w-5" />
                <span className="text-base font-semibold">Artem Vid.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items.main} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              variant="outline"
              onClick={() => setOpen(true)}
              className="justify-center h-10"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="group-data-[collapsible=icon]:hidden">
                Cerrar sesión
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <LogoutModal open={open} onOpenChange={setOpen} />
    </Sidebar>
  );
}
