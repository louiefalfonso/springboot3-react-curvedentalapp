import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import MainLogo from '@/assets/curve-dental-logo.jpeg';

const LoginFormComponent = () => {

  const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <img src={MainLogo} alt="Logo" className="main-logo" />
          <CardTitle className="text-2xl text-center">Account Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        
              >
                Login
              </Button>
            </div>
            {error && <div className="mt-2 text-center text-red-500">{error}</div>}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginFormComponent

/*
import React, { FC, useState, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../assets/sun-life-financial-logo.png";
import background from "../assets/bg-image.jpg";

const Login: FC = () => {
  const API_BASE_URL: string = import.meta.env.VITE_BASE_URI_AUTH;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { token }: { token: string } = response.data;
      localStorage.setItem("token", token);
      toast.success("Login Successful!");
      window.location.href = "/dashboard";
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
        <div className="max-w-[550px] flex-none w-full bg-white border border-black/10 p-6 sm:p-10 lg:px-10 lg:py-14 rounded-2xl loginform dark:bg-darklight dark:border-darkborder">
          <img src={logo} className="mx-auto dark-logo h-44 logo" alt="logo" />
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
            </div>
            <div>
              <input
                type="password"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              type="submit"
              className="btn w-full py-3.5 text-base bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
            >
              Sign In
            </button>
          </form>
          <p className="mt-5 text-center text-muted dark:text-darkmuted">
            Don’t have a My Sun Life Client Portal account?<br/>
            <Link to="/register" className="text-blue-500 dark:text-white">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
*/