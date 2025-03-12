"use client"
import {DataTable} from "@/components/common/DataTable";
import React, {useCallback, useEffect, useState} from "react";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Search} from "lucide-react";
import Loading from "@/components/common/Loader";
import {useRouter, useSearchParams} from "next/navigation";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table";
import {Input} from "@/components/ui/input";
import TooltipUi from "@/components/common/Tooltip";
import Confirmation from "@/components/common/Confirmation";
import {TableSkeleton} from "@/components/common/TableSkeleton";
import BreadCrumbUi from "@/components/common/BreadCrumb";
import Link from "next/link";
import {deleteUser, getUsers, userChangeStatus} from "@/server/user";
import Image from "next/image";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import {toast} from "sonner";
import {Badge} from "@/components/ui/badge";
import {UserStatusEnums} from "@/lib/utiills/enums/UserStatusEnums";

interface VisibilityState {
    [key: string]: boolean;
}


const User = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const getValidNumber = (value: string | null, defaultValue: number) => {
        const num = value && !isNaN(Number(value)) ? parseInt(value, 10) : defaultValue;
        return num;
    };

    const initialPage = getValidNumber(searchParams.get('page'), 0);
    const initialPageSize = getValidNumber(searchParams.get('pageSize'), 25);
    const initialSearch = searchParams.get('search') || '';
    const initialSortColumn = searchParams.get('sortColumn') || 'id';
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
    const [isConfirmationStatusOpen, setIsConfirmationStatusOpen] = useState(false);
    const [dataId, setDataId] = useState('');
    const [statusToChange, setStatusToChange] = useState('');

    useEffect(() => {
        loadData(); // Call the async function
    }, [pageSize, page, sortColumn, sort]);

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

    const handleRowSelectionChange = (rows: User[]) => {
        setSelectedRows(rows);
    };

    const handleSearch = () => {
        loadData(); // Call the async function
        updateQueryParams();
    }

    const loadData = async () => {
        const formData = {
            limit: pageSize,
            offset: page * pageSize,
            search: searchValue,
            sort_attr: sortColumn,
            sort: sort,
        }

        setLoading(true);
        const fetchedData = await getUsers(formData);
        if (fetchedData) {
            console.log(fetchedData)

            setLoading(false);
            setData(fetchedData.data);
            setTotalCount(fetchedData.total);
        }
    };

    const filterDataOnKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            handleSearch();
            updateQueryParams();
        }
    }

    const getVisibleColumns = (columns: Record<string, boolean>) => {
        setVisibleColumns(columns);
    };

    const handleConfirmationOpen = (id: any) => {
        setDataId(id);
        setIsConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        handleDelete()
    };

    const handleDelete = async () => {
        const fetchedData = await deleteUser(dataId);

        if (fetchedData) {
            if (fetchedData?.status === ApiResponseType.SUCCESS) {
                toast.success(fetchedData?.data?.message);
                setIsConfirmationOpen(false);
                loadData();
            } else {
                if (Array.isArray(fetchedData?.error) && fetchedData.error.length > 0) {
                    toast.error(fetchedData.error[0]);
                } else if (typeof fetchedData?.error === 'string') {
                    toast.error(fetchedData.error);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    }

    const handleConfirmationStatusOpen = (id: any, status: any) => {
        const flag = status === UserStatusEnums.ACTIVE ? UserStatusEnums.INACTIVE : UserStatusEnums.ACTIVE;

        setDataId(id);
        setStatusToChange(flag)

        setIsConfirmationStatusOpen(true);
    };

    const handleConfirmationStatusClose = () => {
        handleStatusChange()
    };

    const handleStatusChange = async () => {
        const data = {
            id: dataId,
            data: {
                status: statusToChange
            },
        }

        const fetchedData = await userChangeStatus(data);

        if (fetchedData) {
            console.log(fetchedData);
            if (fetchedData?.status === ApiResponseType.SUCCESS) {
                toast.success(fetchedData?.data?.message);
                setIsConfirmationStatusOpen(false);
                loadData();
            } else {
                if (Array.isArray(fetchedData?.error) && fetchedData.error.length > 0) {
                    toast.error(fetchedData.error[0]);
                } else if (typeof fetchedData?.error === 'string') {
                    toast.error(fetchedData.error);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    }

    type User = {
        id: string
        name: string
        email: string
        image: string
        status: string
    }

    const getBadgeColorForStatus = (status: UserStatusEnums) => {
        const colors: any = {
            [UserStatusEnums.ACTIVE]: "default",
            [UserStatusEnums.INACTIVE]: "destructive",
        };

        return colors[status] || "";
    };

    const getBadgeLabelForStatus = (status: UserStatusEnums) => {
        const labels: any = {
            [UserStatusEnums.ACTIVE]: "Active",
            [UserStatusEnums.INACTIVE]: "Inactive",
        };

        return labels[status] || "";
    };

    const columns: ColumnDef<User, unknown>[] = [
        {
            accessorKey: "id",
            header: "ID",
            id: "id",
            enableSorting: true,
        },
        {
            accessorKey: "image",
            header: "Image",
            id: "image",
            enableSorting: false,
            cell: ({row}) => (
                <div className="relative w-16 h-16 md:w-16 md:h-216 lg:w-20 lg:h-20">
                    <Image
                        src={row.original?.image}
                        alt={row.original.name || "Image"}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
            ),
            enableHiding: true,
        },
        {
            accessorKey: "name",
            header: "Name",
            id: "name",
            enableSorting: true,
        },
        {
            accessorKey: "email",
            header: "Email",
            id: "email",
            enableSorting: true,
        },
        {
            accessorKey: "status",
            header: "Status",
            id: "status",
            enableSorting: false,
            cell: ({row}) => {
                const id = row.original.id;
                const status = row.original.status as UserStatusEnums;

                return (
                    <Badge variant={getBadgeColorForStatus(status)} onClick={() => handleConfirmationStatusOpen(id, status)}>
                        {getBadgeLabelForStatus(status)}
                    </Badge>
                );
            },
            enableHiding: true,
        },
        {
            header: "Actions",
            id: "actions",
            enableSorting: false,
            cell: ({row}) => {
                const id = row.original.id;
                const status = row.original.status;
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                {/*<DropdownMenuSeparator/>*/}
                                <Link href={`/admin/user/edit/${id}`}> <DropdownMenuItem>Edit</DropdownMenuItem></Link>
                                <DropdownMenuItem onClick={() => handleConfirmationOpen(id)}>Delete</DropdownMenuItem>

                                {/*<DropdownMenuItem*/}
                                {/*    onClick={() => handleConfirmationStatusOpen(id, status)}>Change Status</DropdownMenuItem>*/}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>

                );
            },
        },
    ];

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
                <TableSkeleton/>
            </>
        )
    }

    return (
        <>
            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <BreadCrumbUi mainMenu="Menu" mainMenuLink="#"/>
                        <span className="font-semibold text-lg mb-0">User</span>
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
                                    <span>
                                   <Link href='/admin/user/create'>
                                       <Button variant="outline" className='shadow-none' size="sm">ADD</Button>
                                   </Link>
                                    </span>
                                </TooltipUi>
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
                        <DataTable<User, unknown>
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
                    description="This action will delete this user."
                    saveButtonText="Confirm"
                    cancelButtonText="Cancel"
                    onSave={handleConfirmationClose}
                />

                <Confirmation
                    isOpen={isConfirmationStatusOpen}
                    setIsOpen={setIsConfirmationStatusOpen}
                    title="Are you sure?"
                    description="This action will change status of this user."
                    saveButtonText="Confirm"
                    cancelButtonText="Cancel"
                    onSave={handleConfirmationStatusClose}
                />
            </div>

        </>
    )
}

export default User