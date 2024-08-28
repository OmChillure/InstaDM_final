"use client"
import { NavbarUserDashboard } from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
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
    title: "Audiences",
    navigateTo: "/dashboard/audiences",
    icon: icons?.users({}),
  },
  {
    title: "Sequence",
    navigateTo: "/dashboard/sequence",
    icon: icons?.messages({}),
  },
  {
    title: "Campaigns",
    navigateTo: "/dashboard/campaigns",
    icon: icons?.broadcast({}),
  },
  {
    title: "Settings",
    navigateTo: "/dashboard/settings",
    icon: icons?.broadcast({}),
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
    <div className="w-screen min-h-screen overflow-hidden flex items-start">
      <Sidebar />
      <main className="flex flex-col flex-1 overflow-hidden h-screen">
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
