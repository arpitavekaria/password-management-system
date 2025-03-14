"use client"

import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";

const chartData = [
    {month: "January", desktop: 186, mobile: 80},
    {month: "February", desktop: 305, mobile: 200},
    {month: "March", desktop: 237, mobile: 120},
    {month: "April", desktop: 73, mobile: 190},
    {month: "May", desktop: 209, mobile: 130},
    {month: "June", desktop: 214, mobile: 140},
    {month: "July", desktop: 209, mobile: 130},
    {month: "August", desktop: 198, mobile: 135},
    {month: "September", desktop: 214, mobile: 140},
    {month: "October", desktop: 220, mobile: 150},
    {month: "November", desktop: 230, mobile: 160},
    {month: "December", desktop: 250, mobile: 170}
];


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#452c63",
    },
    mobile: {
        label: "Mobile",
        color: "#662d91",
    },
} satisfies ChartConfig

export const DemoChart = () => {
    return (
        <>
            <Card className='rounded-sm border-0'>
                <CardHeader className='rounded-t-sm  border-b bg-[#fbfbfb] dark:bg-background p-3'>
                    <CardTitle>Chart Demo</CardTitle>
                </CardHeader>
                <CardContent className='pt-3'>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent/>}/>
                            <ChartLegend content={<ChartLegendContent/>}/>
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}/>
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4}/>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    )
}
