import React from 'react';
import {LoginForm} from "@/components/shadcn-components/login-form";

const Login = () => {
    return (
        <>
            <div className="flex min-h-svh w-full bg-[#f2f2f2] items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm/>
                </div>
            </div>
        </>
    );
};

export default Login;
