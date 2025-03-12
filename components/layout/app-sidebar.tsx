"use client"
import * as React from "react"
import {useEffect, useState} from "react"
import {AudioWaveform, Command, Frame, GalleryVerticalEnd, Map, PieChart} from "lucide-react"

import {NavMain} from "@/components/layout/nav-main"
import {TeamSwitcher} from "@/components/layout/team-switcher"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/ui/sidebar"
import {usePositionStore} from "@/components/store/store"
import {NavUser} from "@/components/layout/nav-user"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {position} = usePositionStore();
    const [direction, setDirection] = useState<"left" | "right">("left"); // set initial state to "left" by default

    console.log("position", position);
    useEffect(() => {
        // Convert "ltr" to "left" and "rtl" to "right"
        const directionState = position === "rtl" ? "right" : "left";
        setDirection(directionState);
    }, [position]);

    return (
        <>
            <Sidebar collapsible="icon"
                     side={direction}
                     {...props}>
                <SidebarHeader className="bg-[#202947] dark:bg-background text-white border-b border-[#FFFFFF1A]">
                    <TeamSwitcher teams={data.teams}/>
                </SidebarHeader>
                <SidebarContent className="bg-[#202947] dark:bg-background">
                    <NavMain/>
                    {/*<NavProjects projects={data.projects}/>*/}
                </SidebarContent>
                {/*<SidebarFooter className="sidebar-text-color">*/}

                {/*</SidebarFooter>*/}
                <SidebarRail/>
            </Sidebar>
        </>
    )
}
