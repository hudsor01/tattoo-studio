import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG_2947.JPG"
          alt="Tattoo studio workspace"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/80 via-tattoo-black/60 to-tattoo-black"></div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tattoo-white mb-6 leading-tight">
            Transform Your Ideas Into <span className="text-tattoo-red">Timeless</span> Art
          </h1>

          <p className="text-xl text-tattoo-white/90 mb-8 leading-relaxed">
            Professional custom tattoos that tell your unique story.
            Experience the perfect blend of artistry and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/booking"
              className="tattoo-button group"
            >
              Book Your Session
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/gallery"
              className="tattoo-button-outline"
            >
              Explore Our Work
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '5000+', label: 'Satisfied Clients' },
              { number: '15+', label: 'Awards Won' },
              { number: '3', label: 'Expert Artists' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-tattoo-red mb-1">{stat.number}</div>
                <div className="text-sm text-tattoo-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-tattoo-white/50 text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-tattoo-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-tattoo-red rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
}
