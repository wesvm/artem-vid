import { Link, useLocation } from "react-router";
import { LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
  SidebarGroup,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavProps {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function NavMain({ items }: { items: NavProps[] }) {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={
                item.url === "/"
                  ? location.pathname === item.url
                  : location.pathname.startsWith(item.url)
              }
              tooltip={item.title}
              asChild
            >
              <Link to={item.url} onClick={() => setOpenMobile(false)}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
