'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useToast } from '@/components/ui/use-toast'
import {
  ArrowUpDown,
  Download,
  MoreHorizontal,
  Search,
  Calendar,
  CreditCard,
  DollarSign,
  FileText
} from 'lucide-react'
import { format, subDays } from 'date-fns'

// Define transaction types
type PaymentMethod = 'cash' | 'credit_card' | 'venmo' | 'paypal' | 'cashapp' | 'other'
type TransactionType = 'deposit' | 'payment' | 'refund'

interface Transaction {
  id: string
  date: Date
  clientName: string
  clientEmail: string
  amount: number
  type: TransactionType
  paymentMethod: PaymentMethod
  appointmentId?: string
  appointmentType?: string
  notes?: string
  invoice?: string
  receipt?: string
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: 'txn_1',
    date: new Date(2025, 3, 5), // April 5, 2025
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@example.com',
    amount: 150,
    type: 'deposit',
    paymentMethod: 'credit_card',
    appointmentId: '1',
    appointmentType: 'Full Sleeve Consultation',
    receipt: 'receipt_1.pdf'
  },
  {
    id: 'txn_2',
    date: new Date(2025, 3, 5), // April 5, 2025
    clientName: 'Michael Chen',
    clientEmail: 'mchen@example.com',
    amount: 500,
    type: 'payment',
    paymentMethod: 'venmo',
    appointmentId: '2',
    appointmentType: 'Back Piece Session',
    notes: 'Payment for second session',
    receipt: 'receipt_2.pdf'
  },
  {
    id: 'txn_3',
    date: new Date(2025, 3, 4), // April 4, 2025
    clientName: 'Taylor Rodriguez',
    clientEmail: 'taylor.r@example.com',
    amount: 100,
    type: 'deposit',
    paymentMethod: 'cashapp',
    appointmentId: '3',
    appointmentType: 'Cover-up Consultation',
    receipt: 'receipt_3.pdf'
  },
  {
    id: 'txn_4',
    date: new Date(2025, 3, 2), // April 2, 2025
    clientName: 'Jordan Williams',
    clientEmail: 'jwilliams@example.com',
    amount: 350,
    type: 'payment',
    paymentMethod: 'cash',
    appointmentId: '4',
    appointmentType: 'Geometric Tattoo',
    notes: 'Payment in full',
    receipt: 'receipt_4.pdf'
  },
  {
    id: 'txn_5',
    date: new Date(2025, 3, 3), // April 3, 2025
    clientName: 'Alex Murphy',
    clientEmail: 'alex.m@example.com',
    amount: 50,
    type: 'deposit',
    paymentMethod: 'paypal',
    appointmentId: '5',
    appointmentType: 'Traditional Arm Tattoo',
    receipt: 'receipt_5.pdf'
  },
  {
    id: 'txn_6',
    date: new Date(2025, 3, 1), // April 1, 2025
    clientName: 'Jamie Lee',
    clientEmail: 'jamie@example.com',
    amount: 600,
    type: 'payment',
    paymentMethod: 'credit_card',
    appointmentId: '6',
    appointmentType: 'Portrait Session',
    notes: 'Final payment',
    receipt: 'receipt_6.pdf'
  },
  {
    id: 'txn_7',
    date: new Date(2025, 2, 30), // March 30, 2025
    clientName: 'Casey Morgan',
    clientEmail: 'casey.m@example.com',
    amount: 75,
    type: 'refund',
    paymentMethod: 'paypal',
    notes: 'Refund for cancelled appointment',
    receipt: 'receipt_7.pdf'
  },
  {
    id: 'txn_8',
    date: new Date(2025, 2, 29), // March 29, 2025
    clientName: 'Dana Rivera',
    clientEmail: 'dana.r@example.com',
    amount: 250,
    type: 'deposit',
    paymentMethod: 'venmo',
    appointmentId: '8',
    appointmentType: 'Leg Sleeve Session',
    receipt: 'receipt_8.pdf'
  },
  {
    id: 'txn_9',
    date: new Date(2025, 2, 28), // March 28, 2025
    clientName: 'Riley Foster',
    clientEmail: 'riley.f@example.com',
    amount: 200,
    type: 'payment',
    paymentMethod: 'cash',
    appointmentId: '9',
    appointmentType: 'Small Piece',
    notes: 'Payment in full, walk-in client',
    receipt: 'receipt_9.pdf'
  },
  {
    id: 'txn_10',
    date: new Date(2025, 2, 28), // March 28, 2025
    clientName: 'Quinn Johnson',
    clientEmail: 'quinn.j@example.com',
    amount: 50,
    type: 'deposit',
    paymentMethod: 'cashapp',
    appointmentId: '10',
    appointmentType: 'Flash Tattoo',
    receipt: 'receipt_10.pdf'
  }
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
    from: subDays(new Date(), 30),
    to: new Date()
  })
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<TransactionType | 'all'>('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<PaymentMethod | 'all'>('all')
  const { toast } = useToast()

  // Filter transactions based on search, date range, type, and method
  const filteredTransactions = mockTransactions
    .filter(transaction =>
      // Search by client name or email
      transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.appointmentType?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(transaction =>
      // Filter by date range
      transaction.date >= dateRange.from && transaction.date <= dateRange.to
    )
    .filter(transaction =>
      // Filter by transaction type
      transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
    )
    .filter(transaction =>
      // Filter by payment method
      paymentMethodFilter === 'all' || transaction.paymentMethod === paymentMethodFilter
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first

  // Calculate total amounts
  const totalRevenue = filteredTransactions
    .filter(t => t.type !== 'refund')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalDeposits = filteredTransactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalPayments = filteredTransactions
    .filter(t => t.type === 'payment')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalRefunds = filteredTransactions
    .filter(t => t.type === 'refund')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Export transactions as CSV
  const handleExportCSV = () => {
    // Convert to CSV
    const headers = [
      'Date',
      'Client Name',
      'Client Email',
      'Amount',
      'Type',
      'Payment Method',
      'Appointment Type',
      'Notes'
    ]

    const csvData = filteredTransactions.map(txn => {
      return [
        format(txn.date, 'yyyy-MM-dd'),
        txn.clientName,
        txn.clientEmail,
        txn.amount.toFixed(2),
        txn.type,
        txn.paymentMethod,
        txn.appointmentType || 'N/A',
        txn.notes || ''
      ]
    })

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `transactions_${format(dateRange.from, 'yyyy-MM-dd')}_to_${format(dateRange.to, 'yyyy-MM-dd')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: 'Export successful',
      description: `${filteredTransactions.length} transactions exported to CSV file`,
    })
  }

  // Render badge for transaction type
  const renderTransactionTypeBadge = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Deposit</Badge>;
      case 'payment':
        return <Badge className="bg-green-500 hover:bg-green-600">Payment</Badge>;
      case 'refund':
        return <Badge variant="destructive">Refund</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Render payment method
  const renderPaymentMethod = (method: PaymentMethod) => {
    switch (method) {
      case 'cash':
        return <div className="flex items-center"><DollarSign className="h-3 w-3 mr-1" /> Cash</div>;
      case 'credit_card':
        return <div className="flex items-center"><CreditCard className="h-3 w-3 mr-1" /> Credit Card</div>;
      case 'venmo':
        return <div className="flex items-center">Venmo</div>;
      case 'paypal':
        return <div className="flex items-center">PayPal</div>;
      case 'cashapp':
        return <div className="flex items-center">Cash App</div>;
      default:
        return <div>Other</div>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          Track and manage all payments, deposits, and refunds.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For selected period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deposits
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDeposits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredTransactions.filter(t => t.type === 'deposit').length} total deposits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payments
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredTransactions.filter(t => t.type === 'payment').length} total payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Refunds
            </CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunds.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredTransactions.filter(t => t.type === 'refund').length} total refunds
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and manage all financial transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-1 sm:max-w-sm items-center">
                <Input
                  placeholder="Search by client or transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <DateRangePicker
                  value={dateRange}
                  onChange={setDateRange}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Type: {transactionTypeFilter === 'all' ? 'All' : transactionTypeFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTransactionTypeFilter('all')}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTransactionTypeFilter('deposit')}>Deposit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTransactionTypeFilter('payment')}>Payment</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTransactionTypeFilter('refund')}>Refund</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Method: {paymentMethodFilter === 'all' ? 'All' : paymentMethodFilter.replace('_', ' ')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('all')}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('cash')}>Cash</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('credit_card')}>Credit Card</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('venmo')}>Venmo</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('paypal')}>PayPal</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('cashapp')}>Cash App</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPaymentMethodFilter('other')}>Other</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={handleExportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Appointment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {format(transaction.date, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transaction.clientName}</div>
                          <div className="text-sm text-muted-foreground">{transaction.clientEmail}</div>
                        </TableCell>
                        <TableCell className={transaction.type === 'refund' ? 'text-red-500' : 'text-green-600'}>
                          {transaction.type === 'refund' ? '-' : ''}${transaction.amount}
                        </TableCell>
                        <TableCell>
                          {renderTransactionTypeBadge(transaction.type)}
                        </TableCell>
                        <TableCell>
                          {renderPaymentMethod(transaction.paymentMethod)}
                        </TableCell>
                        <TableCell>
                          {transaction.appointmentType ? (
                            <div>
                              <div className="text-sm">{transaction.appointmentType}</div>
                              {transaction.appointmentId && (
                                <div className="text-xs text-muted-foreground">ID: {transaction.appointmentId}</div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              {transaction.receipt && (
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Receipt
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                Edit Transaction
                              </DropdownMenuItem>
                              {transaction.appointmentId && (
                                <DropdownMenuItem>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  View Appointment
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download Receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} transactions
              {searchTerm && ` matching "${searchTerm}"`}
              {transactionTypeFilter !== 'all' && ` of type "${transactionTypeFilter}"`}
              {paymentMethodFilter !== 'all' && ` paid by "${paymentMethodFilter.replace('_', ' ')}"`}
              {` from ${format(dateRange.from, 'MMM d, yyyy')} to ${format(dateRange.to, 'MMM d, yyyy')}`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
