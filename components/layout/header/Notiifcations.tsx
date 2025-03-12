"use client"
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import {Button} from "../../ui/button";
import {Badge, Bell, Moon, Sun, X} from "lucide-react";
import {useTheme} from "next-themes";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const notifications = [
    {
        id: 1,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        title: "Follow Request",
        message: "Kelin Brown has sent you the request.",
        time: "1 Day ago",
    },
    {
        id: 2,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        title: "Exclusive Offers",
        message: "Enjoy <span className='text-green-500'>20% off</span> on your next purchase!",
        time: "5 hours ago",
    },
];
const Notifications = () => {
    const {setTheme} = useTheme();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="px-2">
                        <div className="relative">
                            <Bell/>
                            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel> <DropdownMenuItem>
                        Notifications
                        <DropdownMenuShortcut><span
                            className="text-white bg-[#9e5cf7] rounded-sm p-[0.175rem]">5 Unread</span></DropdownMenuShortcut>
                    </DropdownMenuItem></DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {notifications.map((notif) => (
                        <DropdownMenuItem  key={notif.id}>
                            <div key={notif.id}
                                 className="flex gap-3 items-start p-2 rounded-lg relative">
                                <Avatar>
                                    <AvatarImage src={notif.avatar}/>
                                    <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{notif.title}</p>
                                    <p className="text-gray-500 text-xs"
                                       dangerouslySetInnerHTML={{__html: notif.message}}/>
                                    <span className="text-gray-400 text-xs">{notif.time}</span>
                                </div>
                                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                                    <X size={14}/>
                                </button>
                            </div>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem>
                        <Button variant="default" className="w-full" size="sm">View All</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Notifications;
