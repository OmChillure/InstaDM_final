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

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  username: z.string().optional(),
  csvFile: z.any().optional(),
  instagramAccount: z.string().optional(),
});

function Page() {
  const [selectedTab, setSelectedTab] = useState("raw");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      workingHours: [8, 22],
      messagesPerDay: [50, 70],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => {
          form.reset();
        }}
        className="w-full md:w-3/4 h-full flex flex-col gap-8 "
      >
        <div>
          <FormField
            control={form.control}
            name="title"
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
            name="description"
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
          <Tabs defaultValue="raw" onValueChange={(value) => setSelectedTab(value)}>
            <TabsList className="justify-between mb-10">
              <TabsTrigger value="csv">CSV</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>

            <TabsContent value="csv">
              <FormField
                control={form.control}
                name="csvFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload CSV</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="raw">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usernames</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="One username per line"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="json">
              <FormField
                control={form.control}
                name="jsonFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload JSON</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            {["followers", "following", "likes"].map((type) => (
              <TabsContent key={type} value={type}>
                <FormField
                  control={form.control}
                  name="instagramAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram Account</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter Instagram account to fetch ${type}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>


        <div className="flex items-center justify-between mt-8">
          <Button type="reset" className="w-max">
            Reset
          </Button>
          <Button type="submit" className="w-max">
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DashboardWrapper(Page, "Create Audience List");
