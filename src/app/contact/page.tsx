import { ContactForm } from "@/components/forms/contact-form";
import { Metadata } from "next";
import Image from "next/image";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Fernando Govea",
  description: "Get in touch with Fernando Govea to discuss your tattoo ideas or book an appointment.",
};

export default function ContactPage() {
  return (
    <main className="bg-tattoo-black min-h-screen">
      {/* Header Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image 
          src="/IMG_2947.JPG" 
          alt="Fernando Govea's tattoo workspace" 
          fill 
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/50 to-tattoo-black/90"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="tattoo-heading mb-4">
            Contact <span className="text-tattoo-red">Me</span>
          </h1>
          <p className="text-xl text-tattoo-white/90 max-w-2xl tattoo-paragraph">
            Share your ideas and let's create something unique together
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="tattoo-container">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="tattoo-card">
              <h2 className="tattoo-subheading mb-6">
                Fernando's <span className="text-tattoo-blue">Information</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-tattoo-red mt-0.5" />
                  <div>
                    <h3 className="font-medium text-tattoo-white">Phone</h3>
                    <p className="text-tattoo-white/70">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-tattoo-red mt-0.5" />
                  <div>
                    <h3 className="font-medium text-tattoo-white">Email</h3>
                    <p className="text-tattoo-white/70">fennyg83@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-tattoo-red mt-0.5" />
                  <div>
                    <h3 className="font-medium text-tattoo-white">Location</h3>
                    <p className="text-tattoo-white/70">
                      123 Art Street, Suite 101<br />
                      Los Angeles, CA 90001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-tattoo-red mt-0.5" />
                  <div>
                    <h3 className="font-medium text-tattoo-white">Working Hours</h3>
                    <div className="text-tattoo-white/70">
                      <p>Monday - Friday: 11am - 8pm</p>
                      <p>Saturday: 10am - 6pm</p>
                      <p>Sunday: By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Card */}
            <div className="tattoo-card">
              <h2 className="tattoo-subheading mb-6">
                Frequently <span className="text-tattoo-blue">Asked</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-tattoo-red">How much does a tattoo cost?</h3>
                  <p className="text-sm text-tattoo-white/70 mt-1">
                    Tattoo prices vary based on size, detail, and placement. I provide custom quotes after reviewing your design idea.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-tattoo-red">Do I need an appointment?</h3>
                  <p className="text-sm text-tattoo-white/70 mt-1">
                    Yes, I work by appointment only to ensure each client receives my full attention and the best possible results.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-tattoo-red">What if I don't have a design yet?</h3>
                  <p className="text-sm text-tattoo-white/70 mt-1">
                    I can help create a custom design based on your ideas. Just share your concept and we'll work together to bring it to life.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-tattoo-red">Do you require a deposit?</h3>
                  <p className="text-sm text-tattoo-white/70 mt-1">
                    Yes, I require a non-refundable deposit to secure your appointment, which is then applied to your final tattoo cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="h-[400px] w-full bg-tattoo-gray/30 flex items-center justify-center mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-tattoo-blue/5 opacity-30"></div>
        <div className="text-center px-4 relative z-10">
          <h2 className="text-2xl font-bold text-tattoo-white mb-2">Find Me</h2>
          <p className="text-tattoo-white/70 mb-4">Located in the heart of the Arts District</p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tattoo-button"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </main>
  );
}
