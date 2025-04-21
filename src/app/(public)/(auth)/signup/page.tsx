"use client";
import { responseType } from "@/lib/types";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signup } from "../../../../actions/auth";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const inputs = [
  {
    type: "text",
    id: "name",
    name: "name",
    label: "Name",
  },
  {
    type: "email",
    id: "email",
    name: "email",
    label: "Email Address",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    label: "Password",
  },
];

const Signup = () => {
  const [{ success, message, data, errors }, submitForm, isPending] =
    useActionState(signup, {} as responseType);

  useEffect(() => {
    if (success) redirect("/login");
  }, [success]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        {!success && message && (
          <Alert variant="destructive" className="bg-transparent mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form action={submitForm} className="space-y-4">
            {inputs.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={input.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {input.label}
                </label>
                <input
                  autoFocus
                  type={input.type}
                  id={input.id}
                  name={input.name}
                  defaultValue={data?.[input.id as keyof typeof data]}
                  className={`${
                    errors?.[input.id as keyof typeof errors]
                      ? "border-red-500"
                      : "border-gray-300"
                  } w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors?.[input.id as keyof typeof errors] &&
                  errors[input.id as keyof typeof errors].map((error) => (
                    <p key={error} className="text-sm text-red-500 mt-1">
                      {error}
                    </p>
                  ))}
              </div>
            ))}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isPending
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-blue-700"
              }`}
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
