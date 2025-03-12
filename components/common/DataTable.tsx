"use client";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {ArrowUpDown} from "lucide-react";
import {SortStateLabel} from "@/lib/utiills/enums/sortingEnum";

interface VisibilityState {
    [key: string]: boolean; // or whatever structure `VisibilityState` has
}

// Define the function type that you are passing as `setColumnVisibility`
type OnChangeFn<T> = (state: T | ((prevState: T) => T)) => void;

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setPageSize?: (size: number) => void;
    onPageSizeChange?: (size: number) => void;
    onPageChange?: (page: number) => void;
    pageSize?: number;
    setPage?: (page: number | ((prev: number) => number)) => void;
    page?: number;
    totalCount?: number;
    onSortChange?: (column: string, direction: string) => void;
    searchValue?: string;
    onRowSelection?: (rows: TData[]) => void; // Replaced `any[]` with `TData[]`
    onVisibleColumns?: (columns: Record<string, boolean>) => void;
    columnVisibility?: { [key: string]: boolean }; // Object mapping column keys to visibility status (true/false)
    setColumnVisibility: (state: { [key: string]: boolean } | ((prevState: { [key: string]: boolean }) => {
        [key: string]: boolean
    })) => void; // Setter for column visibility state, can either be a new state or a function
}

export const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
    const {
        columns,
        data,
        onPageChange,
        onPageSizeChange,
        onSortChange,
        totalCount = 0,
        page = 0,
        pageSize = 10,
        setPage,
        setPageSize,
        searchValue,
        onRowSelection,
        onVisibleColumns,
        setColumnVisibility,
        columnVisibility,
    } = props;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        onSortingChange: setSorting,
        onColumnVisibilityChange: (state: VisibilityState | ((prevState: VisibilityState) => VisibilityState)) => {
            setColumnVisibility(state);
        },
        onRowSelectionChange: setRowSelection,
        pageCount: totalCount,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    });

    useEffect(() => {
        const selectedRowsData = table
            .getSelectedRowModel()
            .rows.map((row) => row.original);
        onRowSelection?.(selectedRowsData);
    }, [rowSelection, table]); // Added `table` as a dependency

    useEffect(() => {
        if (sorting.length > 0) {
            const sortStateValue = sorting[0].desc === false ? SortStateLabel.ASC : SortStateLabel.DESC;
            const sortStateId = sorting[0].id;
            onSortChange?.(sortStateId, sortStateValue);
        }
    }, [sorting]);

    useEffect(() => {
        if (columnVisibility) {
            onVisibleColumns?.(columnVisibility as Record<string, boolean>);
        }
    }, [columnVisibility]);

    const dataStart = page * pageSize + 1;
    const dataEnd = Math.min(dataStart + pageSize - 1, totalCount);

    return (
        <>
            <div className="w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : header.column.columnDef.enableSorting ? (
                                            <Button
                                                variant="ghost"
                                                onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}
                                                className="text-left px-0"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <ArrowUpDown className="ml-2 h-4 w-4"/>
                                            </Button>
                                        ) : (
                                            flexRender(header.column.columnDef.header, header.getContext())
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-left">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {data.length > 0 && (
                    <div className="flex items-center justify-between space-x-2  p-3">
                        <div>
                            <strong>
                                Showing {dataStart} to {dataEnd} of {totalCount} results
                            </strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage?.((prev: any) => Math.max(prev - 1, 0))}
                                disabled={page === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage?.((prev: any) => prev + 1)}
                                disabled={page >= Math.ceil(totalCount / pageSize) - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
