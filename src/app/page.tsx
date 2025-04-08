'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GalleryGrid } from '@/components/gallery-grid'
import { motion } from 'framer-motion'
import ClientOnly from '@/components/client-only'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Star, ChevronRight } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col'>
      {/* Hero Section - Side by Side Layout */}
      <section className='relative bg-tattoo-black overflow-hidden'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[80vh]'>
          {/* Text Content */}
          <div className='flex flex-col justify-center px-6 py-12 lg:py-0 lg:pl-12 lg:pr-0 z-10'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='tattoo-script text-tattoo-red mb-4 text-center lg:text-left'>
                Ink 37
              </h1>

              <h2 className='tattoo-display mb-6 text-center lg:text-left'>
                Fernando <span className='relative inline-block'>GOVEA
                  <span className='absolute -bottom-2 left-0 right-0 h-2 bg-tattoo-red'></span>
                </span>
              </h2>

              <p className='tattoo-paragraph mb-8 max-w-xl mx-auto lg:mx-0'>
                Custom tattoos crafted with precision and passion by a specialist in black & gray realism, fine line work, and geometric designs.
              </p>

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
                  <Link href='/gallery'>View My Work</Link>
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
                src='/images/leg-piece.jpg'
                alt='Fernando Govea tattoo artwork - detailed leg piece'
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

      {/* Featured Work Section */}
      <section className='bg-tattoo-black py-8 sm:py-12 md:py-16'>
        <div className='tattoo-container py-8'>
          <div className='mb-8 text-center md:mb-12'>
            <h2 className='tattoo-section-title'>
              Featured{' '}
              <span className='relative text-gradient-red'>
                Work
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph mx-auto max-w-2xl'>
              Browse through some of my best tattoo creations and get inspired for your next piece
            </p>
          </div>

          {/* Client-side only Gallery Grid with fallback */}
          <ClientOnly>
            <GalleryGrid />
          </ClientOnly>

          <div className='mt-8 text-center'>
            <Button
              className='glow-red rounded-full bg-tattoo-red text-white hover:bg-tattoo-red-dark'
              size='lg'
              asChild
            >
              <Link
                href='/gallery'
                onClick={(e) => {
                  // Stop propagation to prevent any parent handlers from triggering
                  e.stopPropagation()
                }}
              >
                View Full Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tattoo Process Section */}
      <section className='bg-zinc-900 py-8 sm:py-12 md:py-16'>
        <div className='tattoo-container py-8'>
          <div className='mb-8 text-center md:mb-12'>
            <h2 className='tattoo-section-title'>
              My{' '}
              <span className='relative text-gradient-red'>
                Process
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-green/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph mx-auto max-w-2xl'>
              From concept to completion, here is how we will work together to create your perfect
              tattoo
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3'>
            <div className='tattoo-card border-l-4 border-tattoo-red'>
              <div className='mb-3 text-3xl font-bold text-tattoo-red sm:mb-4 sm:text-4xl'>01</div>
              <h3 className='mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl'>Consultation</h3>
              <p className='text-sm text-tattoo-white/80 sm:text-base'>
                We will discuss your ideas, placement, size, and design elements to create a concept
                that perfectly matches your vision.
              </p>
            </div>

            <div className='tattoo-card border-l-4 border-tattoo-blue'>
              <div className='mb-3 text-3xl font-bold text-tattoo-blue sm:mb-4 sm:text-4xl'>02</div>
              <h3 className='mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl'>Design</h3>
              <p className='text-sm text-tattoo-white/80 sm:text-base'>
                I will create a custom design based on our consultation, with revisions until you are
                completely satisfied with the artwork.
              </p>
            </div>

            <div className='tattoo-card border-l-4 border-tattoo-green'>
              <div className='mb-3 text-3xl font-bold text-tattoo-green sm:mb-4 sm:text-4xl'>03</div>
              <h3 className='mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl'>Tattooing</h3>
              <p className='text-sm text-tattoo-white/80 sm:text-base'>
                Using premium equipment and inks, I will bring your design to life with meticulous
                attention to detail and your comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with shadcn/ui */}
      <section className='bg-tattoo-black py-8 sm:py-12 md:py-16 relative overflow-hidden'>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-tattoo-red/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-tattoo-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className='tattoo-container py-8'>
          <div className='mb-12 text-center'>
            <h2 className='tattoo-section-title'>
              Client{' '}
              <span className='relative text-tattoo-red'>
                Testimonials
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph mx-auto max-w-2xl'>
              What my clients say about their tattoo experience
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-zinc-900 border-zinc-800 shadow-xl">
                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <Avatar className="h-12 w-12 border-2 border-tattoo-red/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-tattoo-red text-white text-lg font-bold">J</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">James Rodriguez</CardTitle>
                      <CardDescription className="text-zinc-400">Full Sleeve</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex space-x-1 text-tattoo-red">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <Separator className="bg-zinc-800" />
                    <blockquote className="italic text-tattoo-white/80 text-sm sm:text-base pt-2">
                      &quot;Fernando&apos;s attention to detail is incredible. He took my concept and transformed it
                      into something better than I could have imagined. The entire process was comfortable
                      and professional.&quot;
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full bg-zinc-900 border-zinc-800 shadow-xl">
                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <Avatar className="h-12 w-12 border-2 border-tattoo-red/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-tattoo-red text-white text-lg font-bold">M</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">Maria Chen</CardTitle>
                      <CardDescription className="text-zinc-400">Back Piece</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex space-x-1 text-tattoo-red">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <Separator className="bg-zinc-800" />
                    <blockquote className="italic text-tattoo-white/80 text-sm sm:text-base pt-2">
                      &quot;I was nervous about getting such a large piece, but Fernando made me feel at ease
                      throughout the entire process. His black and grey work is unmatched, and I could not
                      be happier with my tattoo.&quot;
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 3 - Added New */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card className="h-full bg-zinc-900 border-zinc-800 shadow-xl">
                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <Avatar className="h-12 w-12 border-2 border-tattoo-red/20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-tattoo-red text-white text-lg font-bold">D</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">David Thompson</CardTitle>
                      <CardDescription className="text-zinc-400">Chest Piece</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex space-x-1 text-tattoo-red">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <Separator className="bg-zinc-800" />
                    <blockquote className="italic text-tattoo-white/80 text-sm sm:text-base pt-2">
                      &quot;The detail in my chest piece is mind-blowing. Fernando has a unique ability to bring ideas to life.
                      Six months later and I am still getting compliments every time I show it off.&quot;
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/about#testimonials">
                Read More Reviews
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with Accordion */}
      <section className='bg-zinc-900 py-8 sm:py-12 md:py-16 relative'>
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-tattoo-red/5 rounded-full blur-3xl pointer-events-none opacity-30"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-tattoo-blue/5 rounded-full blur-3xl pointer-events-none opacity-30"></div>

        <div className='tattoo-container py-8'>
          <div className='mb-10 text-center md:mb-12'>
            <h2 className='tattoo-section-title'>
              Frequently{' '}
              <span className='relative text-tattoo-red'>
                Asked Questions
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph mx-auto max-w-2xl'>
              Everything you need to know before getting tattooed
            </p>
          </div>

          <div className='mx-auto max-w-3xl'>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="pricing" className="border-zinc-800 bg-black/50 rounded-lg px-2 shadow-lg">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-tattoo-red py-5">
                  How much do tattoos cost?
                </AccordionTrigger>
                <AccordionContent className="text-tattoo-white/80 pb-4 pt-1">
                  Pricing depends on size, detail, and placement. Small pieces start at $150, while
                  larger custom work is priced by the hour at $180/hr. After our consultation, I will
                  provide you with a detailed quote before we proceed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="booking" className="border-zinc-800 bg-black/50 rounded-lg px-2 shadow-lg">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-tattoo-red py-5">
                  How do I book an appointment?
                </AccordionTrigger>
                <AccordionContent className="text-tattoo-white/80 pb-4 pt-1">
                  You can book a consultation through the website or contact me directly. A deposit is
                  required to secure your appointment. This deposit goes toward the final cost of your tattoo
                  and helps me reserve the time needed for your piece.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="coverups" className="border-zinc-800 bg-black/50 rounded-lg px-2 shadow-lg">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-tattoo-red py-5">
                  Do you do cover-ups?
                </AccordionTrigger>
                <AccordionContent className="text-tattoo-white/80 pb-4 pt-1">
                  Yes, I specialize in transforming old or unwanted tattoos into new designs you will
                  love. Cover-ups require a consultation to assess the existing tattoo. I will evaluate factors
                  like ink density, color, and age to create the best possible cover-up solution.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="preparation" className="border-zinc-800 bg-black/50 rounded-lg px-2 shadow-lg">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-tattoo-red py-5">
                  How should I prepare for my session?
                </AccordionTrigger>
                <AccordionContent className="text-tattoo-white/80 pb-4 pt-1">
                  Get plenty of rest, stay hydrated, eat before your appointment, and avoid alcohol
                  for 24 hours prior to your session. Wear comfortable clothing that provides easy access
                  to the area being tattooed. Bring snacks and entertainment for longer sessions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="aftercare" className="border-zinc-800 bg-black/50 rounded-lg px-2 shadow-lg">
                <AccordionTrigger className="text-lg font-bold text-white hover:text-tattoo-red py-5">
                  What aftercare is required?
                </AccordionTrigger>
                <AccordionContent className="text-tattoo-white/80 pb-4 pt-1">
                  I will provide detailed aftercare instructions tailored to your specific tattoo. Generally,
                  you will need to keep the area clean, apply recommended ointment, avoid direct sunlight,
                  and stay away from pools, hot tubs, and saunas during the healing process (2-3 weeks).
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className='mt-10 text-center'>
              <Button className='bg-tattoo-red text-white hover:bg-tattoo-red-dark' asChild>
                <Link href='/faq'>
                  View All FAQs
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with Parallax Effect */}
      <section className='relative overflow-hidden'>
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-tattoo-red z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute inset-0 opacity-20"
          >
            <Image
              src="/images/IMG_4284.JPG"
              alt="Background tattoo artwork"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-tattoo-red via-tattoo-red/95 to-tattoo-red/90"></div>
        </div>

        <div className='relative z-10 tattoo-container py-16 md:py-20'>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className='lg:w-2/3 text-center lg:text-left'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='mb-4 text-4xl font-bold text-shadow-bold sm:text-5xl md:text-6xl'
              >
                Ready To Get <span className='font-extrabold text-black'>Inked?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='mb-6 text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto lg:mx-0'
              >
                Contact me today to discuss your ideas and schedule a consultation
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='lg:w-1/3 w-full'
            >
              <Card className="bg-black/30 backdrop-blur-md border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Get Started Now</CardTitle>
                  <CardDescription className="text-white/70">Fill out the form below for a quick response</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input id="name" placeholder="Your name" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message</Label>
                      <Textarea id="message" placeholder="Tell me about your tattoo idea" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[80px]" />
                    </div>
                    <Button className="w-full bg-black text-white border-2 border-white hover:bg-black/80">
                      Submit Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Top wave decoration */}
        <div className="absolute top-0 left-0 right-0 h-16 rotate-180 z-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#0a0a0a" fillOpacity="1" d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,144C672,117,768,107,864,122.7C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </main>
  )
}
