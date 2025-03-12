import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

export function TableSkeleton() {
    return (
        <>
            <Card className='rounded-sm border-0'>
                <CardHeader  className="rounded-t-sm  border-b bg-[#fbfbfb] dark:bg-background p-3">
                    {/* Search Input Skeleton */}
                    <div className="flex flex-row justify-between">
                    <div className="relative w-full max-w-md md:max-w-lg">
                        <Skeleton className="h-10 w-full"/>
                        <div className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500">
                            <Skeleton className="h-4 w-4"/>
                        </div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-16"/> {/* Add Button */}
                        <Skeleton className="h-8 w-24"/> {/* Column Filter Button */}
                    </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="border-b">
                            <th className="p-3 text-left text-sm font-semibold">
                                <Skeleton className="h-4 w-24"/>
                            </th>
                            <th className="p-3 text-left text-sm font-semibold">
                                <Skeleton className="h-4 w-32"/>
                            </th>
                            <th className="p-3 text-left text-sm font-semibold">
                                <Skeleton className="h-4 w-20"/>
                            </th>
                            <th className="p-3 text-left text-sm font-semibold">
                                <Skeleton className="h-4 w-16"/> {/* "View" Column */}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from({length: 25}).map((_, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3">
                                    <Skeleton className="h-4 w-24"/>
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-32"/>
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-20"/>
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-16"/> {/* "View" Column */}
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-20"/>
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-16"/> {/* "View" Column */}
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-20"/>
                                </td>
                                <td className="p-3">
                                    <Skeleton className="h-4 w-16"/> {/* "View" Column */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </>
    );
}
