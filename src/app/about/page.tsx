'use client';

import React from 'react';
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Slot } from '@radix-ui/react-slot'
import { Badge } from '@/components/ui/badge'
import { Brush, BookOpen, Award, Clock, MapPin, Instagram } from 'lucide-react'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize scroll tracking without using the return value
  useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Artist specialties with descriptions
  const specialties = [
    {
      title: 'Black & Gray Realism',
      icon: <Brush className='w-5 h-5 text-tattoo-red' />,
      description:
        'Specializing in hyper-realistic portraits and detailed black & gray work that captures the essence of my subjects with precision shading techniques.',
    },
    {
      title: 'Japanese Traditional',
      icon: <BookOpen className='w-5 h-5 text-tattoo-red' />,
      description:
        'Creating contemporary adaptations of traditional Japanese tattoo art with my own stylistic approach, honoring the rich history while bringing modern elements.',
    },
    {
      title: 'Fine Linework',
      icon: <Award className='w-5 h-5 text-tattoo-red' />,
      description:
        'Delicate, precise linework for minimalist designs and intricate geometric patterns that stand the test of time.',
    },
  ]

  // Career milestones
  const milestones = [
    { year: '2010', event: 'Began apprenticeship in Dallas, Texas' },
    { year: '2013', event: 'Opened my first studio space' },
    { year: '2016', event: 'Featured in International Tattoo Magazine' },
    { year: '2018', event: 'Won Best Black & Gray award at Texas Tattoo Convention' },
    { year: '2020', event: 'Started mentoring aspiring tattoo artists' },
    { year: '2023', event: 'Launched expanded studio in Dallas/Fort Worth area' },
  ]

  // Using useState to implement a modal/feature highlight
  const [highlightedSpecialty, setHighlightedSpecialty] = useState<number | null>(null)

  return (
    <main className='bg-tattoo-black min-h-screen'>
      {/* Hero Section - Side by Side Layout */}
      <section className='relative bg-tattoo-black overflow-hidden' ref={containerRef}>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[80vh]'>
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
                The Artist
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
                className='text-xl md:text-2xl text-tattoo-white/90 max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed text-center lg:text-left'
              >
                Custom tattoo artist specializing in Black & Gray Realism, Japanese Traditional, and
                Fine Linework with over 13 years of experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='flex gap-3 mb-8 justify-center lg:justify-start'
              >
                <Badge className='bg-tattoo-black/30 text-tattoo-white border-tattoo-white/10 px-3 py-1.5'>
                  <MapPin className='w-3.5 h-3.5 mr-1' /> Dallas/Fort Worth, TX
                </Badge>
                <Badge className='bg-tattoo-black/30 text-tattoo-white border-tattoo-white/10 px-3 py-1.5'>
                  <Clock className='w-3.5 h-3.5 mr-1' /> 10+ Years Experience
                </Badge>
              </motion.div>

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
              {/* Main Artist Image */}
              <Image
                src='/images/IMG_4249.JPG'
                alt='Fernando Govea - Tattoo Artist'
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
                  src='/images/IMG_3947.JPG'
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
                  src='/images/IMG_4284.JPG'
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

      {/* Main Content */}
      <div className='container max-w-7xl mx-auto px-4 py-12'>
        {/* Artist Story Section */}
        <section className='mb-24'>
          <div className='flex flex-col lg:flex-row gap-12 items-center'>
            <div className='lg:w-2/5'>
              <motion.div
                className='relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl'
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src='/images/IMG_4246.JPG'
                  alt='Fernando Govea at work'
                  fill
                  className='object-cover'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-tattoo-black to-transparent h-1/3'></div>
                <div className='absolute bottom-4 left-4 flex gap-2'>
                  <Badge className='bg-tattoo-red border-none text-white'>Founder</Badge>
                  <Badge className='bg-tattoo-blue border-none text-white'>Lead Artist</Badge>
                </div>
              </motion.div>
            </div>

            <div className='lg:w-3/5'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className='tattoo-section-title'>
                  My{' '}
                  <span className='text-tattoo-red relative'>
                    Journey
                    <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
                  </span>
                </h2>

                <div className='space-y-6 text-tattoo-white/80 text-lg'>
                  <p>
                    With over a decade of experience in the art of tattooing, my passion for
                    creating permanent art began when I was just a teenager sketching designs for
                    friends. What started as a creative outlet evolved into an apprenticeship in
                    2010, where I honed my skills under the guidance of respected artists in the
                    Dallas tattoo scene.
                  </p>

                  <p>
                    My approach to tattooing is deeply personal – I believe each piece should not
                    only be visually striking but also meaningful to the wearer. I specialize in
                    creating custom designs that reflect my client&apos;s unique stories and aesthetic
                    preferences, with particular expertise in black and gray realism, Japanese
                    traditional styles, and precise fine linework.
                  </p>

                  <p>
                    Throughout my career, I have been fortunate to work with clients from all walks of
                    life, each bringing their own narratives and ideas to the table. This diverse
                    clientele has allowed me to develop a versatile style while maintaining the
                    technical precision that has become my signature.
                  </p>
                </div>

                <div className='mt-8 flex gap-4'>
                  <Link href='/gallery'>
                    <Button className='bg-tattoo-red hover:bg-tattoo-red/90 text-white'>
                      View My Work
                    </Button>
                  </Link>
                  <Link href='/book'>
                    <Button
                      variant='outline'
                      className='border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5'
                    >
                      Book a Consultation
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className='mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='tattoo-section-title'>
              My{' '}
              <span className='text-tattoo-blue relative'>
                Specialties
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-blue/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Areas of expertise where I have developed my signature style and techniques
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-tattoo-black/50 border ${highlightedSpecialty === index ? 'border-tattoo-red' : 'border-tattoo-white/10'} rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 cursor-pointer`}
                onClick={() => setHighlightedSpecialty(index)}
              >
                <div className='w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center mb-4'>
                  <Slot>{specialty.icon}</Slot>
                </div>
                <h3 className='text-xl font-bold text-tattoo-white mb-3'>{specialty.title}</h3>
                <p className='text-tattoo-white/70'>{specialty.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className='mb-24 relative overflow-hidden rounded-xl shadow-xl'>
          <div className='absolute inset-0 z-0'>
            <Image
              src='/images/IMG_3896.JPG'
              alt='Tattoo artwork by Fernando Govea'
              fill
              className='object-cover opacity-25'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-tattoo-black via-tattoo-black/80 to-tattoo-black/60'></div>
          </div>

          <div className='relative z-10 py-20 px-8 md:px-16'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='max-w-3xl mx-auto text-center'
            >
              <h2 className='tattoo-section-title mb-12'>
                My{' '}
                <span className='text-tattoo-red relative'>
                  Philosophy
                  <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
                </span>
              </h2>

              <p className='text-2xl md:text-3xl text-tattoo-white/90 mb-10 font-light italic leading-relaxed tracking-wide'>
                &quot;A tattoo is more than ink on skin – it&apos;s a permanent expression of your journey,
                your values, and your aesthetic. My goal is to create art that you&apos;ll carry with
                pride for a lifetime.&quot;
              </p>

              <div className="w-24 h-1 bg-tattoo-red/60 mx-auto mb-10 rounded-full"></div>

              <p className='text-lg md:text-xl text-tattoo-white/80 max-w-2xl mx-auto leading-relaxed'>
                I approach each tattoo with meticulous attention to detail, prioritizing both the
                artistic integrity of the design and the comfort of my clients throughout the
                process. I believe in creating a collaborative experience where your vision meets my
                technical expertise to produce something truly unique.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className='mb-24'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'
          >
            <h2 className='tattoo-section-title'>
              Career{' '}
              <span className='text-tattoo-blue relative'>
                Milestones
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-blue/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Key moments in my journey as a tattoo artist
            </p>
          </motion.div>

          <div className='relative'>
            {/* Timeline line */}
            <div className='absolute top-0 bottom-0 left-1/2 w-0.5 bg-tattoo-red/40 transform -translate-x-1/2 hidden md:block'></div>

            <div className='space-y-16'>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0 items-center`}
                >
                  <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'}`}>
                    <div
                      className={`p-6 bg-tattoo-black/60 border border-tattoo-white/10 rounded-lg ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      } shadow-lg hover:border-tattoo-red/20 transition-all duration-300 md:w-[85%]`}
                    >
                      <h3 className='text-2xl font-bold text-tattoo-white mb-3'>{milestone.year}</h3>
                      <p className='text-tattoo-white/90 text-lg'>{milestone.event}</p>
                    </div>
                  </div>

                  <div className='relative rounded-full bg-tattoo-red w-6 h-6 z-10 hidden md:flex items-center justify-center'>
                    <div className='absolute rounded-full bg-tattoo-black w-2 h-2'></div>
                  </div>

                  <div className='md:w-1/2 md:pl-12 hidden md:block'></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='mb-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-tattoo-red/90 to-tattoo-red-dark/90 rounded-xl overflow-hidden shadow-lg'
          >
            <div className='p-8 md:p-12 text-center'>
              <h2 className='tattoo-heading text-shadow-bold mb-6 text-white'>
                Ready to Start Your <span className='text-tattoo-black'>Tattoo Journey?</span>
              </h2>
              <p className='text-white/90 text-xl max-w-2xl mx-auto mb-10'>
                Whether you have a specific design in mind or just an idea that needs refining, I&apos;d
                love to help bring your vision to life.
              </p>

                <Link href='/book'>
                  <Button
                    size='lg'
                    className='bg-tattoo-black text-white hover:bg-tattoo-black/80'
                  >
                    Book a Consultation
                  </Button>
                </Link>
                <Link href='/gallery'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='border-white text-white hover:bg-white/10 ml-4'
                  >
                    Explore My Portfolio
                  </Button>
                </Link>

              <div className='mt-8 flex items-center justify-center gap-6'>
                <a
                  href='https://instagram.com/fernando_tattoos'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white hover:text-white/80 flex items-center gap-2'
                >
                  <Instagram className='w-5 h-5' />
                  <span>@fernando_tattoos</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
