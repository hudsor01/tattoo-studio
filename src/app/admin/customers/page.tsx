'use client'

import { useState, useRef, type ComponentType, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  type CellContext,
  type HeaderContext,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowUpDown,
  Download,
  Mail,
  MoreHorizontal,
  Plus,
  Filter,
  Table as TableIcon,
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

// Define customer type
export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  dateAdded: Date
  lastBooking?: Date
  totalSpent: number
  status: 'active' | 'inactive' | 'new'
  tags: string[]
}

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    dateAdded: new Date('2024-12-10'),
    lastBooking: new Date('2025-03-15'),
    totalSpent: 850,
    status: 'active',
    tags: ['full-sleeve', 'color-work'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    phone: '(555) 987-6543',
    dateAdded: new Date('2024-08-22'),
    lastBooking: new Date('2025-02-28'),
    totalSpent: 1200,
    status: 'active',
    tags: ['back-piece', 'japanese'],
  },
  {
    id: '3',
    name: 'Taylor Rodriguez',
    email: 'taylor.r@example.com',
    phone: '(555) 456-7890',
    dateAdded: new Date('2025-03-05'),
    lastBooking: undefined,
    totalSpent: 0,
    status: 'new',
    tags: ['cover-up'],
  },
  {
    id: '4',
    name: 'Jordan Williams',
    email: 'jwilliams@example.com',
    phone: '(555) 234-5678',
    dateAdded: new Date('2024-06-17'),
    lastBooking: new Date('2024-11-21'),
    totalSpent: 650,
    status: 'inactive',
    tags: ['blackwork', 'geometric'],
  },
  {
    id: '5',
    name: 'Alex Murphy',
    email: 'alex.m@example.com',
    phone: '(555) 345-6789',
    dateAdded: new Date('2025-01-30'),
    lastBooking: new Date('2025-03-22'),
    totalSpent: 450,
    status: 'active',
    tags: ['traditional', 'arm'],
  },
  {
    id: '6',
    name: 'Jamie Lee',
    email: 'jamie@example.com',
    phone: '(555) 567-8901',
    dateAdded: new Date('2024-10-12'),
    lastBooking: new Date('2025-02-05'),
    totalSpent: 1875,
    status: 'active',
    tags: ['portrait', 'realism'],
  },
  {
    id: '7',
    name: 'Casey Morgan',
    email: 'casey.m@example.com',
    phone: '(555) 678-9012',
    dateAdded: new Date('2025-02-18'),
    lastBooking: undefined,
    totalSpent: 150,
    status: 'new',
    tags: ['consultation', 'first-tattoo'],
  },
  {
    id: '8',
    name: 'Dana Rivera',
    email: 'dana.r@example.com',
    phone: '(555) 789-0123',
    dateAdded: new Date('2024-09-05'),
    lastBooking: new Date('2024-12-12'),
    totalSpent: 950,
    status: 'inactive',
    tags: ['leg-sleeve', 'color-work'],
  },
  {
    id: '9',
    name: 'Riley Foster',
    email: 'riley.f@example.com',
    phone: '(555) 890-1234',
    dateAdded: new Date('2024-11-20'),
    lastBooking: new Date('2025-01-18'),
    totalSpent: 525,
    status: 'active',
    tags: ['small-piece', 'minimal'],
  },
  {
    id: '10',
    name: 'Quinn Johnson',
    email: 'quinn.j@example.com',
    phone: '(555) 901-2345',
    dateAdded: new Date('2025-03-01'),
    lastBooking: new Date('2025-03-30'),
    totalSpent: 350,
    status: 'active',
    tags: ['flash', 'traditional'],
  },
]

export default function CustomersPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const { toast } = useToast()

  // Define table columns
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'name',
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }: { row: any }) => <div className='font-medium'>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }: { row: any }) => (
        <a
          href={`mailto:${row.getValue('email')}`}
          className='flex items-center text-blue-600 hover:underline'
        >
          {row.getValue('email')}
          <Mail className='ml-1 h-3 w-3' />
        </a>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'dateAdded',
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date Added
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }: { row: any }) => {
        const date = new Date(row.getValue('dateAdded'))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: 'lastBooking',
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last Booking
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }: { row: any }) => {
        const value = row.getValue('lastBooking')
        return value ? (
          <div>{new Date(value as Date).toLocaleDateString()}</div>
        ) : (
          <div className='text-muted-foreground text-sm'>No bookings</div>
        )
      },
    },
    {
      accessorKey: 'totalSpent',
      header: ({ column }: { column: any }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total Spent
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }: { row: any }) => {
        const amount = parseFloat(row.getValue('totalSpent'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)
        return <div>{formatted}</div>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: any }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            variant={
              status === 'active' ? 'default' : status === 'inactive' ? 'secondary' : 'outline'
            }
            className={
              status === 'active'
                ? 'bg-green-500 hover:bg-green-600'
                : status === 'new'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : undefined
            }
          >
            {status}
          </Badge>
        )
      },
      filterFn: (row: { getValue: (arg0: string) => any }, id: string, value: unknown) => {
        return value === 'all' ? true : row.getValue(id) === value
      },
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }: { row: any }) => {
        const tags = row.getValue('tags') as string[]
        return (
          <div className='flex flex-wrap gap-1'>
            {tags.map((tag) => (
              <Badge key={tag} variant='outline' className='text-xs'>
                {tag}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }: { row: ReturnType<typeof table.getRowModel>["rows"][number] }) => {
        const customer = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
              <DropdownMenuItem>View Bookings</DropdownMenuItem>
              <DropdownMenuItem>Send Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Filter data by status
  const filteredData = statusFilter
    ? statusFilter === 'all'
      ? mockCustomers
      : mockCustomers.filter((customer) => customer.status === statusFilter)
    : mockCustomers

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Export function for CSV
  const handleExportCSV = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const rows = selectedRows.length > 0 ? selectedRows : table.getFilteredRowModel().rows

    // Convert to CSV
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Date Added',
      'Last Booking',
      'Total Spent',
      'Status',
      'Tags',
    ]

    // Create CSV content
    // Define types for CSV data
    type CSVRow = string[];
    type CSVData = CSVRow[];

    const csvData: CSVData = rows.map((row: { original: Customer }) => {
      const customer: Customer = row.original;
      return [
      customer.name,
      customer.email,
      customer.phone,
      new Date(customer.dateAdded).toLocaleDateString(),
      customer.lastBooking ? new Date(customer.lastBooking).toLocaleDateString() : 'N/A',
      `$${customer.totalSpent}`,
      customer.status,
      customer.tags.join(', '),
      ];
    });

    // Create CSV content
    const csvContent: string = [headers.join(','), ...csvData.map((row: CSVRow) => row.join(','))].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `customers_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: 'Export successful',
      description: `${rows.length} customers exported to CSV file`,
    })
  }

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Customers</h1>
        <p className='text-muted-foreground'>
          Manage your client database and export customer information for marketing campaigns.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>View and manage all your clients in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex flex-col sm:flex-row justify-between gap-4'>
              <div className='flex flex-1 items-center gap-2'>
                <Input
                  placeholder='Search by name or email...'
                  value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                  className='max-w-xs'
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='ml-2'>
                      <Filter className='mr-2 h-4 w-4' />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={statusFilter === 'all' || statusFilter === null}
                      onCheckedChange={() => setStatusFilter('all')}
                    >
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter === 'active'}
                      onCheckedChange={() => setStatusFilter('active')}
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter === 'inactive'}
                      onCheckedChange={() => setStatusFilter('inactive')}
                    >
                      Inactive
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter === 'new'}
                      onCheckedChange={() => setStatusFilter('new')}
                    >
                      New
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm'>
                      <TableIcon className='mr-2 h-4 w-4' />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
                        >
                          {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='flex items-center gap-2'>
                <Button onClick={handleExportCSV} className='ml-auto'>
                  <Download className='mr-2 h-4 w-4' />
                  Export{' '}
                  {Object.keys(rowSelection).length > 0
                    ? `(${Object.keys(rowSelection).length})`
                    : ''}
                </Button>
                <Button variant='default'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Customer
                </Button>
              </div>
            </div>

            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
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
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                          ))}
                        </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24 text-center'>
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className='flex items-center justify-end space-x-2 py-4'>
              <div className='flex-1 text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className='space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
