import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { jwtDecode } from "jwt-decode";
import { FaPen } from "react-icons/fa";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import Tag from "./Tag";

interface DecodedToken {
  username: string;
}

interface Tag {
  ID: number;
  Name: string;
  Color: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  tags: z.array(z.number()), // Array of tag IDs
});

const AddThread: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags");
        setAllTags(response.data);
      } catch (error) {
        console.error("There was an error fetching the tags!", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");
    if (!username) {
      console.error("Username is not available");
      return;
    }
    try {
      const response = await api.post("/threads", {
        title: values.title,
        content: values.content,
        username: username,
        tags: values.tags,
      });
      console.log("Thread created:", response.data);
      setSuccess("Thread posted!");
    } catch (error) {
      console.error("There was an error creating the thread!", error);
      setError("There was an error creating the thread!");
    }
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Post a Thread</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        placeholder="Enter the thread title"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.title && (
                      <FormMessage className="text-red-500 text-xs italic">
                        {form.formState.errors.title?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <FormControl>
                      <Textarea
                        id="content"
                        placeholder="Enter the thread content"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.content && (
                      <FormMessage className="text-red-500 text-xs italic">
                        {form.formState.errors.content?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Tags</FormLabel>
                      <FormDescription>
                        Select the tags for the thread.
                      </FormDescription>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {allTags.map((item) => (
                        <FormItem
                          key={item.ID}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.ID)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.ID])
                                  : field.onChange(
                                      field.value.filter(
                                        (value: number) => value !== item.ID
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel>
                            <Tag name={item.Name} color={item.Color} />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between mt-4">
                <Button type="submit">
                  <FaPen className="inline-block mr-2" />
                  Post Thread
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddThread;
