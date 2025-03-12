"use client";

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation"; // Using usePathname for route information
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {ModulesArray} from "@/lib/utiills/modulesArray";

interface BreadCrumbProps {
    mainMenu?: string;
    mainMenuLink?: string;
}

const BreadCrumbUi = (props:BreadCrumbProps) => {
    const {mainMenu,mainMenuLink} = props;

    const router = useRouter(); // For navigation methods like push, replace
    const pathname = usePathname(); // Hook to get the current route path

    const [currentPageName, setCurrentPageName] = useState("");

    useEffect(() => {
        if (!pathname) return; // Safeguard in case pathname is undefined

        const routeName = pathname.split("/")[2]; // Extract the main route

        const currentPageKey = ModulesArray.find((page) => page.path === routeName)?.title || " ";
        setCurrentPageName(currentPageKey);
    }, [pathname]);

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {/*<BreadcrumbItem className="hidden md:block">*/}
                    {/*    <BreadcrumbLink href="#" className="breadcrumb-menu-text-color">*/}
                    {/*        Admin*/}
                    {/*    </BreadcrumbLink>*/}
                    {/*</BreadcrumbItem>*/}
                    {/*<BreadcrumbSeparator className="hidden md:block"/>*/}
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={mainMenuLink} className="breadcrumb-menu-text-color">
                            {mainMenu}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block"/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
};

export default BreadCrumbUi;
