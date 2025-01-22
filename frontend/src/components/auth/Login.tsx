import React, { useState } from "react";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Login: React.FC = () => {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post("/login", values);
      console.log("User logged in:", response.data);
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (err) {
      setError("Invalid username");
    }
  };

  return (
    <div className="container mx-auto py-6 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login to Gossip</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.username && (
                      <FormMessage className="text-red-500 text-xs italic">
                        {form.formState.errors.username?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
              <div className="flex items-center justify-between mt-4">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
