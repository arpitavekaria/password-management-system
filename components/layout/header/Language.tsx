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
import {Badge, Bell, Languages, Moon, ShoppingCart, Sun, X} from "lucide-react";
import {useTheme} from "next-themes";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ScrollArea} from "@/components/ui/scroll-area";

const languages = [
    { name: 'English', code: 'en', flag: 'https://countryflags.io/gb/flat/64.png' },
    { name: 'Spanish', code: 'es', flag: 'https://countryflags.io/es/flat/64.png' },
    { name: 'French', code: 'fr', flag: 'https://countryflags.io/fr/flat/64.png' },
    { name: 'German', code: 'de', flag: 'https://countryflags.io/de/flat/64.png' },
    { name: 'Italian', code: 'it', flag: 'https://countryflags.io/it/flat/64.png' },
];

const Language = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="px-2">
                        <div className="relative">
                            <Languages className="w-5 h-5"/>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {languages.map((lang,i) => (
                        <Fragment key={i}>
                            <DropdownMenuItem >
                                <div className="flex items-center">
                                    {/* Flag Image */}
                                    <img src={lang.flag} alt={lang.name} className="w-6 h-6 mr-2"/>
                                    {/* Language Name */}
                                    <span>{lang.name}</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                        </Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Language;
