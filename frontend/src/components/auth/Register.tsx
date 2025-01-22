import React, { useState } from "react";
import api from "../../services/api";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Register: React.FC = () => {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post("/register", values);
      console.log("User registered:", response.data);
      // Optionally, you can log the user in automatically after registration
      const loginResponse = await api.post("/login", values);
      const { token } = loginResponse.data;
      localStorage.setItem("token", token);
      window.location.href = "/forum";
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="container mx-auto py-6 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Register for Gossip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)}>
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
                <Button type="submit">Register</Button>
              </div>
            </form>
          </Form>
          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
