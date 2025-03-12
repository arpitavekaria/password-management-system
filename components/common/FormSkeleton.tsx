import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";  // Import your Skeleton component

export function FormSkeleton() {
    return (
        <div className="col-span-12">
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-4 w-32 mb-2"/></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-6 gap-y-4 gap-x-4 sm:grid-cols-12">
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <Skeleton className="h-4 w-full mb-2"/>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {/* Label Skeleton */}
                                    <Skeleton className="h-4 w-20"/>
                                </div>
                                <div className="flex items-center gap-4">
                                    {/* Radio Button Skeletons */}
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full"/>
                                        <Skeleton className="h-4 w-16"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full"/>
                                        <Skeleton className="h-4 w-16"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-6 sm:grid-cols-12">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    {/* Label Skeleton */}
                                    <Skeleton className="h-4 w-20"/>
                                </div>
                                <div className="flex items-center gap-4">
                                    {/* Checkbox Skeletons */}
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded"/>
                                        <Skeleton className="h-4 w-16"/>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded"/>
                                        <Skeleton className="h-4 w-16"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex items-start gap-4 mt-6">
                <div className="w-full sm:w-auto">
                    <Skeleton className="h-10 w-full sm:w-32"/>
                </div>
            </div>

        </div>
    );
}
