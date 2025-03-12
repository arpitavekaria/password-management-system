"use client"
import React, {Fragment} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import {Button} from "../../ui/button";
import {Badge, Bell, Moon, ShoppingCart, Sun, X} from "lucide-react";
import {useTheme} from "next-themes";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ScrollArea} from "@/components/ui/scroll-area";

const cartItems = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Wireless freedom with crystal-clear sound...",
        price: 78,
        quantity: 1,
        total: 75,
        image: "https://via.placeholder.com/50",
    },
    {
        id: 2,
        name: "Ladies Hand Bag",
        description: "Both fashion and functionality.",
        price: 15,
        quantity: 2,
        total: 30,
        image: "https://via.placeholder.com/50",
    },
    {
        id: 3,
        name: "Alarm Clock",
        description: "Add natural beauty to your space",
        price: 84,
        quantity: 1,
        total: 84,
        image: "https://via.placeholder.com/50",
    },
    {
        id: 4,
        name: "Kids' Party Wear Frock",
        description: "Crafted from soft, breathable fabric...",
        price: 37,
        quantity: 1,
        total: 37,
        image: "https://via.placeholder.com/50",
    },
];

const CartItems = () => {
    const {setTheme} = useTheme();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="px-2">
                        <div className="relative">
                            <ShoppingCart/>
                            {/*<span className="absolute -top-2 -right-2 bg-[#9e5cf7] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">*/}
                            {/*  5*/}
                            {/*</span>*/}
                            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel> <DropdownMenuItem>
                        Cart Items
                        <span className="text-white bg-[#9e5cf7] text-xs rounded-sm p-[0.275rem]">5</span>
                        <DropdownMenuShortcut><span>Sub Total:</span><span
                            className="text-gray-950 font-extrabold">$740</span></DropdownMenuShortcut>
                    </DropdownMenuItem></DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <ScrollArea className="h-[300px] w-[350px] p-4">
                        {cartItems.map((item,i) => (
                            <Fragment key={i}>
                                <DropdownMenuItem >
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between  py-3"
                                    >
                                        {/* Product Image */}
                                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg"/>

                                        {/* Product Details */}
                                        <div className="flex-1 px-3">
                                            <h2 className="font-semibold">{item.name}</h2>
                                            <p className="text-gray-500 text-sm">{item.description}</p>
                                            <p className="text-green-600 font-semibold text-sm">
                                                (Qty: {item.quantity}) <span className="text-black">${item.price}</span>
                                            </p>
                                        </div>

                                        {/* Total Price */}
                                        <div className="text-right">
                                            <p className="text-blue-500 font-semibold text-sm">Total: <span
                                                className="text-black">${item.total}</span></p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                            </Fragment>
                        ))}
                    </ScrollArea>
                    <DropdownMenuItem>
                        <Button variant="default" className="w-full" size="sm">View All</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CartItems;
