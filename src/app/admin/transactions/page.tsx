'use client'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format, subDays } from 'date-fns'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

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
    receipt: 'receipt_1.pdf',
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
    receipt: 'receipt_2.pdf',
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
    receipt: 'receipt_3.pdf',
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
    receipt: 'receipt_4.pdf',
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
    receipt: 'receipt_5.pdf',
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
    receipt: 'receipt_6.pdf',
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
    receipt: 'receipt_7.pdf',
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
    receipt: 'receipt_8.pdf',
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
    receipt: 'receipt_9.pdf',
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
    receipt: 'receipt_10.pdf',
  },
]

export default function TransactionsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  // Filter transactions based on date range
  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (!date?.from || !date?.to) return true;
    return transaction.date >= date.from && transaction.date <= date.to;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Date Range Picker */}
      <div className="mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date ? "text-muted-foreground" : undefined
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" autoFocus>
            <Calendar
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              mode="range"
              defaultMonth={date?.from}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="bg-[#0a0a0a] rounded-lg p-6 border border-[#ffffff]/10">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[#ffffff]">Showing {filteredTransactions.length} transactions</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              Print
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#ffffff]/10 text-left text-[#ffffff]/70">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Payment Method</th>
                <th className="px-4 py-3 font-medium">Appointment</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-[#ffffff]/10 hover:bg-[#ffffff]/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-[#ffffff]">
                      {format(transaction.date, 'MMM dd, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-[#ffffff]">
                      <div>{transaction.clientName}</div>
                      <div className="text-sm text-[#ffffff]/70">{transaction.clientEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-[#ffffff]">
                      <span className={transaction.type === 'refund' ? 'text-red-500' : 'text-green-500'}>
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        transaction.type === 'deposit' ? 'bg-blue-500/20 text-blue-500' :
                        transaction.type === 'payment' ? 'bg-green-500/20 text-green-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#ffffff] capitalize">
                      {transaction.paymentMethod.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-3 text-[#ffffff]">
                      {transaction.appointmentType || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffffff]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffffff]"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-[#ffffff]/70">
                    No transactions found for the selected date range
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
