'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/contact-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Mail,
  Clock,
  Instagram,
  MapPin,
  MessageSquare,
  Calendar,
  FileQuestion,
  CheckCircle2,
  Facebook,
  Copy,
  ExternalLink,
} from 'lucide-react'

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [preferredContact, setPreferredContact] = useState('email')
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  // Copy to clipboard function
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(null), 2000)
    })
  }

  // FAQ items with animated disclosure
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Social media links
  const socialLinks = [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/fernando_tattoos',
      username: '@fernando_tattoos',
      icon: <Instagram className='w-5 h-5' />,
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/fernandotattoostudio',
      username: 'Fernando Tattoo Studio',
      icon: <Facebook className='w-5 h-5' />,
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@fernando_ink',
      username: '@fernando_ink',
      icon: (
        <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z' />
        </svg>
      ),
    },
  ]

  const faqs = [
    {
      question: 'How do I book a consultation with you?',
      answer:
        "You can book a consultation directly through the website's booking form, or by contacting me via email. I recommend sharing any reference images or ideas you have for your tattoo when reaching out.",
    },
    {
      question: 'Do you require a deposit?',
      answer:
        'Yes, I require a non-refundable deposit to secure your appointment, which is then applied to your final tattoo cost. This ensures commitment and helps me prepare adequately for your session.',
    },
    {
      question: 'How far in advance should I book?',
      answer:
        'For small pieces, booking 2-4 weeks in advance is usually sufficient. For larger custom work, I recommend booking at least 1-2 months ahead as my schedule fills up quickly.',
    },
    {
      question: 'How do you price your tattoos?',
      answer:
        'My pricing is based on size, detail, placement, and estimated time. Small pieces start at $150, while larger custom work is priced at $180/hour. I provide a specific quote after our consultation.',
    },
  ]

  return (
    <main className='bg-tattoo-black min-h-screen'>
      {/* Hero Section - Side by Side Layout */}
      <section className='relative bg-tattoo-black overflow-hidden' ref={containerRef}>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[70vh] relative z-10'>
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
                className='tattoo-script text-3xl text-tattoo-red mb-4 text-center lg:text-left'
              >
                Get in Touch
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className='tattoo-heading text-shadow-bold mb-6 tracking-wider uppercase text-center lg:text-left'
              >
                Let's Talk About Your{' '}
                <span className='relative inline-block'>
                  Vision
                  <span className='absolute -bottom-2 left-0 right-0 h-2 bg-tattoo-red'></span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
                className='text-xl md:text-2xl text-tattoo-white/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-center lg:text-left'
              >
                Whether you have questions about the tattoo process or want to discuss your ideas,
                I'm here to help bring your vision to life.
              </motion.p>

              <div className='space-y-5 text-tattoo-white/90 mb-8 hidden lg:block'>
                <div className='flex items-center gap-3 group'>
                  <div className='w-10 h-10 rounded-full bg-tattoo-red/10 flex items-center justify-center group-hover:bg-tattoo-red/20 transition-colors'>
                    <Mail className='w-5 h-5 text-tattoo-red' />
                  </div>
                  <div>
                    <p className='text-sm text-tattoo-white/60'>Email</p>
                    <div className='flex items-center'>
                      <p className='text-tattoo-white group-hover:text-tattoo-red transition-colors'>
                        info@fernandogovea.com
                      </p>
                      <button
                        onClick={() => copyToClipboard('info@fernandogovea.com', 'email')}
                        className='ml-2 text-tattoo-white/40 hover:text-tattoo-red transition-colors'
                        aria-label='Copy email address'
                      >
                        {copySuccess === 'email' ? (
                          <CheckCircle2 className='w-4 h-4' />
                        ) : (
                          <Copy className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3 group'>
                  <div className='w-10 h-10 rounded-full bg-tattoo-red/10 flex items-center justify-center group-hover:bg-tattoo-red/20 transition-colors'>
                    <MapPin className='w-5 h-5 text-tattoo-red' />
                  </div>
                  <div>
                    <p className='text-sm text-tattoo-white/60'>Location</p>
                    <p className='text-tattoo-white group-hover:text-tattoo-red transition-colors'>
                      Dallas/Fort Worth Area, TX
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-3 group'>
                  <div className='w-10 h-10 rounded-full bg-tattoo-red/10 flex items-center justify-center group-hover:bg-tattoo-red/20 transition-colors'>
                    <Clock className='w-5 h-5 text-tattoo-red' />
                  </div>
                  <div>
                    <p className='text-sm text-tattoo-white/60'>Business Hours</p>
                    <p className='text-tattoo-white group-hover:text-tattoo-red transition-colors'>
                      Tuesday-Saturday: 11AM-7PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Section with Contact Form */}
          <div className='relative lg:h-auto z-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='relative bg-zinc-900/60 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-2xl border border-white/10 mx-4 lg:mx-0 lg:mr-12 mt-0 lg:mt-12'
            >
              <h2 className='text-xl font-bold text-white mb-6 relative z-10'>Send a Message</h2>

              <div className='relative z-10'>
                <ContactForm onSubmitSuccess={() => setFormSubmitted(true)} />
              </div>

              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-lg z-30'
                  >
                    <CheckCircle2 className='text-tattoo-red w-16 h-16 mb-4' />
                    <h3 className='text-2xl font-bold text-white mb-2'>Message Sent!</h3>
                    <p className='text-tattoo-white/70 text-center max-w-xs mb-6'>
                      Thanks for reaching out. I'll get back to you within 24-48 hours.
                    </p>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      className='bg-tattoo-red text-white hover:bg-tattoo-red/90'
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className='absolute bottom-0 left-0 right-0 h-16 sm:h-24 z-0'>
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
      <div className='container max-w-7xl mx-auto px-4 py-12 relative z-10'>
        {/* Contact Info for Mobile */}
        <div className='lg:hidden mb-16'>
          <h2 className='tattoo-section-title mb-8 text-center'>
            Contact{' '}
            <span className='text-tattoo-red relative'>
              Information
              <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
            </span>
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='bg-tattoo-black/50 border border-tattoo-white/10 rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 text-center'
            >
              <div className='w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center mx-auto mb-4'>
                <Mail className='w-5 h-5 text-tattoo-red' />
              </div>
              <h3 className='text-lg font-bold text-tattoo-white mb-1'>Email</h3>
              <div className='flex items-center justify-center gap-1'>
                <p className='text-tattoo-white/70'>info@fernandogovea.com</p>
                <button
                  onClick={() => copyToClipboard('info@fernandogovea.com', 'email-mobile')}
                  className='text-tattoo-white/40 hover:text-tattoo-red transition-colors'
                  aria-label='Copy email address'
                >
                  {copySuccess === 'email-mobile' ? (
                    <CheckCircle2 className='w-4 h-4' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-tattoo-black/50 border border-tattoo-white/10 rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 text-center'
            >
              <div className='w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center mx-auto mb-4'>
                <MapPin className='w-5 h-5 text-tattoo-red' />
              </div>
              <h3 className='text-lg font-bold text-tattoo-white mb-1'>Location</h3>
              <p className='text-tattoo-white/70'>Dallas/Fort Worth Area, TX</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-tattoo-black/50 border border-tattoo-white/10 rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 text-center'
            >
              <div className='w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center mx-auto mb-4'>
                <Clock className='w-5 h-5 text-tattoo-red' />
              </div>
              <h3 className='text-lg font-bold text-tattoo-white mb-1'>Business Hours</h3>
              <p className='text-tattoo-white/70'>Tuesday-Saturday: 11AM-7PM</p>
            </motion.div>
          </div>
        </div>

        {/* Social Media Section - Enhanced with cards */}
        <section className='mb-20 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='tattoo-section-title'>
              Connect On{' '}
              <span className='text-tattoo-blue relative'>
                Social Media
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-blue/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Follow my work and reach out through your preferred platform
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group relative overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6 hover:border-tattoo-red/30 transition-colors duration-300'
              >
                <div className='flex items-center gap-4 mb-4'>
                  <div className={`w-12 h-12 rounded-full bg-${link.platform === 'Instagram' ? 'pink' : link.platform === 'Facebook' ? 'blue' : 'black'}-600/20 flex items-center justify-center`}>
                    {link.icon}
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-tattoo-white group-hover:text-tattoo-red transition-colors'>
                      {link.platform}
                    </h3>
                    <p className='text-tattoo-white/70'>{link.username}</p>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-tattoo-white/50'>Follow for updates</span>
                  <ExternalLink className='w-5 h-5 text-tattoo-white/50 group-hover:text-tattoo-red transition-colors' />
                </div>

                {/* Decorative gradient circle */}
                <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-tr from-black to-tattoo-red/30 rounded-full opacity-30 group-hover:opacity-50 transition-opacity'></div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className='mb-20 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='tattoo-section-title'>
              Quick Contact{' '}
              <span className='text-tattoo-red relative'>
                Options
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Choose the most convenient way to get in touch
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 text-center relative z-10'
            >
              <div className='w-16 h-16 rounded-full bg-tattoo-red/10 flex items-center justify-center mx-auto mb-4'>
                <MessageSquare className='w-7 h-7 text-tattoo-red' />
              </div>
              <h3 className='text-xl font-bold text-tattoo-white mb-2'>General Inquiries</h3>
              <p className='text-tattoo-white/70 mb-6'>
                Questions about services, pricing, or policies
              </p>
              <Link href='#contact-form'>
                <Button className='bg-tattoo-red text-white hover:bg-tattoo-red/90 w-full relative z-10'>
                  Send a Message
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 text-center'
            >
              <div className='w-16 h-16 rounded-full bg-tattoo-red/10 flex items-center justify-center mx-auto mb-4'>
                <Calendar className='w-7 h-7 text-tattoo-red' />
              </div>
              <h3 className='text-xl font-bold text-tattoo-white mb-2'>Book a Consultation</h3>
              <p className='text-tattoo-white/70 mb-6'>
                Ready to discuss your tattoo ideas in person
              </p>
              <Link href='/book'>
                <Button className='bg-tattoo-red text-white hover:bg-tattoo-red/90 w-full'>
                  Book Now
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-lg p-6 hover:border-tattoo-red/30 transition-all duration-300 text-center'
            >
              <div className='w-16 h-16 rounded-full bg-tattoo-red/10 flex items-center justify-center mx-auto mb-4'>
                <FileQuestion className='w-7 h-7 text-tattoo-red' />
              </div>
              <h3 className='text-xl font-bold text-tattoo-white mb-2'>FAQ</h3>
              <p className='text-tattoo-white/70 mb-6'>Find answers to common questions</p>
              <a href='#faqs'>
                <Button
                  variant='outline'
                  className='w-full border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5'
                >
                  View FAQs
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id='faqs' className='mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='tattoo-section-title'>
              Frequently Asked{' '}
              <span className='text-tattoo-red relative'>
                Questions
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Quick answers to common inquiries
            </p>
          </motion.div>

          <div className='max-w-3xl mx-auto space-y-4'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden'
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className='w-full px-6 py-4 text-left flex justify-between items-center'
                >
                  <h3 className='text-lg font-medium text-tattoo-white hover:text-tattoo-red transition-colors'>
                    {faq.question}
                  </h3>
                  <div
                    className={`transform transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      className='w-5 h-5 text-tattoo-red'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='overflow-hidden'
                    >
                      <div className='px-6 pb-4 text-tattoo-white/70'>{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Map & Location - Optional */}
        <section className='mb-20'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'
          >
            <h2 className='tattoo-section-title'>
              Studio{' '}
              <span className='text-tattoo-blue relative'>
                Location
                <span className='absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-blue/80'></span>
              </span>
            </h2>
            <p className='tattoo-paragraph max-w-2xl mx-auto'>
              Based in the Dallas/Fort Worth area, serving clients throughout Texas
            </p>
          </motion.div>

          <div className='relative h-[400px] rounded-xl overflow-hidden shadow-lg border border-white/10'>
            <Image
              src='/images/IMG_2947.JPG'
              alt='Tattoo Studio'
              fill
              className='object-cover opacity-40'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-tattoo-black/80'></div>

            <div className='absolute bottom-0 left-0 right-0 p-8 text-center'>
              <h3 className='text-xl font-bold text-white mb-2'>Ink 37 Studio</h3>
              <p className='text-white/80 mb-6'>Dallas/Fort Worth Metropolitan Area, Texas</p>
              <p className='text-white/60 mb-2 text-sm'>
                Address provided upon booking confirmation
              </p>
              <Button
                asChild
                className='bg-tattoo-red hover:bg-tattoo-red/90 text-white'
              >
                <Link href='/book'>
                  Book an Appointment
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
