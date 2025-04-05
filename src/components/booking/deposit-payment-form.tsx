'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookingFormValues } from '@/lib/validators/booking'
import { Loader2, CreditCard, CheckCircle2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaymentIcon } from '@/components/ui/payment-icon'
import Image from 'next/image'

interface PaymentFormProps {
  bookingData: BookingFormValues
  onPaymentSuccess: (paymentId: string) => void
  onCancel: () => void
}

export function DepositPaymentForm({ bookingData, onPaymentSuccess, onCancel }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('credit-card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const DEPOSIT_AMOUNT = 50;

  const formatCardNumber = (value: string) => {
    // Remove spaces and non-digits
    const digits = value.replace(/\D/g, '')
    // Add a space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
    return formatted.substring(0, 19) // Limit to 16 digits + 3 spaces
  }

  const formatExpiryDate = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '')
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
    }
    return digits
  }

  const validateCreditCardForm = () => {
    const errors: Record<string, string> = {};

    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = 'Please enter a valid card number';
    }

    if (!expiryDate || expiryDate.length < 5) {
      errors.expiryDate = 'Please enter a valid expiry date';
    } else {
      const [month, year] = expiryDate.split('/');
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;

      if (
        parseInt(month) < 1 ||
        parseInt(month) > 12 ||
        (parseInt(year) < currentYear ||
          (parseInt(year) === currentYear && parseInt(month) < currentMonth))
      ) {
        errors.expiryDate = 'Card has expired';
      }
    }

    if (!cvc || cvc.length < 3) {
      errors.cvc = 'Please enter a valid CVC';
    }

    if (!nameOnCard) {
      errors.nameOnCard = 'Please enter the name on card';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form based on payment method
    if (selectedPaymentMethod === 'credit-card' && !validateCreditCardForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Prepare payment details based on method
      const paymentDetails = {
        amount: DEPOSIT_AMOUNT,
        method: selectedPaymentMethod,
        last4: selectedPaymentMethod === 'credit-card' ? cardNumber.replace(/\s/g, '').slice(-4) : '',
      };

      // Make API call to process payment and update booking
      const response = await fetch('/api/booking/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData,
          paymentDetails,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process payment');
      }

      // Show success state
      setIsComplete(true);

      // Call the success callback
      onPaymentSuccess(result.paymentId);

      toast.success('Deposit payment successful! Your appointment is now confirmed.');
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Payment failed. Please try again or contact us for assistance.');
    } finally {
      setIsProcessing(false);
    }
  }

  const renderPaymentMethodInstructions = () => {
    switch (selectedPaymentMethod) {
      case 'paypal':
        return (
          <div className="text-center p-4">
            <p className="mb-4 text-sm text-tattoo-white/70">Click the button below to pay your deposit using PayPal.</p>
            <Button
              type="button"
              className="bg-[#0070ba] hover:bg-[#003087] text-white flex items-center justify-center w-full"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Image src="/images/paypal-logo.svg" alt="PayPal" width={80} height={20} />
                  <span>Pay ${DEPOSIT_AMOUNT}.00</span>
                </span>
              )}
            </Button>
          </div>
        );
      case 'cashapp':
        return (
          <div className="text-center p-4">
            <div className="mb-4 bg-tattoo-black/40 p-3 rounded-md">
              <p className="text-sm text-tattoo-white/70 mb-2">Send $50 to our Cash App:</p>
              <p className="font-bold text-green-400 text-lg">$Ink37Studio</p>
              <p className="text-xs text-tattoo-white/60 mt-2">Please include your name and appointment date in the note</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-tattoo-white/70">After sending payment, click the button below to confirm:</p>
              <Button
                type="button"
                className="bg-[#00D632] hover:bg-[#00A527] text-white"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "I've Sent the Payment"
                )}
              </Button>
            </div>
          </div>
        );
      case 'venmo':
        return (
          <div className="text-center p-4">
            <div className="mb-4 bg-tattoo-black/40 p-3 rounded-md">
              <p className="text-sm text-tattoo-white/70 mb-2">Send $50 to our Venmo:</p>
              <p className="font-bold text-[#3D95CE] text-lg">@Ink37-Studio</p>
              <p className="text-xs text-tattoo-white/60 mt-2">Please include your name and appointment date in the note</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-tattoo-white/70">After sending payment, click the button below to confirm:</p>
              <Button
                type="button"
                className="bg-[#3D95CE] hover:bg-[#2D7CAE] text-white"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "I've Sent the Payment"
                )}
              </Button>
            </div>
          </div>
        );
      case 'credit-card':
      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
              <Label htmlFor="card-number" className="text-sm">Card Number</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="pl-10 border-white/20 bg-tattoo-black/50 text-tattoo-white focus-visible:ring-tattoo-red-light"
                  maxLength={19}
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-tattoo-white/50" />
              </div>
              {formErrors.cardNumber && (
                <p className="text-xs text-tattoo-red mt-1">{formErrors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry-date" className="text-sm">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  className="border-white/20 bg-tattoo-black/50 text-tattoo-white focus-visible:ring-tattoo-red-light"
                  maxLength={5}
                />
                {formErrors.expiryDate && (
                  <p className="text-xs text-tattoo-red mt-1">{formErrors.expiryDate}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cvc" className="text-sm">CVC</Label>
                <Input
                  id="cvc"
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                  className="border-white/20 bg-tattoo-black/50 text-tattoo-white focus-visible:ring-tattoo-red-light"
                  maxLength={3}
                />
                {formErrors.cvc && (
                  <p className="text-xs text-tattoo-red mt-1">{formErrors.cvc}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="name-on-card" className="text-sm">Name on Card</Label>
              <Input
                id="name-on-card"
                type="text"
                placeholder="John Doe"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className="border-white/20 bg-tattoo-black/50 text-tattoo-white focus-visible:ring-tattoo-red-light"
              />
              {formErrors.nameOnCard && (
                <p className="text-xs text-tattoo-red mt-1">{formErrors.nameOnCard}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-tattoo-red hover:bg-tattoo-red-dark"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                `Pay $${DEPOSIT_AMOUNT} Deposit`
              )}
            </Button>
          </form>
        );
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-md mx-auto bg-tattoo-black/70 text-tattoo-white border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold flex justify-center">
            <CheckCircle2 className="mr-2 h-6 w-6 text-green-500" />
            Payment Complete
          </CardTitle>
          <CardDescription className="text-tattoo-white/70">
            Your $50 deposit has been received
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-tattoo-black/50 p-4 rounded-md">
            <p className="text-sm text-tattoo-white/70 mb-1">Appointment Details</p>
            <p className="font-semibold">{bookingData.clientName}</p>
            <p>{formatDate(bookingData.date)} at {bookingData.time}</p>
            <p>{bookingData.duration} min - {bookingData.tattooType.replace('_', ' ').toLowerCase()}</p>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span>Deposit paid:</span>
              <span className="font-semibold">${DEPOSIT_AMOUNT}.00</span>
            </div>
            <p className="text-xs text-tattoo-white/70 mt-2">
              This deposit will be applied to your total due at the time of your appointment.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full bg-tattoo-red hover:bg-tattoo-red-dark"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-tattoo-black/70 text-tattoo-white border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Secure Your Appointment</CardTitle>
        <CardDescription className="text-tattoo-white/70">
          A $50 non-refundable deposit is required to confirm your booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 rounded-md bg-tattoo-black/50 text-sm">
          <p><span className="font-semibold">{bookingData.clientName}</span></p>
          <p>{formatDate(bookingData.date)} at {bookingData.time}</p>
          <p>{bookingData.tattooType.replace('_', ' ').toLowerCase()} - {bookingData.duration} min</p>
          <p className="mt-2 text-tattoo-white/90 font-semibold">Deposit amount: ${DEPOSIT_AMOUNT}.00</p>
          <p className="mt-1 text-xs text-tattoo-white/70">This deposit will be applied to your total due at the time of your appointment.</p>
        </div>

        <Tabs defaultValue="credit-card" onValueChange={setSelectedPaymentMethod} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4 bg-tattoo-black/40">
            <TabsTrigger value="credit-card" className="data-[state=active]:bg-tattoo-red/80">
              <PaymentIcon method="credit-card" size="sm" className="mr-2" />
              <span className="hidden sm:inline">Card</span>
            </TabsTrigger>
            <TabsTrigger value="paypal" className="data-[state=active]:bg-[#0070ba]/80">
              <PaymentIcon method="paypal" size="sm" className="mr-2" />
              <span className="hidden sm:inline">PayPal</span>
            </TabsTrigger>
            <TabsTrigger value="cashapp" className="data-[state=active]:bg-[#00D632]/80">
              <PaymentIcon method="cashapp" size="sm" className="mr-2" />
              <span className="hidden sm:inline">Cash App</span>
            </TabsTrigger>
            <TabsTrigger value="venmo" className="data-[state=active]:bg-[#3D95CE]/80">
              <PaymentIcon method="venmo" size="sm" className="mr-2" />
              <span className="hidden sm:inline">Venmo</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-card">
            {renderPaymentMethodInstructions()}
          </TabsContent>
          <TabsContent value="paypal">
            {renderPaymentMethodInstructions()}
          </TabsContent>
          <TabsContent value="cashapp">
            {renderPaymentMethodInstructions()}
          </TabsContent>
          <TabsContent value="venmo">
            {renderPaymentMethodInstructions()}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isProcessing}
          className="w-full text-tattoo-white/70 hover:text-tattoo-white hover:bg-white/10"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
