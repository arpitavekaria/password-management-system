"use client"
import React from 'react';
import BreadCrumbUi from "@/components/common/BreadCrumb";
import {Button} from "@/components/ui/button";
import {Forward, ListFilter} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {SalesOverViewChart} from "@/components/sales/SalesOverViewChart";
import {OrderStaticsChart} from "@/components/sales/OrderStaticsChart";
import {TopSellingCategories} from "@/components/sales/TopSellingCategories";

const Sales = () => {
    return (
        <>
            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <BreadCrumbUi mainMenu="Components" mainMenuLink="#"/>
                        <span className="font-semibold text-lg mb-0">Dashboard</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Button variant="outline" className='shadow-none'><ListFilter/> Filter</Button>
                        <Button className="bg-[#5c67f7] shadow-none" ><Forward/>Share</Button>
                    </div>
                </div>
            </div>
            <div className="col-span-12 mt-6">
                <div className="grid grid-cols-12 gap-y-4 gap-x-4 sm:grid-cols-12">
                    <div className="xxl:col-span-8 xl:col-span-8 col-span-12">
                        <div className="grid grid-cols-12 gap-y-4 gap-x-4 sm:grid-cols-12">
                            <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                                <Card className="overflow-hidden rounded-sm border-0">
                                    <CardContent className='pt-3'>
                                        <div className="flex items-start justify-between mb-2">
                                            <div><span className="text-textmuted dark:text-textmuted/50 block mb-1">Total Products</span>
                                                <h4 className="font-medium mb-0">854</h4></div>
                                            <span
                                                className="!text-[0.8rem] !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center text-white bg-[#5c67f7]">
                                                        <i className="bx bx-cart text-[1.25rem]"></i>
                                        </span>
                                        </div>
                                        <div className="text-textmuted dark:text-textmuted/50 text-[13px]">Increased
                                            By <span className="text-success">2.56%<i
                                                className="bx bx-up-arrow-alt text-[16px]"></i></span></div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                                <Card className="overflow-hidden rounded-sm border-0">
                                    <CardContent className='pt-3'>
                                        <div className="flex items-start justify-between mb-2">
                                            <div><span className="text-textmuted dark:text-textmuted/50 block mb-1">Total Users</span>
                                                <h4 className="font-medium mb-0">31,876</h4></div>
                                            <span
                                                className="!text-[0.8rem] !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center text-white bg-[#e354d4]">
                                                        <i className="bx bx-user text-[1.25rem]"></i>
                                        </span>
                                        </div>
                                        <div className="text-textmuted dark:text-textmuted/50 text-[13px]">Increased
                                            By <span className="text-success">2.56%<i
                                                className="bx bx-up-arrow-alt text-[16px]"></i></span></div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                                <Card className="overflow-hidden rounded-sm border-0">
                                    <CardContent className='pt-3'>
                                        <div className="flex items-start justify-between mb-2">
                                            <div><span className="text-textmuted dark:text-textmuted/50 block mb-1">Total Revenue</span>
                                                <h4 className="font-medium mb-0">$34,241</h4></div>
                                            <span
                                                className="!text-[0.8rem] !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center text-white bg-[#ff5d9f]">
                                                        <i className="bx bx-dollar text-[1.25rem]"></i>
                                        </span>
                                        </div>
                                        <div className="text-textmuted dark:text-textmuted/50 text-[13px]">Increased
                                            By <span className="text-success">2.56%<i
                                                className="bx bx-up-arrow-alt text-[16px]"></i></span></div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                                <Card className="overflow-hidden rounded-sm border-0">
                                    <CardContent className='pt-3'>
                                        <div className="flex items-start justify-between mb-2">
                                            <div><span className="text-textmuted dark:text-textmuted/50 block mb-1">Total Sales</span>
                                                <h4 className="font-medium mb-0">1,76,586</h4></div>
                                            <span
                                                className="!text-[0.8rem] !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center text-white bg-[#ff8e6f]">
                                                        <i className="bx bx-bar-chart text-[1.25rem]"></i>
                                        </span>
                                        </div>
                                        <div className="text-textmuted dark:text-textmuted/50 text-[13px]">Increased
                                            By <span className="text-success">2.56%<i
                                                className="bx bx-up-arrow-alt text-[16px]"></i></span></div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="xxl:col-span-8 xl:col-span-6 col-span-12">
                                <SalesOverViewChart/>
                            </div>
                            <div className="xxl:col-span-8 xl:col-span-6 col-span-12">
                                <OrderStaticsChart/>
                            </div>
                        </div>
                    </div>
                    <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                        <div className="grid grid-cols-12 gap-x-4 gap-y-4">
                            <div
                                className="xl:col-span-12 col-span-12 bg-gradient-to-r from-[#f595ba] from-10 to-[#937ae9] to-90 rounded-xl p-6">
                                <div className="grid grid-cols-12 justify-between">
                                    <div
                                        className="xxl:col-span-7 xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 col-span-12">
                                        <h4 className="mb-4 font-medium text-white">Upgrade to get more</h4> <p
                                        className="mb-6 text-white">Maximize sales insights. Optimize performance.
                                        Achieve success with pro.</p><a href="#"
                                                                        className="font-medium text-white decoration-solid underline">Upgrade
                                        To Pro<i className="ti ti-arrow-narrow-right"></i></a></div>
                                    <div
                                        className="xxl:col-span-4 xl:col-span-7 lg:col-span-7 md:col-span-7 sm:col-span-7 sm:block hidden text-end my-auto col-span-12">
                                        <img src="/assets/images/sales-card.png" alt="" className="img-fluid"/>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <TopSellingCategories/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sales;