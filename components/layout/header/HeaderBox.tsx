"use client"
import React, {useState} from 'react';
import {SidebarTrigger, useSidebar} from "@/components/ui/sidebar";
import {Separator} from "@radix-ui/react-menu";
import {Input} from "@/components/ui/input";
import {Copy, Search} from "lucide-react";
import Language from "@/components/layout/header/Language";
import ThemeToggle from "@/components/layout/theme-provider/theme-toggle";
import CartItems from "@/components/layout/header/CartItems";
import Notifications from "@/components/layout/header/Notiifcations";
import {NavUser} from "@/components/layout/nav-user";
import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const HeaderBox = () => {
    const {isMobile} = useSidebar()
    console.log("isMobile", isMobile)
    const [searchValue, setSearchValue] = useState<string>('');
    const [IsOpenModal, setIsOpenModal] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full">

                <div className="flex items-center px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator className="mr-2 h-4"/>
                </div>
                <div className="flex flex-grow items-center px-4">
                    {!isMobile && (
                        <>
                            <div className="relative w-full max-w-[400px]">
                                <Input
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    placeholder="Search anything here..."
                                    className="w-full h-10 ltr:pl-10 rtl:pr-11  text-[#bfc6d2] dark:bg-background placeholder-[#bfc6d2] text-[0.875rem] bg-white"
                                />
                                <div
                                    className="absolute top-1/2 ltr:left-3 rtl:right-5 -translate-y-1/2 text-[#bfc6d2] dark:bg-background placeholder-[#bfc6d2] text-[0.875rem] bg-white">
                                    <Search className="w-4"/>
                                </div>
                            </div>
                        </>)}
                </div>
                <div className="flex items-center px-4 gap-2">
                    {isMobile && (
                        <>
                            <Button variant="outline" size="sm" onClick={() => setIsOpenModal(true)}>
                                <Search  className="w-4" />
                            </Button>
                        </>)}
                    <Language/>
                    <ThemeToggle/>
                    <CartItems/>
                    <Notifications/>
                    <NavUser user={user}/>
                </div>
                {/*mobile search*/}
                <Dialog open={IsOpenModal} onOpenChange={setIsOpenModal}>
                    <DialogContent className="max-w-sm fixed top-[3.5rem] [&>button]:hidden">
                        <div className="relative w-full max-w-md md:max-w-lg">
                            <Input
                                placeholder="Search..."
                                className="w-full max-w-md md:max-w-lg bg-white dark:bg-background"
                            />
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 ltr:right-4 rtl:left-4 text-gray-500">
                                <Search/>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default HeaderBox;