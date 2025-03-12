import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {DemoChart} from "@/components/dashboard/DemoChart";

const DashboardUi = () => {
    return (
        <>
            <div className="col-span-12">
                <div className="grid grid-cols-4 gap-y-4 gap-x-4 sm:grid-cols-12">
                    <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                        <Card className=" overflow-hidden rounded-sm border-0">
                            <CardContent className='pt-3'>
                                <div className="flex items-top justify-between">
                                    <div>
                                  <span
                                      className="!text-[0.8rem]  !w-[3.625rem] !h-[3.625rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-[#3D3D3D]">
                                    <i className="bx bx-user text-[2rem] text-white"></i>
                                  </span>
                                    </div>
                                    <div className="flex-grow ms-4">
                                        <div className="flex items-center justify-between flex-wrap">
                                            <div>
                                                <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                                    Total Customers
                                                </p>
                                                <div className="flex flex-row">
                                                    <h4 className="font-semibold  text-[1.625rem] !mb-2 ">789778</h4>
                                                </div>
                                            </div>
                                            <div id="crm-total-customers">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between !mt-6">
                                    <div>
                                        <Link className="text-[#F50057] text-[0.875rem] underline"
                                              href="#">View All</Link>
                                    </div>
                                    <div className="text-end">
                                        <p className="text-success opacity-[0.7] text-[0.875rem]"><i
                                            className="bx bx-trending-up"/>545 new todays
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                        <Card className="overflow-hidden rounded-sm border-0">
                            <CardContent className='pt-3'>
                                <div className="flex items-top justify-between">
                                    <div>
                                  <span
                                      className="!text-[0.8rem]  !w-[3.625rem] !h-[3.625rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-[#3D3D3D]">
                               <i className="bx bx-user text-[2rem] text-white"></i>
                                  </span>
                                    </div>
                                    <div className="flex-grow ms-4">
                                        <div className="flex items-center justify-between flex-wrap">
                                            <div>
                                                <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                                    Total Customers
                                                </p>
                                                <div className="flex flex-row">
                                                    <h4 className="font-semibold  text-[1.625rem] !mb-2 ">789778</h4>
                                                </div>
                                            </div>
                                            <div id="crm-total-customers">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between !mt-6">
                                    <div>
                                        <Link className="text-[#F50057] text-[0.875rem] underline"
                                              href="#">View All</Link>
                                    </div>
                                    <div className="text-end">
                                        <p className="text-success opacity-[0.7] text-[0.875rem]"><i
                                            className="bx bx-trending-up"/>545 new todays
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
                        <Card className="overflow-hidden rounded-sm border-0">
                            <CardContent className='pt-3'>
                                <div className="flex items-top justify-between">
                                    <div>
                                  <span
                                      className="!text-[0.8rem]  !w-[3.625rem] !h-[3.625rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center bg-[#3D3D3D]">
                                    <i className="bx bx-user text-[2rem] text-white"></i>
                                  </span>
                                    </div>
                                    <div className="flex-grow ms-4">
                                        <div className="flex items-center justify-between flex-wrap">
                                            <div>
                                                <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                                                    Total Customers
                                                </p>
                                                <div className="flex flex-row">
                                                    <h4 className="font-semibold  text-[1.625rem] !mb-2 ">789778</h4>
                                                </div>
                                            </div>
                                            <div id="crm-total-customers">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between !mt-6">
                                    <div>
                                        <Link className="text-[#F50057] text-[0.875rem] underline"
                                              href="#">View All</Link>
                                    </div>
                                    <div className="text-end">
                                        <p className="text-success opacity-[0.7] text-[0.875rem]"><i
                                            className="bx bx-trending-up"/>545 new todays
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-y-4 gap-x-4 sm:grid-cols-12 mt-4">
                    <div className="xl:col-span-12 col-span-12">
                        <DemoChart/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardUi;