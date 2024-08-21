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

function Page() {
  const campaigns = [
    { id: 1, name: "Campaign 1", messagesSent: 523, repliesReceived: 38 },
    { id: 2, name: "Campaign 2", messagesSent: 450, repliesReceived: 22 },
    // Add more campaigns here
  ];

  return (
    <div>
      <div className="mx-auto p-4 bg-white shadow rounded-md">
        <Table className="w-max md:w-full">
          <TableHeader>
            <TableRow className="h-10 mb-10">
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Messages Sent</TableCell>
              <TableCell>Replies Received</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id} className="cursor-pointer h-14">
                <TableCell>{campaign.id}</TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.messagesSent}</TableCell>
                <TableCell>{campaign.repliesReceived}</TableCell>
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
  navigateTo: "/dashboard/campaigns/create"
});
