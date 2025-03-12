"use client"
import {ChevronDown, TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const chartData = [
    {month: "January", desktop: 186},
    {month: "February", desktop: 305},
    {month: "March", desktop: 237},
    {month: "April", desktop: 73},
    {month: "May", desktop: 209},
    {month: "June", desktop: 214},
    {month: "July", desktop: 210},
    {month: "September", desktop: 204},
    {month: "October", desktop: 24},
    {month: "November", desktop: 14},
    {month: "December", desktop: 21},
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#5f6bf7",
    },
} satisfies ChartConfig

export const SalesOverViewChart = () => {
    return (
        <Card className='rounded-sm border-0'>
            <CardHeader className="rounded-t-sm  border-b bg-[#fbfbfb] dark:bg-background p-3 border-0 bg-transparent ">
                <div className="flex flex-row items-center justify-between">
                    <span className="relative mb-0 text-[0.95rem] font-medium">Sales Overview</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Sort By <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="box-content pt-3">
                <ChartContainer config={chartConfig} className="w-full min-h-[350px]">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot"/>}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="desktop" fill="#5f6bf7" radius={6}  barSize={8} />
                        {/*<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4}/>*/}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col items-start gap-2 text-sm">*/}
            {/*    <div className="flex gap-2 font-medium leading-none">*/}
            {/*        Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>*/}
            {/*    </div>*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}
        </Card>
    )
}
