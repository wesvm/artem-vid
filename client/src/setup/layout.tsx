import { Outlet } from "react-router";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="container contain-size px-4 lg:px-5">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
