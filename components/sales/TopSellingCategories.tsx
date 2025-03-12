import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {ChevronDown, Circle, EllipsisVertical, MoveUp, TrendingUp} from "lucide-react";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

const randomData = [
    {category: 'Clothing', amount: '31,245', gross: '25%', percent: '0.45%'},
    {category: 'Electronics', amount: '12,345', gross: '30%', percent: '1.23%'},
    {category: 'Toys', amount: '8,567', gross: '22%', percent: '0.75%'},
    {category: 'Furniture', amount: '5,678', gross: '20%', percent: '0.33%'},
    {category: 'Food', amount: '20,101', gross: '18%', percent: '2.45%'},
];


export const TopSellingCategories = () => {
    return (
        <Card className='rounded-sm border-0'>
            <CardHeader className="flex flex-row items-center justify-between border-0 bg-transparent p-3">
                <CardTitle className="text-lg font-medium">Top Selling Categories</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Sort By <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardHeader className="flex flex-row items-center justify-between border-0 bg-transparent p-3">
                <CardTitle className="text-xs font-light">Overall Sales</CardTitle>
                <div className="flex flex-row gap-2 items-center">
                    <CardTitle className="text-xs font-light text-[#2bd0a2]">Overall Sales
                        {/*<MoveUp className="!text-xs"/>*/}
                    </CardTitle>
                    <CardTitle className="text-md font-semibold text-black dark:text-white">1,25,785</CardTitle>
                </div>
            </CardHeader>
            <table className='w-full'>
                <tbody>
                {randomData.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell className={`font-medium`}>
                            <Circle/>
                        </TableCell>
                        <TableCell className="font-medium">
                            {row.category}
                        </TableCell>
                        <TableCell>
                            {row.amount}
                        </TableCell>
                        <TableCell>
                            {row.gross}
                        </TableCell>
                        <TableCell>
                            <span className={`rounded-md p-1`}>{row.percent}</span>
                        </TableCell>
                    </TableRow>
                ))}
                </tbody>
            </table>
        </Card>
    )
}
