'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { PlayerEntry } from '@/lib/utils'
import { Button } from '@/components/Button'
import { DataTablePagination } from '@/components/ui/table/pagination'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    enableColumnPinning: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnPinning: { left: ['rank', 'name'], right: ['total'] },
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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
      header: '',
      size: 35,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 150,
    },
    ...rounds.map((round, index: number) => ({
      accessorKey: `displayItems.${round}.points`,
      header: `Runde ${index + 1}`,
      size: 100,
      Cell: ({ renderedCellValue, row }: any) => {
        const isRemoved =
          !row.original[round].significant && row.original[round].points > 0
        const removedStyle = isRemoved && 'text-gray-400 italic'
        return (
          <div className={`flex items-center ${removedStyle} rounded-lg`}>
            {renderedCellValue}
          </div>
        )
      },
    })),
    {
      accessorKey: 'total',
      header: 'Total',
      size: 80,
    },
  ]
  return <DataTable data={data} columns={columns} />
}
