"use client"

import {ChevronDown, EllipsisVertical, TrendingUp} from "lucide-react"
import {Label, Pie, PieChart} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
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
import {Button} from "@/components/ui/button";
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "#5c67f7",
    },
    safari: {
        label: "Safari",
        color: "#e354d4",
    },
    firefox: {
        label: "Firefox",
        color: "#ff5d9f",
    },
    edge: {
        label: "Edge",
        color: "#ff8e6f",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export const OrderStaticsChart=()=> {
    return (
        <Card className="flex flex-col rounded-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between border-0 bg-transparent p-3 ">
                <CardTitle className="text-lg font-medium">Order Statistics</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <EllipsisVertical className="h-5 w-5 text-gray-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="pt-3">
                <div className="flex items-center justify-between">
                    <div className="flex flex-row items-center gap-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">TOTAL ORDERS</p>
                            <p className="text-2xl font-semibold">3,736 <span
                                className="text-green-500 text-xs font-medium">▲ 0.57%</span></p>
                        </div>
                    </div>
                    <div className="text-green-500 text-sm font-medium">Earnings?</div>
                </div>
            </CardContent>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[200px]"
                >
                    <PieChart width={200} height={200}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="100%"
                        >
                            {/* Label for Center Text */}
                            <Label
                                value="Total Orders"
                                position="center"
                                dy={-10} // Adjust vertical position
                                style={{ fontSize: "12px", fill: "#666" }}
                            />
                            <Label
                                value="3,736" // Dynamic total value
                                position="center"
                                dy={10} // Adjust vertical position
                                style={{ fontSize: "16px", fontWeight: "bold", fill: "#333" }}
                            />
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />}  className="mt-2"/>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <Button variant="outline" className="border-[#737cf8] text-[#737cf8]">Complete Statics</Button>
            </CardFooter>
        </Card>
    )
}
