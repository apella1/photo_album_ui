"use client";

import CustomButton from "@/components/ui/CustomButton";
import { client } from "@/lib/axios";
import { ErrorResponse, LoginData, LoginResponse } from "@/types/auth";
import { Stack, TextField, Typography } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await client
        .post("login", formData)
        .then((res: AxiosResponse<LoginResponse>) => {
          if (res.status === 200) {
            const token = res.data.token;
            localStorage.setItem("token", token);
            setSuccessMsg("Successfully logged in!");
            router.push("/");
          } else {
            throw new Error("Invalid server response.");
          }
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          const errMsg = err.response?.data.error;
          setError(
            typeof errMsg === "string"
              ? errMsg
              : "An unexpected error occurred. Please try again later."
          );
        });
    } catch (error: unknown) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser().catch((err) => {
      console.error(err);
    });
  };

  return (
    <section className="py-16 px-8 md:px-16 2xl:px-28 w-[50%]">
      <Stack spacing={4}>
        <Stack spacing={2} className="">
          <div className="w-full py-3 flex items-center space-x-6 justify-center border border-gray-200">
            <FcGoogle className="text-2xl" />
            <p>Log In With Google</p>
          </div>
          <div className="w-full py-3 flex items-center space-x-6 justify-center border border-gray-200">
            <FaGithub className="text-2xl" />
            <p>Log In With GitHub</p>
          </div>
        </Stack>
        <div className="flex flex-col">
          <p className="self-center text-gray-600">or</p>
        </div>
        <form
          action=""
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleLogin}
        >
          {error && (
            <p className="text-red-700 text-base text-center">{error}</p>
          )}
          {successMsg && (
            <p className="text-red-700 text-base text-center">{error}</p>
          )}

          <TextField
            required
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <CustomButton
            button={{
              title: "Login",
              bgColor: "bg-[#035afc]",
              textColor: "text-white",
              type: "submit",
              full: true,
              disabled: loading,
            }}
          />
        </form>
        <section className="flex items-center space-x-2 self-center">
          <Typography>Don&apos;t Have an Account?</Typography>
          <Link href="/auth/sign-up" className="text-blue-600">
            Sign Up
          </Link>
        </section>
      </Stack>
    </section>
  );
}
