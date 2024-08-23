"use client";

import DashboardWrapper from "@/components/hoc/DashboardPagesWrapper";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import icons from "@/lib/icons";
import useQueries from "@/hooks/useQueries";
import { getAllAudienceLists, getAllCampaigns } from "@/lib/queries";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const { data } = useSession();
  const router = useRouter()

  const {
    data: listsData,
    loading,
    error,
    refetch,
  } = useQueries({
    fn: getAllAudienceLists, // Pass the function reference
    params: [data?.user?.id as string], // Pass the parameters as an array
  });

  return (
    <div>
      <div className="mx-auto p-4 bg-white shadow rounded-md">
        <Table className="w-max md:w-full">
          <TableHeader>
            <TableRow className="h-10 mb-10">
              <TableCell>List Name</TableCell>
              <TableCell>User Counts</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Last updated at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listsData?.map((list) => (
              <TableRow key={list?.id} className="cursor-pointer h-14">
                <TableCell>{list?.name}</TableCell>
                <TableCell>{list?.userNames?.length}</TableCell>
                <TableCell>{list?.type}</TableCell>
                <TableCell>{new Date(list?.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* <DropdownMenuItem onClick={()=>{router.push(`/dashboard/audiences?campaign=${campaign?.id}`)}}>Manage Targets</DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>{router.push(`/dashboard/messages?campaign=${campaign?.id}`)}}>Manage Messages</DropdownMenuItem> */}
                      <DropdownMenuItem>Launch</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardWrapper(Page, "Audience Lists", "", {
  text: "Create Audience List",
  icon: icons?.Rocket({ color: "#2D264BB2" }),
  iconAction: icons?.Plus({ size: 16 }),
  navigateTo: "/dashboard/audiences/create",
});
