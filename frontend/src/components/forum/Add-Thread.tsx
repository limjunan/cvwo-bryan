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
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { jwtDecode } from "jwt-decode";
import { FaPen } from "react-icons/fa";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";

interface DecodedToken {
  username: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

const AddThread: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

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
