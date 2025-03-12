"use client"
import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../../ui/dropdown-menu";
import {Button} from "../../ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

const ThemeToggle = () => {
    const {setTheme, theme} = useTheme()  // Extract theme from useTheme()

    return (
        <>
            {/*<DropdownMenu>*/}
            {/*    <DropdownMenuTrigger asChild>*/}
            {/*        <Button variant="outline" size="sm">*/}
            {/*            <Sun*/}
            {/*                className="!h-[0.875rem] !w-[0.875rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>*/}
            {/*            <Moon*/}
            {/*                className="absolute !h-[0.875rem] !w-[0.875rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>*/}
            {/*            <span className="sr-only">Toggle theme</span>*/}
            {/*        </Button>*/}
            {/*    </DropdownMenuTrigger>*/}
            {/*    <DropdownMenuContent align="start">*/}
            {/*        <DropdownMenuItem onClick={() => setTheme("light")}>*/}
            {/*            Light*/}
            {/*        </DropdownMenuItem>*/}
            {/*        <DropdownMenuItem onClick={() => setTheme("dark")}>*/}
            {/*            Dark*/}
            {/*        </DropdownMenuItem>*/}
            {/*        <DropdownMenuItem onClick={() => setTheme("system")}>*/}
            {/*            System*/}
            {/*        </DropdownMenuItem>*/}
            {/*    </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}

            {theme === "light" ? (
                <Button variant="outline" size="sm" className="px-2" onClick={() => setTheme("dark")}>
                    <Moon className="text-sky-300" />
                </Button>
            ) : (
                <Button variant="outline" size="sm" className="px-2" onClick={() => setTheme("light")}>
                    <Sun className="text-yellow-500" />
                </Button>
            )}
        </>
    );
};

export default ThemeToggle;
