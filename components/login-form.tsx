"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const loginSchema = z.object({
  email: z
  .string()
  .trim()
  .email(
    "Enter a valid email address"
  )
  .refine(
    (value) =>
      /@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/i.test(
        value
      ),
    {
      message:
        "Only Gmail, Yahoo, Outlook, and Hotmail addresses are allowed",
    }
  ),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .max(
      15,
      "Password must not exceed 100 characters"
    )
    .refine(
      (value) => /[a-z]/.test(value),
      {
        message:
          "Password must contain at least one lowercase letter",
      }
    )
    .refine(
      (value) => /[0-9]/.test(value),
      {
        message:
          "Password must contain at least one number",
      }
    )
    .refine(
      (value) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(
          value
        ),
      {
        message:
          "Password must contain at least one special character",
      }
    ),
});
export type LoginFormData =
  z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [isLoading, setIsLoading] =
    useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof loginSchema>
  ) {
    try {
      setIsLoading(true);

      const result = await signIn.email({
        email: values.email,
        password: values.password,
      });

      console.log("LOGIN RESULT:", result);

      if (result?.error) {
        toast.error(
          result.error.message ||
          "Invalid email or password"
        );
        return;
      }

      if (!result?.data) {
        toast.error(
          "Invalid email or password"
        );
        return;
      }

      toast.success(
        "Login successful"
      );

      router.replace("/admin");

    } catch (error: any) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      toast.error(
        error?.message ||
        "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome back
          </CardTitle>

          <CardDescription>
            Login with your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit
              )}
              className="space-y-6"
            >
              <FieldGroup>

                {/* Google Button */}

                <Field>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    Login with Google
                  </Button>
                </Field>

                <FieldSeparator>
                  Or continue with
                </FieldSeparator>

                {/* Email */}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>

                      <FormControl>
                        <input
                          type="text"
                          placeholder="mk@gmail.com"
                          className="w-full border rounded-md p-2"
                          {...field}
                        />
                        { }
                      </FormControl>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Password */}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password
                      </FormLabel>

                      <FormControl>
                        <input
                          type="password"
                          placeholder="********"
                          className="w-full border rounded-md p-2"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                {/* Forgot Password */}

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-sm hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Logging in..."
                    : "Login"}
                </Button>

                {/* Sign Up */}

                <FieldDescription className="text-center">
                  Don&apos;t have an
                  account?{" "}
                  <a
                    href="#"
                    className="underline"
                  >
                    Sign up
                  </a>
                </FieldDescription>

              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you
        agree to our{" "}
        <a href="#">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}