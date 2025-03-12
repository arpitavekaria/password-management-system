"use client"

import {ArrowLeft, ArrowRight, LogOut} from "lucide-react"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import {usePositionStore} from "@/components/store/store"
import React, {useEffect} from "react"
import {useTheme} from "next-themes"
import {deleteAuthSession} from "@/lib/session/authSession";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";

export function NavUser({
                            user,
                        }: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const {isMobile} = useSidebar()
    const {position, moveLeft, moveRight} = usePositionStore()
    const {setTheme, theme} = useTheme()  // Extract theme from useTheme()
    const router = useRouter();
    const auth = useAuth();

    useEffect(() => {
        document.documentElement.setAttribute('dir', position)
        if (typeof window !== "undefined") {
            localStorage.setItem("direction", position)
        }
    }, [position])

    const handleLogout = async () => {
        await deleteAuthSession();
        router.push("/login")
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg overflow-hidden">
                                <AvatarImage
                                    src={auth?.user?.image}
                                    alt={auth?.user?.name}
                                    className="h-full w-full object-contain"
                                />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>

                            {/*<div className="grid flex-1 text-left text-sm leading-tight">*/}
                            {/*    <span className="truncate font-semibold">{user.name}</span>*/}
                            {/*    <span className="truncate text-xs">{user.email}</span>*/}
                            {/*</div>*/}
                            {/*<ChevronsUpDown className="ml-auto size-4" />*/}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "bottom"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={auth?.user?.image} alt={auth?.user?.name}
                                                 className="h-full w-full object-contain"/>
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{auth?.user?.name}</span>
                                    <span className="truncate text-xs">{auth?.user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={position === "rtl" ? moveLeft : moveRight}>
                                {position === "rtl" ? (
                                    <>
                                        <ArrowLeft/>
                                        LTR
                                    </>
                                ) : (
                                    <>
                                        <ArrowRight/>
                                        RTL
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
