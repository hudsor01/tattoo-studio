import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/booking/booking-form";
import { Button } from "@/components/ui/button";
import { Clock, Shield, CreditCard, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment | Tattoo Studio",
  description: "Schedule your tattoo appointment with our talented artists.",
};

export default function BookingPage() {
  return (
    <main className="bg-tattoo-white min-h-screen">
      {/* Header Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image 
          src="/5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg" 
          alt="Tattoo artist at work" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/80 to-tattoo-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-tattoo-white mb-4">
            Book Your <span className="text-tattoo-red">Appointment</span>
          </h1>
          <p className="text-xl text-tattoo-white/90 max-w-2xl">
            Reserve your session with our talented artists
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <BookingForm />
          </div>
          
          <div className="space-y-8">
            {/* Information Card */}
            <div className="bg-tattoo-black p-6 rounded-lg shadow-lg border border-tattoo-red/20">
              <h2 className="text-xl font-bold mb-6 text-tattoo-white">
                Before Your <span className="text-tattoo-blue">Appointment</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-tattoo-red/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="font-medium text-tattoo-white">Know Before You Go</h3>
                    <ul className="text-sm text-tattoo-white/70 mt-2 space-y-1 list-disc pl-4">
                      <li>Bring a valid ID - you must be 18+ to get tattooed</li>
                      <li>Eat a full meal before your appointment</li>
                      <li>Stay hydrated (but limit caffeine and alcohol)</li>
                      <li>Wear comfortable clothing that allows access to the tattoo area</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-tattoo-blue/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-tattoo-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium text-tattoo-white">Deposits & Payment</h3>
                    <p className="text-sm text-tattoo-white/70 mt-2">
                      We require a non-refundable deposit to secure your appointment. This deposit will be applied to your final tattoo cost. We accept cash, credit cards, and mobile payments.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-tattoo-red/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="font-medium text-tattoo-white">Cancellation Policy</h3>
                    <p className="text-sm text-tattoo-white/70 mt-2">
                      We require at least 48 hours notice for cancellations or rescheduling. Deposits are non-refundable for cancellations with less than 48 hours notice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Artist Card */}
            <div className="bg-tattoo-red p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-tattoo-white">
                Featured <span className="text-tattoo-black">Artist</span>
              </h2>
              
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
                <Image 
                  src="/fernando-card.jpg" 
                  alt="Fernando - Tattoo Artist" 
                  fill
                  className="object-cover"
                />
              </div>
              
              <h3 className="text-lg font-bold text-tattoo-white">Fernando</h3>
              <p className="text-tattoo-white/80 text-sm mb-4">
                Specializing in black & grey realism, traditional, and Japanese styles.
              </p>
              
              <Button className="w-full bg-tattoo-black text-tattoo-white hover:bg-opacity-90" asChild>
                <Link href="/artists/fernando">View Portfolio</Link>
              </Button>
            </div>
            
            {/* Need Help Card */}
            <div className="bg-tattoo-blue p-6 rounded-lg shadow-lg">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-full bg-tattoo-white/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-tattoo-white" />
                </div>
                <div>
                  <h3 className="font-medium text-tattoo-white text-lg">Need Assistance?</h3>
                  <p className="text-sm text-tattoo-white/80 mt-2 mb-4">
                    If you have any questions or need help booking your appointment, please contact us directly.
                  </p>
                  <div className="text-sm text-tattoo-white/90">
                    <p className="mb-1"><span className="font-medium">Phone:</span> (555) 123-4567</p>
                    <p><span className="font-medium">Email:</span> bookings@tattoo-studio.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
