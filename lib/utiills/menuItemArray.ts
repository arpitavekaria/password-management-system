import {House, SquareTerminal} from "lucide-react";

export const MenuItemArray = [
    {
        menuTitle: "Main",
        title: "Dashboard",
        url: "#",
        icon: House , // Adding the Dashboard Icon
        // isActive: true,
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
            },
        ], // No sub-items
    },
    {
        menuTitle: "Pages",
        title: "Menu",
        url: "#",
        icon: SquareTerminal,
        // isActive: true,
        items: [
            {
                title: "Credentials Type",
                url: "/admin/credentials-type",
            },
            {
                title: "Client",
                url: "/admin/client",
            },
            {
                title: "Technology",
                url: "/admin/technology",
            },
            {
                title: "Project",
                url: "/admin/project",
            },
            {
                title: "Credentials",
                url: "/admin/credentials",
            },
            {
                title: "User",
                url: "/admin/user",
            },
        ],
    },
]