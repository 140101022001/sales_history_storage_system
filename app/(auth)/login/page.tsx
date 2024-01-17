"use client"

import LoginSchema from "@/prisma/schemas/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import managerLogin from "@/lib/managers/login"
import { useState } from "react"
import { AlertTriangle} from 'lucide-react';

const LoginForm = () => {
    const [error, setError] = useState<String>('');
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError("");
        const res = await managerLogin(values)
        if (res?.error) {
            setError(res.error);
        }
    }
    return (
        <div className="h-full flex justify-center items-center bg-sky-400">
            <div className="w-2/3 md:w-2/5 shadow-lg px-20 py-12 bg-white rounded-sm">
                <div className="text-center">
                    <h2 className="font-bold text-3xl">Login</h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && <div className="text-red-500 bg-destructive/30 h-[40px] rounded-sm flex justify-center items-center gap-2">
                            <AlertTriangle className="h-5 w-5"/><span className="font-semibold">{error}</span>
                        </div>}
                        <div className="pt-10">
                            <Button type="submit" variant='purple' className="w-full">Login</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm