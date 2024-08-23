"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useAppDispatch, useQueries } from "@/lib/hooks";
import { getAllAudienceLists, getCampignAudienceLists } from "@/lib/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setCloseDialog } from "@/lib/features/dialogSlice";
import { useToast } from "../ui/use-toast";
import { connectAudienceListToCampaign } from "@/actions/campaigns";

const SelectAudienceForm = ({ id }: { id: string }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSelect = (value:string) => {
    setSelectedValues((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const { data: listsData } = useQueries({
    fn: getAllAudienceLists, // Pass the function reference
    params: [data?.user?.id as string], // Pass the parameters as an array
  });

  const { data: selectedListsData } = useQueries({
    fn: getCampignAudienceLists, // Pass the function reference
    params: [id as string], // Pass the parameters as an array
  });

  useEffect(() => {
    if (selectedListsData) {
      setSelectedValues(selectedListsData?.map((e) => e?.id));
    }
  }, [selectedListsData]);

  const handleCreateNewList = () => {
    dispatch(setCloseDialog());
    router.push(`/dashboard/audiences/create?campaignId=${id}`);
  };

  const filteredLists = listsData?.filter((list) =>
    list?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddList = async () => {
    try {
      await connectAudienceListToCampaign({
        audienceListId: selectedValues,
        campaignId: id,
        userId: data?.user?.id as string,
      });
      toast({
        title: "List(s) Added Successfully",
      });

      dispatch(setCloseDialog());
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message,
      });
    }
  };

  return (
    <div className="py-10 flex flex-col gap-10">
      <h1>Select Audience Lists</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={true}
            className="w-full justify-between"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} List${
                  selectedValues.length > 1 ? "s" : ""
                } Selected`
              : "Select lists..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 relative">
          <Command className="w-[450px]">
            <CommandInput
              placeholder="Search lists..."
              onValueChange={(e) => setSearchTerm(e)}
            />
            <CommandList>
              <CommandEmpty>No lists found.</CommandEmpty>
              <CommandGroup>
                {filteredLists?.map((list) => (
                  <CommandItem
                    key={list?.id}
                    onSelect={() => handleSelect(list?.id)}
                    className={clsx(
                      "cursor-pointer flex items-center p-2",
                      selectedValues.includes(list?.id) ? "bg-gray-200" : ""
                    )}
                  >
                    <Check
                      className={clsx(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(list?.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {list?.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex items-center justify-between">
        <Button
          className="w-max"
          variant={"secondary"}
          onClick={handleCreateNewList}
        >
          Create New List
        </Button>
        <Button className="w-max" onClick={handleAddList}>
          Save Lists
        </Button>
      </div>
    </div>
  );
};

export default SelectAudienceForm;
