'use client'

import { useParams, useRouter } from 'next/navigation'
import { toast } from "sonner"; // ✅ Importing from sonner
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function VerifyAccount() {
    const router = useRouter();
    const param = useParams<{ username: string }>();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    });

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: param.username,
                code: data.code
            });

            toast.success(response.data.message); // ✅ Success toast

            router.replace('/sign-in');
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            const errorMessage = axiosError.response?.data.message || "Verification failed. Try again.";

            toast.error("Verification failed: " + errorMessage); // ✅ Error toast
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify your account
                    </h1>
                    <p className='mb-4'>Enter the verification code sent to your email</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default VerifyAccount;
