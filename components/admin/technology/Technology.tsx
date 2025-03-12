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
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import AddTechnology from "@/components/admin/technology/AddTechnology";
import {deleteTechnology, getTechnologies} from "@/server/technology";
import {ApiResponseType} from "@/lib/utiills/enums/ApiResponseType";
import {toast} from "sonner";
import EditTechnology from "@/components/admin/technology/EditTechnology";
import {useCommonStore} from "@/components/store/common";

interface VisibilityState {
    [key: string]: boolean;
}

const Technology = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const isLoading = useCommonStore((state: any) => state.isLoading);

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
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditOpenModal, setIsEditOpenModal] = useState(false);
    const [dataId, setDataId] = useState('');

    useEffect(() => {
        loadData();
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
        console.log(column,direction)
        setSortColumn(column);
        setSort(direction);
        updateQueryParams();
    };

    const handleRowSelectionChange = (rows: Technology[]) => {
        setSelectedRows(rows);
    };

    const loadData = async () => {
        const formData = {
            limit: pageSize,
            search: searchValue,
            sort_attr: sortColumn,
            sort: sort,
        }

        setLoading(true);
        const fetchedData = await getTechnologies(formData);
        if (fetchedData) {
            setLoading(false);
            setData(fetchedData.data);
            setTotalCount(fetchedData.total);
        }
    };

    const handleSearch = () => {
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

    const handleConfirmationOpen = (id: any) => {
        setDataId(id);
        setIsConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        handleDelete()
    };

    const handleDelete = async () => {
        const fetchedData = await deleteTechnology(dataId);

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

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openEditModal = (id: any) => {
        setDataId(id)
        setIsEditOpenModal(true);
    };

    const closeEditModal = () => {
        setIsEditOpenModal(false);
    };

    type Technology = {
        id: string
        name: string
    }

    const columns: ColumnDef<Technology, unknown>[] = [
        {
            accessorKey: "id",
            header: "ID",
            id: "id",
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: "Name",
            id: "name",
            enableSorting: true,
        },
        {
            header: "Actions",
            id: "actions",
            enableSorting: false,
            cell: ({row}) => {
                const id = row.original.id;
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
                                <DropdownMenuItem onClick={() => openEditModal(id)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleConfirmationOpen(id)}>Delete</DropdownMenuItem>
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
            <Loading loading={isLoading} />
            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <BreadCrumbUi mainMenu="Menu" mainMenuLink="#"/>
                        <span className="font-semibold text-lg mb-0">Technology</span>
                    </div>
                </div>
            </div>
            <div className="col-span-12 mt-6">
                <Card className='rounded-sm border-0'>
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
                                    <Button variant="outline" className='shadow-none' size="sm"
                                            onClick={openModal}>ADD</Button>
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
                        <DataTable<Technology, unknown>
                            columns={columns}
                            data={data}
                            setPageSize={setPageSize}
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

                <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                    <DialogContent className="xl:max-w-3xl sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Add Technology</DialogTitle>
                        </DialogHeader>
                        <AddTechnology closeModal={closeModal} loadData={loadData}/>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditOpenModal} onOpenChange={setIsEditOpenModal}>
                    <DialogContent className="xl:max-w-3xl sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Edit Technology</DialogTitle>
                        </DialogHeader>
                        <EditTechnology closeModal={closeEditModal} loadData={loadData} dataId={dataId}/>
                    </DialogContent>
                </Dialog>
            </div>

        </>
    )
}

export default Technology