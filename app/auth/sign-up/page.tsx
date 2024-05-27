"use client";

import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { UserData } from "@/types/user";
import { client } from "@/lib/axios";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ErrorResponse } from "@/types/auth";

export default function SignUp() {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  async function registerUser() {
    setServerError(null);
    setLoading(true);
    try {
      if (formData.password !== confirmPassword) {
        setPasswordError(true);
        return;
      } else {
        setPasswordError(false);
        await client
          .post("create_user", formData)
          .then(() => {
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            });
            setConfirmPassword("");
            setSuccessMessage("Signed up successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
          })
          .catch((error: AxiosError<ErrorResponse>) => {
            const errMsg = error.response?.data.error;
            setServerError(
              typeof errMsg === "string"
                ? errMsg
                : "An unexpected error occurred. Please try again later."
            );
          });
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const errMsg = (error as AxiosError<ErrorResponse>).response?.data
          .error;
        setServerError(
          typeof errMsg === "string"
            ? errMsg
            : "An unexpected error occurred. Please try again later."
        );
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser().catch((err) => {
      console.error(err);
    });
  };

  return (
    <section className="py-16 px-8 md:px-16 2xl:px-28 w-[50%]">
      <Stack spacing={4}>
        <Stack spacing={2} className="">
          <div className="w-full py-3 flex items-center space-x-6 justify-center border border-gray-200">
            <FcGoogle className="text-2xl" />
            <p>Sign Up With Google</p>
          </div>
          <div className="w-full py-3 flex items-center space-x-6 justify-center border border-gray-200">
            <FaGithub className="text-2xl" />
            <p>Sign Up With GitHub</p>
          </div>
        </Stack>
        <div className="flex flex-col">
          <p className="self-center text-gray-600">or</p>
        </div>
        <form
          action=""
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleRegistration}
        >
          {successMessage && (
            <p className="text-center text-base text-green-700">
              {successMessage}
            </p>
          )}
          {serverError && (
            <Typography color="error" className="text-center">
              {serverError}
            </Typography>
          )}
          <TextField
            required
            label="First Name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            required
            label="Last Name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
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
            error={passwordError}
            helperText={passwordError ? "Passwords do not match!" : ""}
            onChange={handleChange}
          />
          <TextField
            required
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            value={confirmPassword}
            error={passwordError}
            helperText={passwordError ? "Passwords do not match!" : ""}
            onChange={handleConfirmPasswordChange}
          />
          <Typography className="self-center">
            By signing up you agree to our Terms of Service and Privacy Policy
          </Typography>
          <CustomButton
            button={{
              title: "Sign Up",
              bgColor: "bg-[#035afc]",
              textColor: "text-white",
              full: true,
              type: "submit",
              disabled: loading,
            }}
          />
        </form>
        <section className="flex items-center space-x-2 self-center">
          <Typography>Already Have an Account?</Typography>
          <Link href="/auth/login" className="text-blue-600">
            Log In
          </Link>
        </section>
      </Stack>
    </section>
  );
}
