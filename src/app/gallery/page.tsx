'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GalleryGrid } from '@/components/gallery-grid'

export default function GalleryPage() {
  return (
    <main className='bg-tattoo-black min-h-screen'>
      {/* Hero Section - Side by Side Layout */}
      <section className='relative bg-tattoo-black overflow-hidden'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[70vh]'>
          {/* Text Content */}
          <div className='flex flex-col justify-center px-6 py-12 lg:py-0 lg:pl-12 lg:pr-0 z-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className='font-script text-3xl text-tattoo-red mb-4 text-center lg:text-left'
              >
                The Portfolio of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className='tattoo-heading text-shadow-bold mb-6 tracking-wider uppercase text-center lg:text-left'
              >
                Fernando{' '}
                <span className='relative inline-block'>
                  GOVEA
                  <span className='absolute -bottom-2 left-0 right-0 h-2 bg-tattoo-red'></span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
                className='text-xl md:text-2xl text-tattoo-white/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-center lg:text-left'
              >
                A curated collection of custom tattoo designs and artwork, each piece representing my
                dedication to artistic excellence and craftsmanship.
              </motion.p>

              <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center lg:justify-start'>
                <Button
                  className='w-full sm:w-auto bg-tattoo-red text-white hover:bg-tattoo-red-dark shadow-lg'
                  size='lg'
                  asChild
                >
                  <Link href='/book'>Book Appointment</Link>
                </Button>

                <Button
                  size='lg'
                  className='w-full sm:w-auto bg-transparent text-white border-2 border-white hover:bg-white/10 shadow-md'
                  asChild
                >
                  <a href='#gallery-section'>View Gallery</a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Image Content with Overlapping Layout */}
          <div className='relative lg:h-auto overflow-hidden'>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className='relative h-full min-h-[50vh] lg:min-h-[unset]'
            >
              {/* Main Image */}
              <Image
                src='/images/IMG_3896.JPG'
                alt='Fernando Govea - Tattoo artist showcase'
                fill
                className='object-cover rounded-none lg:rounded-l-3xl shadow-2xl'
                priority
              />

              {/* Decorative Elements */}
              <div className='absolute inset-0 bg-gradient-to-t from-tattoo-black/80 to-transparent opacity-80 lg:opacity-40'></div>

              {/* Floating Image 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className='absolute bottom-12 -left-6 lg:bottom-16 lg:-left-16 w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl hidden sm:block z-10 border-2 border-white/10 overflow-hidden'
              >
                <Image
                  src='/images/IMG_4249.JPG'
                  alt='Tattoo artwork sample'
                  fill
                  className='object-cover'
                />
              </motion.div>

              {/* Floating Image 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className='absolute top-12 -right-6 lg:top-16 lg:-right-16 w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl hidden sm:block z-10 border-2 border-white/10 overflow-hidden'
              >
                <Image
                  src='/images/IMG_3534.JPG'
                  alt='Tattoo artwork sample'
                  fill
                  className='object-cover'
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className='absolute bottom-0 left-0 right-0 h-16 sm:h-24'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute bottom-0 h-full w-full'>
            <path
              fill="#0a0a0a"
              fillOpacity="1"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <div id='gallery-section' className='container max-w-7xl mx-auto px-4 py-4'>
        {/* Gallery Section Heading */}
        <div className='text-center mb-12 mt-8'>
          <h2 className='tattoo-section-title'>
            Tattoo{' '}
            <span className='relative text-tattoo-red'>
              Gallery
              <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
            </span>
          </h2>
          <p className='tattoo-paragraph mx-auto max-w-3xl'>
            Browse through my portfolio of custom tattoo creations. Each piece tells a unique story and showcases
            my dedication to quality and artistic expression.
          </p>
        </div>

        {/* Gallery Grid Component */}
        <div className='mb-16'>
          <GalleryGrid />
        </div>

        {/* Process Videos Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='tattoo-section-title'>
              Behind the{' '}
              <span className='text-tattoo-blue relative'>
                Process
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-blue/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Watch as I create unique tattoo art and learn about my techniques and approach
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Video 1 */}
            <motion.div
              className='group relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg'>
                <Image
                  src='/images/IMG_3534.JPG'
                  alt='Precision Linework Technique'
                  fill
                  className='object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-tattoo-black to-transparent opacity-40'></div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-16 h-16 rounded-full bg-tattoo-red/90 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-xl font-medium text-tattoo-white group-hover:text-tattoo-red transition-colors duration-300'>
                  My Precision Linework Technique
                </h3>
                <p className='text-tattoo-white/70 text-sm mt-2'>
                  Watch how I create perfectly clean lines for my signature style
                </p>
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              className='group relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className='relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg'>
                <Image
                  src='/images/IMG_3947.JPG'
                  alt='Shading Mastery'
                  fill
                  className='object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-tattoo-black to-transparent opacity-40'></div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-16 h-16 rounded-full bg-tattoo-red/90 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-xl font-medium text-tattoo-white group-hover:text-tattoo-red transition-colors duration-300'>
                  Shading Mastery
                </h3>
                <p className='text-tattoo-white/70 text-sm mt-2'>
                  My approach to creating depth and dimension through layered shading techniques
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='relative mt-16 mb-12 overflow-hidden rounded-xl'>
          <div className='absolute inset-0 z-0'>
            <Image
              src='/images/IMG_3947.JPG'
              alt='Fernando Govea tattoo artwork'
              fill
              className='object-cover opacity-30'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-tattoo-black via-tattoo-black/90 to-tattoo-black/70'></div>
          </div>

          <div className='relative z-10 py-16 px-8 md:px-16 text-center'>
            <motion.h2
              className='tattoo-heading text-shadow-bold mb-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready for Your Own <span className='text-tattoo-red'>Custom Tattoo</span>?
            </motion.h2>

            <motion.p
              className='text-tattoo-white/90 max-w-2xl mx-auto mb-8 text-lg'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I'm ready to transform your ideas into stunning, personalized artwork. Book a
              consultation today to begin your tattoo journey with me.
            </motion.p>

            <motion.div
              className='flex flex-col sm:flex-row items-center justify-center gap-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                size='lg'
                className='bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90'
              >
                <Link href='/book'>
                  Book a Consultation
                </Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='border-tattoo-white/30 text-tattoo-white hover:bg-tattoo-white/10'
              >
                <Link href='/contact'>
                  Contact Me
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
