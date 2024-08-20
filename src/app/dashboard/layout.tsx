"use client"
import { NavbarUserDashboard } from "@/components/layouts/Navbar";
import { SidebarDesktop } from "@/components/layouts/Sidebar";
import icons from "@/lib/icons";
import { LayoutProps, sidebarOptionType } from "@/lib/types";
import React from "react";

interface CustomSidebarOptionType extends sidebarOptionType {
  onClick?: () => void;
}

const SidebarDesktopOptions: CustomSidebarOptionType[] = [
  {
    title: "Dashboard",
    navigateTo: "/dashboard",
    icon: icons?.home({}),
  },
  {
    title: "Campaigns",
    navigateTo: "/dashboard/campaigns",
    icon: icons?.broadcast({}),
  },
  {
    title: "Audiences",
    navigateTo: "/dashboard/audiences",
    icon: icons?.users({}),
  },
  {
    title: "Messages",
    navigateTo: "/dashboard/messages",
    icon: icons?.messages({}),
  },
  // {
  //   title: "Accounts",
  //   navigateTo: "/dashboard/accounts",
  //   icon: icons?.profile({}),
  // },
  // {
  //   title: "CRM",
  //   navigateTo: "/dashboard/crm",
  //   icon: icons?.Blocks({}),
  // },
  {
    title: "Subscription",
    navigateTo: "/dashboard/subscription",
    icon: icons?.CircleDollarSign({}),
  },
  {
    title: "Setting",
    navigateTo: "/dashboard/setting",
    icon: icons?.Settings({}),
  },
  {
    title: "Extension",
    navigateTo: "https://chromewebstore.google.com/detail/colddms/ffcepcgicipeaajceijngacfelhpgofe",
    icon: icons?.AlignHorizontalJustifyCenterIcon({}),
    onClick: () => {
      console.log("Extension clicked");
    },
  },
];

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-start">
      <SidebarDesktop optionsArray={SidebarDesktopOptions} />

      <main className="flex flex-col flex-1 overflow-hidden h-screen">
        <NavbarUserDashboard sidebarMobileOptions={SidebarDesktopOptions} />

        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
