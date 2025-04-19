"use client";
import { responseType, signupType } from "@/lib/types";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "../actions";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

let payload = { name: "", email: "", password: "" };

const SignupPage = () => {
  const [response, submitForm, isPending] = useActionState(
    signup,
    {} as responseType
  );

  console.log(response);

  if (response.error === false) {
    redirect("/login");
  } else if (response.error === true) payload = response.payload as signupType;

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        {response.error === true && (
          <Alert variant="destructive" className="bg-transparent mb-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{response.message}</AlertDescription>
          </Alert>
        )}
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form action={submitForm} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={payload.name}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={payload.email}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={payload.password}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isPending
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-blue-700"
              }`}
            >
              Sign Up
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
    </main>
  );
};

export default SignupPage;
