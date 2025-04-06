'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/forms/contact-form'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Phone,
  FileImage,
  Share2,
  Facebook,
  Copy,
  ExternalLink
} from 'lucide-react'

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
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
      icon: <Instagram className="w-5 h-5" />
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/fernandotattoostudio',
      username: 'Fernando Tattoo Studio',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@fernando_ink',
      username: '@fernando_ink',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
    }
  ]

  const faqs = [
    {
      question: "How do I book a consultation with you?",
      answer: "You can book a consultation directly through the website's booking form, or by contacting me via email. I recommend sharing any reference images or ideas you have for your tattoo when reaching out."
    },
    {
      question: "Do you require a deposit?",
      answer: "Yes, I require a non-refundable deposit to secure your appointment, which is then applied to your final tattoo cost. This ensures commitment and helps me prepare adequately for your session."
    },
    {
      question: "How far in advance should I book?",
      answer: "For small pieces, booking 2-4 weeks in advance is usually sufficient. For larger custom work, I recommend booking at least 1-2 months ahead as my schedule fills up quickly."
    },
    {
      question: "How do you price your tattoos?",
      answer: "My pricing is based on size, detail, placement, and estimated time. Small pieces start at $150, while larger custom work is priced at $180/hour. I provide a specific quote after our consultation."
    },
    {
      question: "Do you do cover-ups?",
      answer: "Yes, I specialize in transformative cover-ups. These require a detailed in-person consultation to assess the existing tattoo and discuss realistic options that will work best for your situation."
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Please bring a valid ID, wear comfortable clothing that provides easy access to the tattoo area, and make sure you've eaten before coming in. Any additional reference materials are also welcome."
    },
    {
      question: "How should I prepare for my tattoo session?",
      answer: "Get a good night's sleep, eat a substantial meal beforehand, stay hydrated (but limit caffeine), avoid alcohol for 24 hours prior, and wear appropriate clothing for your tattoo location."
    },
    {
      question: "Do you offer touch-ups?",
      answer: "Yes, I offer complimentary touch-ups within 3 months of your original session if needed. After that period, touch-ups are charged at a reduced hourly rate depending on the work required."
    }
  ]

  return (
    <main className="bg-tattoo-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden" ref={containerRef}>
        <div className="absolute inset-0 z-10">
          <motion.div style={{ opacity, scale }} className="h-full w-full">
            <Image
              src="/images/IMG_2947.JPG"
              alt="Fernando Govea's tattoo workspace"
              fill
              className="object-cover object-center opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-tattoo-black/80"></div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/70 via-tattoo-black/60 to-tattoo-black"></div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-script text-3xl text-tattoo-red mb-6"
          >
            Get in Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="tattoo-heading text-shadow-bold mb-6 tracking-wider uppercase"
          >
            Contact <span className="text-tattoo-red relative">
              Me
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-tattoo-red/80"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-xl md:text-2xl text-tattoo-white/90 max-w-3xl mb-6 leading-relaxed"
          >
            Share your ideas and let's create something unique together
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 mt-4"
          >
            <Button asChild className="bg-tattoo-red hover:bg-tattoo-red/90 text-white px-6 py-2">
              <a href="#contact-section">Get Started</a>
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#0a0a0a" fillOpacity="1" d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,80C840,96,960,96,1080,80C1200,64,1320,32,1380,16L1440,0L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-24" id="contact-section">
        {/* Contact Preference Selection */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-tattoo-black/80 to-tattoo-black p-8 md:p-10 rounded-2xl border border-tattoo-white/10 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-tattoo-white mb-8 text-center">How would you prefer to connect?</h3>

            <RadioGroup
              value={preferredContact}
              onValueChange={setPreferredContact}
              className="flex flex-wrap justify-center gap-6"
            >
              <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg
                ${preferredContact === 'email'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10 shadow-tattoo-red/20 shadow-md'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="email" id="contact-email" className="sr-only" />
                <Label
                  htmlFor="contact-email"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${preferredContact === 'email' ? 'bg-tattoo-red/20' : 'bg-tattoo-white/5'}`}
                  >
                    <Mail className={`w-8 h-8 ${preferredContact === 'email' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  </motion.div>
                  <span className={`font-bold text-lg mb-2 ${preferredContact === 'email' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Email</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Detailed responses</span>
                </Label>
              </div>

              <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg
                ${preferredContact === 'form'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10 shadow-tattoo-red/20 shadow-md'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="form" id="contact-form" className="sr-only" />
                <Label
                  htmlFor="contact-form"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${preferredContact === 'form' ? 'bg-tattoo-red/20' : 'bg-tattoo-white/5'}`}
                  >
                    <MessageSquare className={`w-8 h-8 ${preferredContact === 'form' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  </motion.div>
                  <span className={`font-bold text-lg mb-2 ${preferredContact === 'form' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Contact Form</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Upload images</span>
                </Label>
              </div>

              <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg
                ${preferredContact === 'social'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10 shadow-tattoo-red/20 shadow-md'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="social" id="contact-social" className="sr-only" />
                <Label
                  htmlFor="contact-social"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${preferredContact === 'social' ? 'bg-tattoo-red/20' : 'bg-tattoo-white/5'}`}
                  >
                    <Instagram className={`w-8 h-8 ${preferredContact === 'social' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  </motion.div>
                  <span className={`font-bold text-lg mb-2 ${preferredContact === 'social' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Social Media</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Quick DMs</span>
                </Label>
              </div>

              <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg
                ${preferredContact === 'booking'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10 shadow-tattoo-red/20 shadow-md'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="booking" id="contact-booking" className="sr-only" />
                <Label
                  htmlFor="contact-booking"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${preferredContact === 'booking' ? 'bg-tattoo-red/20' : 'bg-tattoo-white/5'}`}
                  >
                    <Calendar className={`w-8 h-8 ${preferredContact === 'booking' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  </motion.div>
                  <span className={`font-bold text-lg mb-2 ${preferredContact === 'booking' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Book Directly</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Skip to booking</span>
                </Label>
              </div>
            </RadioGroup>
          </motion.div>
        </section>

        {/* Contact Information + Form Section */}
        <section className="mb-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Info Column */}
            <motion.div
              className="lg:w-2/5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="tattoo-section-title">
                Reach <span className="text-tattoo-red relative">
                  Out
                  <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
                </span>
              </h2>

              <div className="space-y-8 mt-8">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-5 bg-tattoo-black/20 p-5 rounded-xl border border-tattoo-white/5 hover:border-tattoo-red/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-tattoo-white mb-2">Email</h3>
                    <p className="text-tattoo-white/70 mb-3">For inquiries and appointments</p>
                    <div className="flex items-center">
                      <a href="mailto:fennyg83@gmail.com" className="text-tattoo-red hover:text-tattoo-red/80 transition-colors text-lg">
                        fennyg83@gmail.com
                      </a>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard('fennyg83@gmail.com', 'Email')}
                        className="ml-3 text-tattoo-red hover:text-tattoo-red/80 transition-colors bg-tattoo-red/5 p-2 rounded-full"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      {copySuccess === 'Email' && (
                        <motion.span
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-2 text-tattoo-green bg-tattoo-green/5 px-2 py-1 rounded text-sm"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-5 bg-tattoo-black/20 p-5 rounded-xl border border-tattoo-white/5 hover:border-tattoo-red/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-tattoo-white mb-2">Location</h3>
                    <p className="text-tattoo-white/70 mb-3">Private studio by appointment only</p>
                    <p className="text-tattoo-white/90 text-lg">Dallas/Fort Worth Metroplex, Texas</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-5 bg-tattoo-black/20 p-5 rounded-xl border border-tattoo-white/5 hover:border-tattoo-red/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-tattoo-white mb-2">Working Hours</h3>
                    <p className="text-tattoo-white/70 mb-3">Available for appointments</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg">
                        <span className="text-tattoo-white/80">Tuesday - Saturday:</span>
                        <span className="text-tattoo-white">11:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-tattoo-white/80">Sunday - Monday:</span>
                        <span className="text-tattoo-white">Closed</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-start space-x-5 bg-tattoo-black/20 p-5 rounded-xl border border-tattoo-white/5 hover:border-tattoo-red/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-tattoo-white mb-2">Social Media</h3>
                    <p className="text-tattoo-white/70 mb-3">Follow my latest work</p>
                    <div className="flex items-center">
                      <a
                        href="https://instagram.com/fernando_tattoos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tattoo-red hover:text-tattoo-red/80 transition-colors text-lg"
                      >
                        @fernando_tattoos
                      </a>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard('@fernando_tattoos', 'Instagram')}
                        className="ml-3 text-tattoo-red hover:text-tattoo-red/80 transition-colors bg-tattoo-red/5 p-2 rounded-full"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      {copySuccess === 'Instagram' && (
                        <motion.span
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-2 text-tattoo-green bg-tattoo-green/5 px-2 py-1 rounded text-sm"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12">
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(214, 40, 40, 0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="p-8 border border-tattoo-white/10 rounded-xl bg-gradient-to-br from-tattoo-black to-tattoo-black/80"
                >
                  <h3 className="text-2xl font-bold text-tattoo-white mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-tattoo-red" />
                    Ready to Book?
                  </h3>
                  <p className="text-tattoo-white/80 mb-8 text-lg">
                    If you already have a clear idea of what you want, you can skip straight to booking a consultation.
                  </p>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button asChild className="w-full bg-tattoo-red hover:bg-tattoo-red/90 py-6 text-lg font-medium">
                      <Link href="/book">Book a Consultation</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form Column */}
            <motion.div
              className="lg:w-3/5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Show different contact methods based on user selection */}
              <AnimatePresence mode="wait">
                {preferredContact === 'form' ? (
                  <motion.div
                    key="form-option"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-tattoo-black/40 to-tattoo-black/20 border border-tattoo-white/10 rounded-xl p-8 md:p-10 shadow-lg"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-5">
                        <MessageSquare className="w-6 h-6 text-tattoo-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-tattoo-white">Send Me a Message</h2>
                        <p className="text-tattoo-white/70">I'll get back to you within 24-48 hours</p>
                      </div>
                    </div>

                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-tattoo-blue/10 border border-tattoo-blue/20 rounded-lg p-10 text-center"
                      >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-tattoo-blue/20 mb-6">
                          <CheckCircle2 className="w-10 h-10 text-tattoo-blue" />
                        </div>
                        <h3 className="text-2xl font-bold text-tattoo-white mb-4">Message Sent Successfully!</h3>
                        <p className="text-tattoo-white/80 mb-8 text-lg">
                          Thank you for reaching out. I'll review your message and get back to you as soon as possible.
                        </p>
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => setFormSubmitted(false)}
                            variant="outline"
                            size="lg"
                            className="border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5"
                          >
                            Send Another Message
                          </Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <ContactForm onFormSubmit={() => setFormSubmitted(true)} />
                    )}
                  </motion.div>
                ) : preferredContact === 'email' ? (
                  <motion.div
                    key="email-option"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-tattoo-black/40 to-tattoo-black/20 border border-tattoo-white/10 rounded-xl p-8 md:p-10 h-full flex flex-col shadow-lg"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-5">
                        <Mail className="w-6 h-6 text-tattoo-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-tattoo-white">Email Me Directly</h2>
                        <p className="text-tattoo-white/70">For detailed inquiries and consultations</p>
                      </div>
                    </div>

                    <div className="grow flex flex-col items-center justify-center py-12 text-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-tattoo-red/20 to-tattoo-red/5 flex items-center justify-center mb-8 shadow-lg"
                      >
                        <Mail className="w-12 h-12 text-tattoo-red" />
                      </motion.div>

                      <motion.h3
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-2xl font-bold text-tattoo-white mb-4"
                      >
                        Ready to get in touch?
                      </motion.h3>

                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-tattoo-white/80 mb-8 max-w-md text-lg"
                      >
                        Send me an email with your ideas, questions, or to schedule a consultation. I'm always excited to discuss new projects!
                      </motion.p>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative group inline-block"
                      >
                        <p className="text-2xl text-tattoo-red font-medium mb-6 group-hover:text-tattoo-red/80 transition-colors">
                          fennyg83@gmail.com
                        </p>
                        {copySuccess === 'EmailDirect' && (
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-tattoo-green text-sm bg-tattoo-black/70 px-3 py-1 rounded-full"
                          >
                            Copied!
                          </motion.span>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex gap-6"
                      >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={() => copyToClipboard('fennyg83@gmail.com', 'EmailDirect')}
                            variant="outline"
                            size="lg"
                            className="border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5"
                          >
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Email Address
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button asChild size="lg" className="bg-tattoo-red hover:bg-tattoo-red/90">
                            <a href="mailto:fennyg83@gmail.com">
                              <Mail className="w-5 h-5 mr-2" />
                              Open Mail App
                            </a>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : preferredContact === 'social' ? (
                  <motion.div
                    key="social-option"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-tattoo-black/40 to-tattoo-black/20 border border-tattoo-white/10 rounded-xl p-8 md:p-10 h-full shadow-lg"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-5">
                        <Instagram className="w-6 h-6 text-tattoo-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-tattoo-white">Reach Out on Social Media</h2>
                        <p className="text-tattoo-white/70">Send me a quick DM for faster responses</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                      <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        href="https://instagram.com/fernando_tattoos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-8 rounded-xl border border-tattoo-white/10 bg-gradient-to-br from-tattoo-black/50 to-tattoo-black/30 hover:border-tattoo-red/30 transition-all duration-300"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-6 shadow-lg">
                          <Instagram className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-tattoo-white mb-2">Instagram</h3>
                        <p className="text-tattoo-white/80 mb-6 text-lg">@fernando_tattoos</p>
                        <span className="text-sm text-tattoo-white/60 bg-tattoo-black/30 px-4 py-2 rounded-full">Best for tattoo inspiration and updates</span>
                      </motion.a>

                      <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        href="https://facebook.com/fernandotattoostudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-8 rounded-xl border border-tattoo-white/10 bg-gradient-to-br from-tattoo-black/50 to-tattoo-black/30 hover:border-tattoo-red/30 transition-all duration-300"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
                          <Facebook className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-tattoo-white mb-2">Facebook</h3>
                        <p className="text-tattoo-white/80 mb-6 text-lg">Fernando Tattoo Studio</p>
                        <span className="text-sm text-tattoo-white/60 bg-tattoo-black/30 px-4 py-2 rounded-full">Schedule booking details and consultations</span>
                      </motion.a>

                      <motion.a
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                        href="https://tiktok.com/@fernando_ink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-8 rounded-xl border border-tattoo-white/10 bg-gradient-to-br from-tattoo-black/50 to-tattoo-black/30 hover:border-tattoo-red/30 transition-all duration-300 sm:col-span-2"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center mb-6 shadow-lg">
                          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                        </div>
                        <h3 className="text-xl font-bold text-tattoo-white mb-2">TikTok</h3>
                        <p className="text-tattoo-white/80 mb-6 text-lg">@fernando_ink</p>
                        <span className="text-sm text-tattoo-white/60 bg-tattoo-black/30 px-4 py-2 rounded-full">Watch process videos and follow my work</span>
                      </motion.a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-option"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-tattoo-black/40 to-tattoo-black/20 border border-tattoo-white/10 rounded-xl p-8 md:p-10 h-full shadow-lg"
                  >
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-5">
                        <Calendar className="w-6 h-6 text-tattoo-blue" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-tattoo-white">Ready to Book?</h2>
                        <p className="text-tattoo-white/70">Skip directly to scheduling a consultation</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-tattoo-red/20 to-tattoo-red/5 flex items-center justify-center mb-8 shadow-lg"
                      >
                        <Calendar className="w-12 h-12 text-tattoo-red" />
                      </motion.div>

                      <motion.h3
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-2xl font-bold text-tattoo-white mb-4"
                      >
                        Schedule a Consultation
                      </motion.h3>

                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-tattoo-white/80 mb-8 max-w-md text-lg"
                      >
                        Consultations help me understand your vision and allow us to discuss design options, pricing, and scheduling for your tattoo.
                      </motion.p>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="space-y-8 w-full max-w-md"
                      >
                        <div className="bg-tattoo-black/40 border border-tattoo-white/10 rounded-lg p-6">
                          <p className="text-tattoo-white/80 text-base">
                            A $50 deposit is required to secure your consultation appointment.
                            <br />This deposit will be applied toward your tattoo if you decide to proceed.
                          </p>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-block"
                        >
                          <Button asChild size="lg" className="bg-tattoo-red hover:bg-tattoo-red/90 py-6 px-8 text-lg shadow-lg">
                            <Link href="/book">
                              <Calendar className="w-5 h-5 mr-3" />
                              Schedule Now
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="tattoo-section-title">
              Frequently <span className="text-tattoo-red relative">
                Asked Questions
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
              </span>
            </h2>
            <p className="tattoo-paragraph max-w-2xl mx-auto text-lg text-tattoo-white/80">
              Everything you need to know before booking with me
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-gradient-to-br from-tattoo-black/50 to-transparent p-6 md:p-8 rounded-2xl border border-tattoo-white/5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6"
              >
                <motion.button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  whileHover={{ x: openFaq === index ? 0 : 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-full flex items-center justify-between p-6 rounded-xl text-left transition-all duration-300 ${
                    openFaq === index
                      ? "bg-gradient-to-r from-tattoo-black to-tattoo-black/90 border-2 border-tattoo-red/30 shadow-lg"
                      : "bg-tattoo-black/40 border border-tattoo-white/10 hover:border-tattoo-red/20"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 ${
                      openFaq === index
                        ? "bg-tattoo-red/10 text-tattoo-red"
                        : "bg-tattoo-black/50 text-tattoo-red/70"
                    }`}>
                      <FileQuestion className="w-5 h-5" />
                    </div>
                    <span className={`font-medium text-lg ${openFaq === index ? "text-tattoo-red" : "text-tattoo-white"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    openFaq === index
                      ? "bg-tattoo-red/10 text-tattoo-red rotate-180 transform"
                      : "bg-tattoo-black/30 text-tattoo-white/70"
                  }`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5.25L7 9.25L11 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-tattoo-black/80 to-tattoo-black/60 border border-tattoo-red/10 p-6 rounded-xl text-tattoo-white/90 text-lg ml-10"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Studio Location Map */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="tattoo-section-title">
              Studio <span className="text-tattoo-red relative">
                Location
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
              </span>
            </h2>
            <p className="tattoo-paragraph max-w-2xl mx-auto text-lg text-tattoo-white/80">
              Located in the heart of the Dallas-Fort Worth metroplex
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-tattoo-white/10 shadow-lg relative"
          >
            {/* Map overlay with info */}
            <div className="absolute top-5 right-5 z-10 bg-tattoo-black/80 backdrop-blur-md p-5 rounded-lg border border-tattoo-white/10 max-w-sm">
              <div className="flex gap-4 items-start">
                <div className="bg-tattoo-red/20 p-2 rounded-lg">
                  <MapPin className="w-6 h-6 text-tattoo-red" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-tattoo-white mb-1">Private Studio</h3>
                  <p className="text-tattoo-white/70 text-sm mb-1">By appointment only</p>
                  <p className="text-tattoo-white/90">Dallas/Fort Worth Area, Texas</p>
                  <div className="mt-4 flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5"
                      asChild
                    >
                      <a href="https://maps.google.com/?q=Dallas,TX" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open in Maps
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-tattoo-red/10 border-tattoo-red/20 text-tattoo-red hover:bg-tattoo-red/20"
                      asChild
                    >
                      <a href="/book">
                        <Calendar className="w-3 h-3 mr-1" />
                        Book Visit
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214434.95223867716!2d-97.16250590505372!3d32.81355550639026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e6e122dc807ad%3A0xa4af8bf8dd69acbd!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1711418424713!5m2!1sen!2sus"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Tattoo Studio Location"
            ></iframe>
          </motion.div>
        </section>

        {/* Enhanced Social Media Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="tattoo-section-title">
              Connect <span className="text-tattoo-red relative">
                Socially
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
              </span>
            </h2>
            <p className="tattoo-paragraph max-w-2xl mx-auto">
              Follow my journey and see my latest work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-tattoo-black/30 border border-tattoo-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-tattoo-red/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-tattoo-red/10 flex items-center justify-center mb-4">
                  {social.icon}
                </div>
                <h3 className="text-xl font-bold text-tattoo-white mb-2">{social.platform}</h3>
                <p className="text-tattoo-white/70 mb-4">{social.username}</p>

                <div className="flex gap-3 mt-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5"
                          onClick={() => copyToClipboard(social.username, social.platform)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy username</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-tattoo-red/20 text-tattoo-red hover:bg-tattoo-red/5"
                          asChild
                        >
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Visit
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visit {social.platform} page</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {copySuccess === social.platform && (
                  <span className="text-tattoo-green text-sm mt-2">Username copied!</span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/IMG_4284.JPG"
                alt="Fernando Govea tattoo artwork"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-tattoo-black via-tattoo-black/90 to-tattoo-black/95"></div>
            </div>

            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="tattoo-heading text-shadow-bold mb-6">
                Let's Create Something <span className="text-tattoo-red">Unforgettable</span>
              </h2>

              <p className="text-tattoo-white/90 max-w-2xl mx-auto mb-8 text-lg">
                Every tattoo begins with a conversation. I'm excited to hear your ideas and help bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-tattoo-red text-white hover:bg-tattoo-red/90">
                  <Link href="/book">Schedule a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-tattoo-white/30 text-tattoo-white hover:bg-tattoo-white/10">
                  <Link href="/gallery">View My Portfolio</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
