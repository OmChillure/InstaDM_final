"use client";

import DashboardWrapper from "@/components/hoc/DashboardPagesWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { createAudienceSchema } from "@/schemas/audience";
import { useToast } from "@/components/ui/use-toast";
import { createAudienceList } from "@/actions/audienceList";
import { useRouter, useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { AUDIENCE_TYPE } from "@/lib/constants";
import { useSession } from "next-auth/react";

function Page() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [rawUsernames, setRawUsernames] = useState("");
  const {data} = useSession()

  const form = useForm({
    resolver: zodResolver(createAudienceSchema),
    defaultValues: {
      name: "",
      desc: "",
      userNames: [] as string[],
      type: "RAW" as
        | "RAW"
        | "CSV"
        | "FOLLOWERS"
        | "FOLLOWINGS"
        | "LIKES"
        | "JSON",
      parentUsernames: [] as string[],
    },
  });

  async function onSubmit(values: z.infer<typeof createAudienceSchema>) {
    try {
      if (values.type !== "CSV") {
        values.parentUsernames = rawUsernames
          .split("\n")
          .map((uname) => uname.trim())
          .filter((uname) => uname !== "");

        if (values?.parentUsernames?.length === 0) {
          throw new Error("Enter the accounts correctly");
        }
      } else {
        if (values?.userNames?.length === 0) {
          throw new Error("Found no user from csv file");
        }
      }

      await createAudienceList(
        values,
        data?.user?.id as string,
        searchParams.get("campaignId") || undefined
      );
      toast({
        title: "List Initialized Successfully",
      });

      router.push("/dashboard/audiences");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message,
      });
    }
  }

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const usernames = results.data
            .flat()
            .map((uname: any) => uname?.trim())
            .filter((uname) => uname !== "");
          form.setValue("userNames", usernames);
        },
        header: false,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => {
          form.reset();
          setRawUsernames("")
        }}
        className="w-full md:w-3/4 h-full flex flex-col gap-8 "
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>List Name</FormLabel>
                <FormControl>
                  <Input placeholder="List name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the list" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Tabs
            defaultValue="RAW"
            onValueChange={(value: any) => form.setValue("type", value)}
          >
            <TabsList className="justify-between mb-5">
              {AUDIENCE_TYPE?.map((e) => (
                <TabsTrigger value={e} key={e}>
                  {e}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="CSV">
              <FormItem>
                <FormLabel>Upload CSV</FormLabel>
                <FormControl>
                  <Input type="file" onChange={handleCSVUpload} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </TabsContent>

            {["FOLLOWERS", "FOLLOWINGS", "LIKES", "RAW"].map((type) => (
              <TabsContent key={type} value={type}>
                <FormItem>
                  <FormLabel>Instagram Usernames</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="One username per line"
                      rows={6}
                      value={rawUsernames}
                      onChange={(e) => setRawUsernames(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="flex items-center justify-between">
          <Button type="reset" className="w-max">
            Reset
          </Button>
          <Button type="submit" className="w-max" disabled={form?.formState?.isSubmitting}>
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DashboardWrapper(Page, "Create Audience List");
