import { useSidebar } from "@/components/ui/sidebar";
import { AlignJustify } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ToggleSidebar() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      className="rounded-md"
      variant="outline"
      size="icon"
    >
      <AlignJustify
        className={cn(
          "h-4 w-4 transition-transform ease-in-out duration-700",
          open === false ? "rotate-180" : "rotate-0"
        )}
      />
    </Button>
  );
}
