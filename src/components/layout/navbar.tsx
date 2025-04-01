"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              Ink 37
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-red-500 transition-colors">
              Home
            </Link>
            <Link href="/gallery" className="text-white hover:text-red-500 transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-white hover:text-red-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-red-500 transition-colors">
              Contact
            </Link>
            <Button className="bg-tattoo-red text-white hover:bg-tattoo-red-dark" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button - you can implement a mobile menu here */}
            <Button variant="ghost" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
