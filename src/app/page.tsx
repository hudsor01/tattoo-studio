'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GalleryGrid } from '@/components/gallery-grid'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <section className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-tattoo-black/70 to-tattoo-black/50 z-10' />
        <div className='relative h-[80vh]'>
          <Image
            src='/images/leg-piece.jpg'
            alt='Fernando Govea tattoo artwork - detailed leg piece'
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='absolute inset-0 z-20 flex items-center justify-center'>
          <div className='container px-4 md:px-6 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='tattoo-script text-shadow-bold mb-4 text-tattoo-white'
            >
              Ink 37
            </motion.h1>
            <h2 className='tattoo-display text-tattoo-white mb-6'>
              Fernando <span className='text-tattoo-red'>Govea</span>
            </h2>
            <p className='tattoo-paragraph max-w-3xl mx-auto mb-10'>
              Custom tattoos crafted with precision and passion
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                className='bg-tattoo-red text-tattoo-white hover:bg-opacity-90'
                size='lg'
                asChild
              >
                <Link
                  href='/book'
                  onClick={(e) => {
                    // Stop propagation to prevent any parent handlers from triggering
                    e.stopPropagation();
                  }}
                >Book Appointment</Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-tattoo-white text-tattoo-white hover:bg-tattoo-white/20'
              >
                <Link
                  href='/gallery'
                  onClick={(e) => {
                    // Stop propagation to prevent any parent handlers from triggering
                    e.stopPropagation();
                  }}
                >View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className='py-20 bg-tattoo-black'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='tattoo-section-title'>
              Featured <span className='text-tattoo-red relative'>
                Work
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Browse through some of my best tattoo creations and get inspired for your next piece
            </p>
          </div>

          <GalleryGrid />

          <div className='mt-12 text-center'>
            <Button
              className='bg-tattoo-red text-tattoo-white hover:bg-opacity-90'
              size='lg'
              asChild
            >
              <Link
                href='/gallery'
                onClick={(e) => {
                  // Stop propagation to prevent any parent handlers from triggering
                  e.stopPropagation();
                }}
              >View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tattoo Process Section */}
      <section className='py-20 bg-zinc-900'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='tattoo-section-title'>
              My <span className='text-tattoo-red relative'>
                Process
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              From concept to completion, here's how we'll work together to create your perfect
              tattoo
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-black p-8 rounded-lg border-l-4 border-tattoo-red'>
              <div className='text-tattoo-red text-4xl font-bold mb-4'>01</div>
              <h3 className='text-xl font-bold text-white mb-3'>Consultation</h3>
              <p className='text-gray-300'>
                We'll discuss your ideas, placement, size, and design elements to create a concept
                that perfectly matches your vision.
              </p>
            </div>

            <div className='bg-black p-8 rounded-lg border-l-4 border-tattoo-red'>
              <div className='text-tattoo-red text-4xl font-bold mb-4'>02</div>
              <h3 className='text-xl font-bold text-white mb-3'>Design</h3>
              <p className='text-gray-300'>
                I'll create a custom design based on our consultation, with revisions until you're
                completely satisfied with the artwork.
              </p>
            </div>

            <div className='bg-black p-8 rounded-lg border-l-4 border-tattoo-red'>
              <div className='text-tattoo-red text-4xl font-bold mb-4'>03</div>
              <h3 className='text-xl font-bold text-white mb-3'>Tattooing</h3>
              <p className='text-gray-300'>
                Using premium equipment and inks, I'll bring your design to life with meticulous
                attention to detail and your comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-tattoo-black'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='tattoo-section-title'>
              Client <span className='text-tattoo-red relative'>
                Testimonials
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              What my clients say about their tattoo experience
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-zinc-900 p-8 rounded-lg'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-tattoo-red rounded-full flex items-center justify-center text-white font-bold text-xl'>
                  J
                </div>
                <div className='ml-4'>
                  <h3 className='text-white font-bold'>James Rodriguez</h3>
                  <p className='text-gray-400'>Full Sleeve</p>
                </div>
              </div>
              <p className='text-gray-300 italic'>
                "Fernando's attention to detail is incredible. He took my concept and transformed it
                into something better than I could have imagined. The entire process was comfortable
                and professional."
              </p>
            </div>

            <div className='bg-zinc-900 p-8 rounded-lg'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-tattoo-red rounded-full flex items-center justify-center text-white font-bold text-xl'>
                  M
                </div>
                <div className='ml-4'>
                  <h3 className='text-white font-bold'>Maria Chen</h3>
                  <p className='text-gray-400'>Back Piece</p>
                </div>
              </div>
              <p className='text-gray-300 italic'>
                "I was nervous about getting such a large piece, but Fernando made me feel at ease
                throughout the entire process. His black and grey work is unmatched, and I couldn't
                be happier with my tattoo."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-zinc-900'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='tattoo-section-title'>
              Frequently <span className='text-tattoo-red relative'>
                Asked Questions
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Everything you need to know before getting tattooed
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <div className='bg-black p-6 rounded-lg'>
              <h3 className='text-xl font-bold text-white mb-3'>How much do tattoos cost?</h3>
              <p className='text-gray-300'>
                Pricing depends on size, detail, and placement. Small pieces start at $150, while
                larger custom work is priced by the hour at $180/hr.
              </p>
            </div>

            <div className='bg-black p-6 rounded-lg'>
              <h3 className='text-xl font-bold text-white mb-3'>How do I book an appointment?</h3>
              <p className='text-gray-300'>
                You can book a consultation through the website or contact me directly. A deposit is
                required to secure your appointment.
              </p>
            </div>

            <div className='bg-black p-6 rounded-lg'>
              <h3 className='text-xl font-bold text-white mb-3'>Do you do cover-ups?</h3>
              <p className='text-gray-300'>
                Yes, I specialize in transforming old or unwanted tattoos into new designs you'll
                love. Cover-ups require a consultation to assess the existing tattoo.
              </p>
            </div>

            <div className='bg-black p-6 rounded-lg'>
              <h3 className='text-xl font-bold text-white mb-3'>
                How should I prepare for my session?
              </h3>
              <p className='text-gray-300'>
                Get plenty of rest, stay hydrated, eat before your appointment, and avoid alcohol
                for 24 hours prior to your session.
              </p>
            </div>
          </div>

          <div className='text-center mt-10'>
            <Button className='bg-tattoo-red text-tattoo-white hover:bg-opacity-90' asChild>
              <Link
                href='/faq'
                onClick={(e) => {
                  // Stop propagation to prevent any parent handlers from triggering
                  e.stopPropagation();
                }}
              >View All FAQs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-tattoo-red text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='tattoo-heading text-shadow-bold mb-6'>
            Ready To Get <span className='text-black font-extrabold'>Inked?</span>
          </h2>
          <p className='text-xl md:text-2xl max-w-2xl mx-auto mb-10'>
            Contact me today to discuss your ideas and schedule a consultation
          </p>
          <Button
            className='bg-black text-white hover:bg-opacity-90 border-2 border-white'
            size='lg'
          >
            <a href='/contact'>Get In Touch</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
