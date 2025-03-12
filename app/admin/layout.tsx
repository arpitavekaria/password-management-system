import React, {Suspense} from "react";
import AdminLayoutWrapper from "@/components/layout/AdminLayoutWrapper";
import Loading from "@/app/admin/loading";
import {AuthProvider} from "@/context/AuthContext";

export const metadata = {
    title: 'Password Management',
    description: 'Password Management',
}

export default function Layout({children}: { children: React.ReactNode }) {

    return (
        <>
            <AuthProvider>
                <section>
                    <AdminLayoutWrapper>
                        <Suspense fallback={<Loading/>}>
                            {children}
                        </Suspense>
                    </AdminLayoutWrapper>
                </section>
            </AuthProvider>
        </>
    )
}