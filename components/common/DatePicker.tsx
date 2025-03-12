"use client"

import * as React from "react"
import {CalendarIcon} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {format} from "date-fns"
import {DateRange} from "react-day-picker";

interface DatePickerProps {
    onDateChange?: (date: Date | undefined) => void;
    selectedDate?: Date | undefined,
    placeHolder?: string
}

interface DatePickerWithRangeProps {
    onDateChange: (dateRange: DateRange | undefined) => void; // Updated to accept DateRange
    selectedDate: DateRange | undefined; // Updated to accept DateRange
    placeHolder?: string;
    className?: string;
}

export const SelectDate = (props: DatePickerProps) => {
    const {onDateChange, selectedDate, placeHolder} = props;

    const handleDateChange = (date: Date | undefined) => {
        if (onDateChange) {
            onDateChange(date);
        }
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal shadow-none",
                        !selectedDate && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon/>
                    {selectedDate ? format(selectedDate, "PPP") : <span>{placeHolder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}


export const DatePickerWithRange = ({onDateChange, selectedDate, placeHolder, className}: DatePickerWithRangeProps) => {

    const handleDateChange = (dateRange: DateRange | undefined) => {
        if (onDateChange) {
            onDateChange(dateRange); // Pass the DateRange object to the parent
        }
    };


    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon/>
                        {selectedDate?.from ? (
                            selectedDate.to ? (
                                <>
                                    {format(selectedDate.from, "LLL dd, y")} -{" "}
                                    {format(selectedDate.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(selectedDate.from, "LLL dd, y")
                            )
                        ) : (
                            <span>{placeHolder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={selectedDate?.from}
                        selected={selectedDate}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}