'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Mail, Lock, Eye, EyeOff,  } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaFacebook, } from 'react-icons/fa';
import { BsApple } from 'react-icons/bs';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Login Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Signup Schema
const signupSchema = z.object({
  name:z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading]=useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router=useRouter()
  // Login Form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Signup Form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {name:"", email: '', password: '', confirmPassword: '' },
    
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, data);
      console.log('Login successful:', res.data);
      
    const { token, user } = res.data;

    // Store auth data (localStorage or cookies)
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);

    toast.success("Login successful!");

   
      router.push("/dashboard");
    

     
    } catch (error) {
      console.error('Login failed:', error);
      // Show error toast
    toast.success('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, data);
      console.log('Signup successful:', res.data);
      // Show success toast
     toast.success('Signup successful!');
      setIsLogin(true);
      signupForm.reset()
    } catch (error) {
      console.error('Signup failed:', error);
      // Show error toast
      toast.success('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // google login
    const handleSuccess = async (credentialResponse: any) => {
    const token = {
      token: credentialResponse?.credential,
    };
    
    
    try {
      setLoading(true);
      
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google-token`, token);
      console.log(res);
      if ( res.data) {
        const { token ,data:{user}} = res.data;

       localStorage.setItem("token", token);
    localStorage.setItem("user", user);

    toast.success("Login successful!");
        
         router.push("/dashboard");
      
        
      } 
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 to-cyan-100 flex flex-col items-center justify-center p-4">
       {/* Logo & Header */}
        <div className="flex items-center justify-between mb-1 w-full">
          <div className="flex justify-center mb-6">
           <Link href="/">
            <Image
              src="/logo.png"
              alt="ZK Logo"
              width={120}
              height={70}
              className="object-contain"
            />
              </Link>
          </div>

          <div className="flex justify-end gap-3 mb-8">
            <Button
              variant={isLogin ? 'default' : 'outline'}
              onClick={() => setIsLogin(true)}
              className="rounded-full px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? 'default' : 'outline'}
              onClick={() => setIsLogin(false)}
              className="rounded-full px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      <div className="w-full max-w-md">
       

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin
                ? 'We missed you. Please provide your credential'
                : 'Join us today and start shopping'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...loginForm.register('email')}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="pl-10 pr-12 h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...loginForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm text-cyan-600 hover:underline">
                    Forget Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
                >
                  Log In
                </Button>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <div className="relative">
                  
                    <Input
                      id="signup-name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...signupForm.register('name')}
                    />
                  </div>
                  {signupForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{signupForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...signupForm.register('email')}
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-red-500">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="pl-10 pr-12 h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...signupForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-red-500">{signupForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      className="pl-10 pr-12 h-12 rounded-xl bg-gray-50 border-gray-200"
                      {...signupForm.register('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {signupForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
                >
                  Sign Up
                </Button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-12 rounded-xl">
                <FaFacebook color='blue' size={20} />
              </Button>
              <Button variant="outline" className="h-12 rounded-xl">
                <BsApple />
              </Button>
               <GoogleLogin
        onSuccess={(credentialResponse) => handleSuccess(credentialResponse)}
        onError={() => {
    console.log('Login Failed');
    
  }}
      />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}