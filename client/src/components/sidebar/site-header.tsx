import { useLocation } from "react-router";
import { ToggleSidebar } from "@/components/sidebar/toggle-sidebar";
import { items } from "@/components/sidebar/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  const location = useLocation();
  const currentItem =
    items.main.find((item) => location.pathname.startsWith(item.url)) ?? null;

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <ToggleSidebar />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {currentItem ? currentItem.title : "Inicio"}
        </h1>
        <div className="flex w-full items-center justify-end gap-1 lg:gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
