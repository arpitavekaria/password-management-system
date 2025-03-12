"use client"
import {DataTable} from "@/components/common/DataTable";
import React, {useCallback, useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Forward, ListFilter, MoreHorizontal, Search} from "lucide-react";
import Loading from "@/components/common/Loader";
import {useRouter, useSearchParams} from "next/navigation";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table";
import {Input} from "@/components/ui/input";
import TooltipUi from "@/components/common/Tooltip";
import Confirmation from "@/components/common/Confirmation";
import {TableSkeleton} from "@/components/common/TableSkeleton";
import BreadCrumbUi from "@/components/common/BreadCrumb";

const fetchData = async (formData: any) => {
    const sort = formData.sort;
    const url = `https://flamesqa-api.get-flames.com/v1/api/backend/packages?limit=${formData.limit}&offset=${formData.offset}&search=${formData.search}&sort_attr=${formData.sort_attr}&sort=${sort.toUpperCase()}`; // Replace with your API endpoint
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTY3MDgwNmNiYTJmYjIzMGU4ZTE0NSIsInBob25lIjo5ODk4OTg5ODk4LCJpYXQiOjE3Mzc2MzEwOTMsImV4cCI6MTczODIzNTg5M30.rOzscYjIMItVRpWzuC8a8nZwjrd_XslQTCeMH_II8Xc"; // Replace with the actual access token

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`, // Pass the token in the Authorization header
                "Content-Type": "application/json", // Optional, specify if sending/receiving JSON
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

interface VisibilityState {
    [key: string]: boolean; // or whatever structure `VisibilityState` has
}

export const DataTableUi = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const getValidNumber = (value: string | null, defaultValue: number) => {
        const num = value && !isNaN(Number(value)) ? parseInt(value, 10) : defaultValue;
        return num;
    };

    const initialPage = getValidNumber(searchParams.get('page'), 0);
    const initialPageSize = getValidNumber(searchParams.get('pageSize'), 25);
    const initialSearch = searchParams.get('search') || '';
    const initialSortColumn = searchParams.get('sortColumn') || 'showOrder';
    const initialSortOrder = searchParams.get('sortOrder') || 'desc';

    const [pageSize, setPageSize] = useState<number>(initialPageSize);
    const [page, setPage] = useState<number>(initialPage);
    const [searchValue, setSearchValue] = useState<string>(initialSearch);
    const [sortColumn, setSortColumn] = useState<string>(initialSortColumn)
    const [sort, setSort] = useState<string>(initialSortOrder)
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [visibleColumns, setVisibleColumns] = useState<object>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    console.log("columnVisibility", columnVisibility)
    console.log("selectedRows", selectedRows)
    console.log("visibleColumns", visibleColumns)

    useEffect(() => {
        const formData = {
            limit: pageSize,
            offset: page * pageSize,
            search: searchValue,
            sort_attr: sortColumn,
            sort: sort,
        }
        const loadData = async () => {
            setLoading(true);
            const fetchedData = await fetchData(formData);
            if (fetchedData) {
                setLoading(false);
                setData(fetchedData.data);
                setTotalCount(fetchedData.totalCount);
            }
        };
        loadData(); // Call the async function
    }, [pageSize, page, sortColumn, sort]); // Empty dependency array ensures this runs only once

    const updateQueryParams = useCallback(() => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('pageSize', pageSize.toString());
        params.set('search', searchValue);
        params.set('sortColumn', sortColumn);
        params.set('sortOrder', sort);
        router.push(`?${params.toString()}`);
    }, [page, pageSize, searchValue, sortColumn, sort, router]);

    const handleSortChange = (column: string, direction: string) => {
        setSortColumn(column);
        setSort(direction);
        updateQueryParams();
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        updateQueryParams();
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        updateQueryParams();
    };

    const handleRowSelectionChange = (rows: Payment[]) => {
        setSelectedRows(rows);
    };

    const handleSearch = () => {
        const formData = {
            limit: pageSize,
            offset: page * pageSize,
            search: searchValue,
            sort_attr: sortColumn,
            sort: sort,
        }
        const loadData = async () => {
            setLoading(true);
            const fetchedData = await fetchData(formData);
            if (fetchedData) {
                setLoading(false);
                setData(fetchedData.data);
                setTotalCount(fetchedData.totalCount);
            }
        };
        loadData(); // Call the async function
        updateQueryParams();
    }

    const filterDataOnKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            handleSearch();
            updateQueryParams();
        }
    }

    const getVisibleColumns = (columns: Record<string, boolean>) => {
        setVisibleColumns(columns);
    };

    // Function to handle opening the dialog
    const handleConfirmationOpen = () => {
        setIsConfirmationOpen(true);
    };

    // Function to handle closing the dialog
    const handleConfirmationClose = () => {
        setIsConfirmationOpen(false);
    };

    type Payment = {
        id: string
        title: string
        no: number;
        _id: string;
    }

    const columns: ColumnDef<Payment, unknown>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    className='rounded-none'
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    className='rounded-none'
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "showOrder",
            header: "ID",
            id: "ID",
            enableSorting: true,  // Disable sorting for status
        },
        {
            accessorKey: "titleEn",
            header: "Title",
            id: "Title",
            enableSorting: true,  // Disable sorting for status
        },
        {
            header: "actions",
            id: "actions",
            enableSorting: false,  // Disable sorting for actions
            cell: ({row}) => {
                const id = row.original._id;
                return (
                    <>
                        {/*<DropdownMenu>*/}
                        {/*    <DropdownMenuTrigger asChild>*/}
                        {/*        <Button variant="ghost" className="h-8 w-8 p-0">*/}
                        {/*            <span className="sr-only">Open menu</span>*/}
                        {/*            <MoreHorizontal className="h-4 w-4"/>*/}
                        {/*        </Button>*/}
                        {/*    </DropdownMenuTrigger>*/}
                        {/*    <DropdownMenuContent align="end">*/}
                        {/*        <DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
                        {/*        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>*/}
                        {/*            Copy payment ID*/}
                        {/*        </DropdownMenuItem>*/}
                        {/*        /!*<DropdownMenuSeparator/>*!/*/}
                        {/*        <DropdownMenuItem>Edit</DropdownMenuItem>*/}
                        {/*        <DropdownMenuItem onClick={handleConfirmationOpen}>Delete</DropdownMenuItem>*/}
                        {/*    </DropdownMenuContent>*/}
                        {/*</DropdownMenu>*/}
                        <div className="flex flex-row gap-2">
                            <TooltipUi text="Edit">
                                <Button variant="outline" className='shadow-none' size="sm">Edit</Button>
                            </TooltipUi>
                            <TooltipUi text="Copy">
                                <Button variant="outline" className='shadow-none' size="sm">Copy</Button>
                            </TooltipUi>
                            <TooltipUi text="Delete">
                                <Button variant="outline" className='shadow-none' size="sm" onClick={handleConfirmationOpen}>Delete</Button>
                            </TooltipUi>
                        </div>
                    </>

                );
            },
        },
        {
            header: "multi actions",
            id: "multiActions",
            enableSorting: false,  // Disable sorting for actions
            cell: ({row}) => {
                const id = row.original._id;
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 shadow-none">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
                                    Copy payment ID
                                </DropdownMenuItem>
                                {/*<DropdownMenuSeparator/>*/}
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleConfirmationOpen}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>

                );
            },
        },
    ];

    // needed if only want to filter rows
    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <>
                <TableSkeleton />
            </>
        )
    }

    return (
        <>
            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <BreadCrumbUi mainMenu="Components" mainMenuLink="#"/>
                        <span className="font-semibold text-lg mb-0">Data Table</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Button variant="outline" className='shadow-none'><ListFilter/> Filter</Button>
                        <Button className="bg-[#5c67f7] shadow-none"><Forward/>Share</Button>
                    </div>
                </div>
            </div>
            <div className="col-span-12 mt-6">
                <Card className='rounded-sm border-0'>
                    <Loading loading={loading}/>
                    <CardHeader className="rounded-t-sm  border-b bg-[#fbfbfb] dark:bg-background p-3">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="relative w-full max-w-md md:max-w-lg">
                                <Input
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="w-full max-w-md md:max-w-lg bg-white dark:bg-background"
                                    onKeyDown={(e) => filterDataOnKeyDown(e)}
                                />
                                <div
                                    className="absolute top-1/2 transform -translate-y-1/2  ltr:right-4 rtl:left-4 text-gray-500">
                                    <Search onClick={handleSearch}/>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <TooltipUi text="ADD">
                                    <Button variant="outline" className='shadow-none' size="sm">ADD</Button>
                                </TooltipUi>
                                {/* Column visibility dropdown */}
                                <TooltipUi text="Column Filter">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="ml-auto shadow-none" size="sm">
                                                Columns
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {table
                                                .getAllColumns()
                                                // Filter only columns where enableHiding is true
                                                .filter((column) => column.columnDef.enableHiding !== false)
                                                .map((column) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(checked) => column.toggleVisibility(checked)}
                                                    >
                                                        {column.id}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TooltipUi>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <DataTable<Payment, unknown>
                            columns={columns}
                            data={data}
                            setPageSize={setPageSize}
                            onPageSizeChange={handlePageChange}
                            onPageChange={handlePageSizeChange}
                            pageSize={pageSize}
                            setPage={setPage}
                            page={page}
                            totalCount={totalCount}
                            onSortChange={handleSortChange}
                            onRowSelection={handleRowSelectionChange}
                            onVisibleColumns={getVisibleColumns}
                            columnVisibility={columnVisibility}
                            setColumnVisibility={setColumnVisibility}
                        />
                    </CardContent>
                </Card>
                <Confirmation
                    isOpen={isConfirmationOpen}
                    setIsOpen={setIsConfirmationOpen}
                    title="Are you sure?"
                    description="This action will delete your account."
                    saveButtonText="Confirm"
                    cancelButtonText="Cancel"
                    onSave={handleConfirmationClose}
                />
            </div>

            </>
            )
            }
