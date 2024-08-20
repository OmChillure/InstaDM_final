import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarMobile } from "./Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sidebarOptionType } from "@/lib/types";
import icons from "@/lib/icons";
import { logout } from "@/actions/auth";
import { getUserAuthDetails } from "@/lib/queries";
import { useSession } from "next-auth/react";

interface NavbarProps {
  sidebarMobileOptions: sidebarOptionType[];
}

export const NavbarUserDashboard: React.FC<NavbarProps> = ({
  sidebarMobileOptions,
}) => {

  const {data, status} = useSession()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 box-border">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            {icons?.menu({ className : "h-5 w-5" })}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarMobile optionsArray={sidebarMobileOptions} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            {icons?.profile({ className : "h-5 w-5" })}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{data?.user?.name} <br/> {data?.user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Pricing</DropdownMenuItem>
          <DropdownMenuItem>Start Writing with Us</DropdownMenuItem>
          {/* <DropdownMenuItem>Feedback</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{
            logout()
          }}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
