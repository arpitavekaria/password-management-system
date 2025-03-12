"use client"
import React from "react";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layout/app-sidebar";
import HeaderBox from "@/components/layout/header/HeaderBox";

export default function AdminLayoutWrapper({children,}: { children: React.ReactNode }) {

    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <SidebarInset>
                    <header
                        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50 header-bg-color">
                        <HeaderBox/>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container-bg-color">
                        <div className="w-full  mx-auto py-6">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}