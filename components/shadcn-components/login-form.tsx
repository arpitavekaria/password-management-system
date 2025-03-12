"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {startTransition, useActionState, useEffect, useMemo, useState} from "react";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner"
import {login} from "@/server/auth";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import {createAuthSession} from "@/lib/session/authSession";
import useCustomNavigation from "@/hooks/useCustomNavigation";
import Loading from "@/components/common/Loader";

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"div">) {

    const {navigateTo} = useCustomNavigation();


    const [showPassword, setShowPassword] = useState(false);
    const [state, dispatch, isPending] = useActionState(login, undefined);

    // const { toast } = useToast()

    const schema = yup.object().shape({
        email: yup.string().required("Email Is Required."),
        password: yup.string().required("Password is Required.").min(5)
    });

    const defaultValues = useMemo(() => ({
        password: '',
        email: ''
    }), []);

    const {
        control,
        setError,
        handleSubmit,
        formState: {errors},
        setValue,
        clearErrors
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data:any) => {
        try {
            const {email, password} = data;

            const formData = {
                email: email,
                password: password,
            };

            startTransition(() => {
                dispatch(formData);
            });

        } catch (error) {
            console.error("Error fetching register session:", error);
        }
    };

    useEffect(() => {
        const handleSession = async () => {
            if (state?.status === ApiResponseType.SUCCESS) {

                console.log(state?.data)
                await createAuthSession({
                    accessToken: state?.data?.data?.token,
                    user: {
                        name: state?.data?.data?.user?.name,
                        id: state?.data?.data?.user?.id,
                        email: state?.data?.data?.user?.email,
                        image: state?.data?.data?.user?.image,
                    },
                });

                const timer = setTimeout(() => {
                    navigateTo('/admin/analytics');
                }, 500);

                return () => {
                    clearTimeout(timer);
                };
            }
        };

        handleSession();
    }, [state]);

    useEffect(() => {
        if (state?.status === ApiResponseType.ERROR) {
            if (Array.isArray(state?.error) && state.error.length > 0) {
                toast.error(state.error[0]);
            } else if (typeof state?.error === 'string') {
                toast.error(state.error);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }, [state]);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Loading loading={isPending}/>
            <Card className='rounded-sm border-0'>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({field: {value,onChange, onBlur}}) => (
                                        <Input
                                            type='email'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            placeholder='Email'
                                        />
                                    )}

                                />
                                {errors.email && (
                                    <div className="p-1 text-sm text-danger" role="alert">
                                        <i className="bx bx-error-circle"/> {errors.email.message}
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({field: {value, onChange, onBlur}}) => (
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                id="password" value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                placeholder='Password'
                                                />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <span><i className="bx bx-show" /></span>
                                                ) : (
                                                    <span><i className="bx bx-low-vision"/></span> // Replace with your hidden icon
                                                )}
                                            </button>
                                        </div>
                                    )}
                                />
                                {errors.password && (
                                    <div className="p-1 text-sm text-danger" role="alert">
                                        <i className="bx bx-error-circle"/> {errors.password.message}
                                    </div>
                                )}
                            </div>
                            <Button type="submit"
                                    className="w-full">
                                Login
                            </Button>
                            {/*<Button variant="outline" className="w-full">*/}
                            {/*  Login with Google*/}
                            {/*</Button>*/}
                        </div>
                        {/*<div className="mt-4 text-center text-sm">*/}
                        {/*  Don&apos;t have an account?{" "}*/}
                        {/*  <a href="#" className="underline underline-offset-4">*/}
                        {/*    Sign up*/}
                        {/*  </a>*/}
                        {/*</div>*/}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
