import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MainLogo from '@/assets/curve-dental-logo.jpeg';

import AuthService from '@/services/auth-services';

const RegisterFormComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await AuthService.register({ email, password });
      toast.success("Registration Successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to register.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <img src={MainLogo} alt="Logo" className="main-logo" />
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  className="form-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type="password"
                  className="form-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input
                  type="password"
                  className="form-input"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Register
              </Button>
            </div>
            {error && <div className="mt-2 text-center text-red-500">{error}</div>}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterFormComponent;


/*
import React, { FC, useState, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import logo from "../assets/sun-life-financial-logo.png";
import background from "../assets/bg-image.jpg";

const Register: FC = () => {
    const API_BASE_URL: string = import.meta.env.VITE_BASE_URI_AUTH;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);

    const handleRegistration = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const userData: { fullName: string; email: string; password: string } = { fullName, email, password };
            const response = await axios.post(`${API_BASE_URL}/signup`, userData);

            console.log("User Registered:", response.data);
            setRegistrationSuccess(true);
            toast.success("Registration successful!");
            window.location.href = "/login";
        } catch (error) {
            setError("Invalid email or password.");
        }
    };

    return (
        <>
            <div
                style={{ backgroundImage: `url(${background})` }}
                className="min-h-screen py-4 px-4 sm:px-12 flex justify-center items-center mx-auto bg-cover bg-center bg-no-repeat"
            >
                <div className="max-w-[550px] flex-none w-full bg-white border border-black/10 p-6 sm:p-10 lg:px-10 lg:py-14 rounded-2xl dark:bg-darklight dark:border-darkborder">
                    <img src={logo} className="mx-auto dark-logo h-44 logo" alt="logo" />
                    <h3 className="mb-2 text-xl font-semibold text-center dark:text-white">
                        New Account Registration
                    </h3>
                    <div className="flex items-center mb-7">
                        <div className="w-full h-[2px] bg-black/10 dark:bg-darkborder"></div>
                    </div>
                    <form
                        onSubmit={handleRegistration}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Full Name"
                                className="form-input"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Email Address:
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Email Address"
                                className="form-input"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-input"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn sm:col-span-2 w-full py-3.5 text-base bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
                        >
                            Create an account
                        </button>
                    </form>
                    <p className="mt-5 text-center text-muted dark:text-darkmuted">
                        Already a member?{" "}
                        <Link to="/login" className="text-blue-500 dark:text-white">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Register;
*/