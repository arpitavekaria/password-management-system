"use client"

import {ChevronRight} from "lucide-react"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {MenuItemArray} from "@/lib/utiills/menuItemArray";
import Link from "next/link"
import {usePathname} from "next/navigation";

export const NavMain = () => {
    const pathname = usePathname();
    return (
        <SidebarGroup>
            {MenuItemArray.map((item,index) => (
                <div key={index}>
                    {/* Conditionally render menuTitle if it's provided */}
                    {item.menuTitle && (
                        <SidebarGroupLabel className="text-[#9b9fb3] font-medium">
                            {item.menuTitle}
                        </SidebarGroupLabel>
                    )}

                    <SidebarMenu>
                        {item.items && item.items.length > 0 ? (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={
                                    pathname === item.url || (Array.isArray(item.items) && item.items.some((subItem) => pathname.startsWith(subItem.url)))
                                }
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            size="default"
                                            className="text-[#9b9fb3] font-medium hover:bg-transparent hover:text-white data-[state=open]:hover:text-white data-[state=open]:hover:bg-transparent focus:bg-transparent"
                                        >
                                            {item.icon && (
                                                <span
                                                    className={`${
                                                        pathname === item.url ||
                                                        item.items.some((subItem) =>
                                                            pathname.startsWith(subItem.url) // Use startsWith() here
                                                        )
                                                            ? 'text-white'
                                                            : ''
                                                    }`}
                                                >
                                            <item.icon className="w-4"/>
                                        </span>
                                            )}
                                            <span
                                                className={`${
                                                    pathname === item.url ||
                                                    item.items.some((subItem) =>
                                                        pathname.startsWith(subItem.url) // Use startsWith() here
                                                    )
                                                        ? 'text-white'
                                                        : ''
                                                } `}
                                            >
                                        {item.title}
                                    </span>
                                            <ChevronRight
                                                className={`ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ${
                                                    pathname === item.url ||
                                                    item.items.some((subItem) =>
                                                        pathname.startsWith(subItem.url) // Use startsWith() here
                                                    )
                                                        ? 'text-white'
                                                        : ''
                                                } sidebar-main-menu`}
                                            />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items.map((subItem,i) => (
                                                <SidebarMenuSubItem key={i}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        className="hover:bg-transparent hover:text-white text-[#9b9fb3] active:bg-transparent active:text-white"
                                                    >
                                                        <Link href={subItem.url}>
                                                    <span
                                                        className={`before:content-['-'] before:mx-1 sidebar-sub-menu  ${
                                                            pathname === subItem.url
                                                                ? 'text-white'
                                                                : ''
                                                        }`}
                                                    >
                                                        {subItem.title}
                                                    </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            ) : (
                            // Render a single menu item (no sub-items)
                            <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild size="sm" className="menu-hover">
                            <Link href={item.url} className="flex items-center gap-2 px-3 py-2 rounded-md">
                                {item.icon && (
                                    <span
                                        className={`${
                                            pathname === item.url
                                                ? 'text-white'
                                                : ''
                                        } sidebar-main-menu-icon`}
                                    >
                                        <item.icon/>
                                    </span>
                                )}
                                <span
                                    className={`${
                                        pathname === item.url
                                            ? 'text-white'
                                            : ''
                                    } sidebar-main-menu`}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    )}
                </SidebarMenu>
                </div>
                ))}
        </SidebarGroup>
    )
}

