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
import { useAppDispatch, useQueries } from "@/lib/hooks";
import { getAllCampaigns } from "@/lib/queries";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { setOpenDialog } from "@/lib/features/dialogSlice";
import SelectAudienceForm from "@/components/Dialogs/selectAudience";

function Page() {
  const { data } = useSession();
  const router = useRouter();

  const {
    data: campaignData,
    loading,
    error,
    refetch,
  } = useQueries({
    fn: getAllCampaigns, // Pass the function reference
    params: [data?.user?.id as string], // Pass the parameters as an array
  });

  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="mx-auto p-4 bg-white shadow rounded-md">
        <Table className="w-max md:w-full">
          <TableHeader>
            <TableRow className="h-10 mb-10">
              <TableCell>Name</TableCell>
              <TableCell>Messages Sent</TableCell>
              <TableCell>Replies Received</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignData?.map((campaign) => (
              <TableRow key={campaign?.id} className="cursor-pointer h-14">
                <TableCell>{campaign?.title}</TableCell>
                <TableCell>{campaign?.messagesSent}</TableCell>
                <TableCell>{campaign?.repliesReceived}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          dispatch(
                            setOpenDialog({
                              open: true,
                              child: <SelectAudienceForm id={campaign?.id}/>,
                            })
                          );
                        }}
                      >
                        Manage Targets
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(
                            `/dashboard/messages?campaign=${campaign?.id}`
                          );
                        }}
                      >
                        Manage Messages
                      </DropdownMenuItem>
                      <DropdownMenuItem>Launch</DropdownMenuItem>
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

export default DashboardWrapper(Page, "Campaigns", "", {
  text: "Create Campaign",
  icon: icons?.Rocket({ color: "#2D264BB2" }),
  iconAction: icons?.Plus({ size: 16 }),
  navigateTo: "/dashboard/campaigns/create",
});
