'use client'

import {
  Column,
  ColumnDef,
  ColumnPinningPosition,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table'
import { cn, PlayerEntry } from '@/lib/utils'
import { DataTablePagination } from '@/components/ui/table/pagination'
import { DataTableColumnHeader } from '@/components/ui/table/sortable-header'
import React from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const getColumnStyles = (column: Column<any, any>): React.CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    minWidth: column.columnDef.size,
    maxWidth: column.columnDef.size,
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    enableColumnPinning: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnPinning: { left: ['rank', 'name'], right: ['total'] },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div className="mb-4 overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const style = getColumnStyles(header.column)
                  return (
                    <TableHead
                      key={header.id}
                      style={style}
                      className="bg-background"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const style = getColumnStyles(cell.column)
                    return (
                      <TableCell
                        key={cell.id}
                        style={style}
                        className="bg-background"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

export default function WeeklyTable(props: {
  data: PlayerEntry[]
  rounds: string[]
}) {
  const { data, rounds } = props

  const columns: ColumnDef<PlayerEntry>[] = [
    {
      accessorKey: 'rank',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      size: 35,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      minSize: 150,
    },
    ...rounds.map((round, index: number) => ({
      header: `Runde ${index + 1}`,
      size: 95,
      cell: ({ row }: { row: Row<PlayerEntry> }) => {
        const isRemoved =
          !row.original.displayItems[round].significant &&
          row.original.displayItems[round].points > 0
        return (
          <div
            className={cn(
              'flex items-center rounded-lg',
              isRemoved && 'italic text-gray-400',
            )}
          >
            {row.original.displayItems[round].points}
          </div>
        )
      },
    })),
    {
      accessorKey: 'total',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      size: 83,
    },
  ]
  return <DataTable data={data} columns={columns} />
}
