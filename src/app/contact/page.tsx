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
      <div className="relative h-[60vh] overflow-hidden" ref={containerRef}>
        <div className="absolute inset-0 z-10">
          <motion.div style={{ opacity, scale }} className="h-full w-full">
            <Image
              src="/IMG_2947.JPG"
              alt="Fernando Govea's tattoo workspace"
              fill
              className="object-cover object-center opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-tattoo-black/80"></div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/70 via-tattoo-black/60 to-tattoo-black"></div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-script text-2xl text-tattoo-red mb-4"
          >
            Get in Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-tattoo-white mb-2 tracking-wider uppercase"
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
            className="text-xl text-tattoo-white/90 max-w-3xl mb-2 leading-relaxed"
          >
            Share your ideas and let's create something unique together
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#0a0a0a" fillOpacity="1" d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,80C840,96,960,96,1080,80C1200,64,1320,32,1380,16L1440,0L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Contact Preference Selection */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-tattoo-black/80 to-tattoo-black p-6 rounded-lg border border-tattoo-white/10"
          >
            <h3 className="text-xl font-bold text-tattoo-white mb-4 text-center">How would you prefer to connect?</h3>

            <RadioGroup
              value={preferredContact}
              onValueChange={setPreferredContact}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer
                ${preferredContact === 'email'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="email" id="contact-email" className="sr-only" />
                <Label
                  htmlFor="contact-email"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Mail className={`w-8 h-8 mb-2 ${preferredContact === 'email' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  <span className={`font-medium ${preferredContact === 'email' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Email</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Detailed responses</span>
                </Label>
              </div>

              <div className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer
                ${preferredContact === 'form'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="form" id="contact-form" className="sr-only" />
                <Label
                  htmlFor="contact-form"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <MessageSquare className={`w-8 h-8 mb-2 ${preferredContact === 'form' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  <span className={`font-medium ${preferredContact === 'form' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Contact Form</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Upload images</span>
                </Label>
              </div>

              <div className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer
                ${preferredContact === 'social'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="social" id="contact-social" className="sr-only" />
                <Label
                  htmlFor="contact-social"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Instagram className={`w-8 h-8 mb-2 ${preferredContact === 'social' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  <span className={`font-medium ${preferredContact === 'social' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Social Media</span>
                  <span className="text-sm text-tattoo-white/60 mt-1">Quick DMs</span>
                </Label>
              </div>

              <div className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer
                ${preferredContact === 'booking'
                  ? 'border-tattoo-red/50 bg-tattoo-red/10'
                  : 'border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-white/30'}`}
              >
                <RadioGroupItem value="booking" id="contact-booking" className="sr-only" />
                <Label
                  htmlFor="contact-booking"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Calendar className={`w-8 h-8 mb-2 ${preferredContact === 'booking' ? 'text-tattoo-red' : 'text-tattoo-white/70'}`} />
                  <span className={`font-medium ${preferredContact === 'booking' ? 'text-tattoo-red' : 'text-tattoo-white'}`}>Book Directly</span>
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
              <h2 className="tattoo-display text-tattoo-white mb-6">
                Reach <span className="text-tattoo-red">Out</span>
              </h2>

              <div className="space-y-8 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-tattoo-white mb-1">Email</h3>
                    <p className="text-tattoo-white/70 mb-1">For inquiries and appointments</p>
                    <a href="mailto:fennyg83@gmail.com" className="text-tattoo-red hover:text-tattoo-red/80 transition-colors">
                      fennyg83@gmail.com
                    </a>
                    <button
                      onClick={() => copyToClipboard('fennyg83@gmail.com', 'Email')}
                      className="ml-2 text-tattoo-red hover:text-tattoo-red/80 transition-colors"
                    >
                      <Copy className="w-4 h-4 inline-block" />
                    </button>
                    {copySuccess === 'Email' && <span className="ml-2 text-tattoo-green">Copied!</span>}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-tattoo-white mb-1">Location</h3>
                    <p className="text-tattoo-white/70 mb-1">Private studio by appointment only</p>
                    <p className="text-tattoo-white/90">Dallas/Fort Worth Metroplex, Texas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-tattoo-white mb-1">Working Hours</h3>
                    <p className="text-tattoo-white/70 mb-1">Available for appointments</p>
                    <div className="space-y-1">
                      <p className="text-tattoo-white/90">Tuesday - Saturday: 11:00 AM - 7:00 PM</p>
                      <p className="text-tattoo-white/90">Sunday - Monday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-tattoo-red/10 flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5 text-tattoo-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-tattoo-white mb-1">Social Media</h3>
                    <p className="text-tattoo-white/70 mb-1">Follow my latest work</p>
                    <a
                      href="https://instagram.com/fernando_tattoos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tattoo-red hover:text-tattoo-red/80 transition-colors"
                    >
                      @fernando_tattoos
                    </a>
                    <button
                      onClick={() => copyToClipboard('@fernando_tattoos', 'Instagram')}
                      className="ml-2 text-tattoo-red hover:text-tattoo-red/80 transition-colors"
                    >
                      <Copy className="w-4 h-4 inline-block" />
                    </button>
                    {copySuccess === 'Instagram' && <span className="ml-2 text-tattoo-green">Copied!</span>}
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="p-6 border border-tattoo-white/10 rounded-lg bg-tattoo-black/50">
                  <h3 className="text-xl font-bold text-tattoo-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-tattoo-red" />
                    Ready to Book?
                  </h3>
                  <p className="text-tattoo-white/80 mb-6">
                    If you already have a clear idea of what you want, you can skip straight to booking a consultation.
                  </p>
                  <Button asChild className="w-full bg-tattoo-red hover:bg-tattoo-red/90">
                    <Link href="/book">Book a Consultation</Link>
                  </Button>
                </div>
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
              {preferredContact === 'form' ? (
                <div className="bg-tattoo-black/30 border border-tattoo-white/10 rounded-xl p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-4">
                      <MessageSquare className="w-5 h-5 text-tattoo-blue" />
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
                      className="bg-tattoo-blue/10 border border-tattoo-blue/20 rounded-lg p-6 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tattoo-blue/20 mb-4">
                        <CheckCircle2 className="w-8 h-8 text-tattoo-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-tattoo-white mb-2">Message Sent Successfully!</h3>
                      <p className="text-tattoo-white/80 mb-6">
                        Thank you for reaching out. I'll review your message and get back to you as soon as possible.
                      </p>
                      <Button
                        onClick={() => setFormSubmitted(false)}
                        variant="outline"
                        className="border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <ContactForm onFormSubmit={() => setFormSubmitted(true)} />
                  )}
                </div>
              ) : preferredContact === 'email' ? (
                <div className="bg-tattoo-black/30 border border-tattoo-white/10 rounded-xl p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-tattoo-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-tattoo-white">Email Me Directly</h2>
                      <p className="text-tattoo-white/70">For detailed inquiries and consultations</p>
                    </div>
                  </div>

                  <div className="grow flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-20 h-20 rounded-full bg-tattoo-red/10 flex items-center justify-center mb-6">
                      <Mail className="w-10 h-10 text-tattoo-red" />
                    </div>

                    <h3 className="text-xl font-bold text-tattoo-white mb-2">Ready to get in touch?</h3>
                    <p className="text-tattoo-white/80 mb-6 max-w-md">
                      Send me an email with your ideas, questions, or to schedule a consultation. I'm always excited to discuss new projects!
                    </p>

                    <div className="relative group inline-block">
                      <p className="text-xl text-tattoo-red font-medium mb-4 group-hover:text-tattoo-red/80 transition-colors">
                        fennyg83@gmail.com
                      </p>
                      {copySuccess === 'EmailDirect' && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-tattoo-green text-sm bg-tattoo-black/70 px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => copyToClipboard('fennyg83@gmail.com', 'EmailDirect')}
                        variant="outline"
                        className="border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/5"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Email Address
                      </Button>

                      <Button asChild className="bg-tattoo-red hover:bg-tattoo-red/90">
                        <a href="mailto:fennyg83@gmail.com">
                          <Mail className="w-4 h-4 mr-2" />
                          Open Mail App
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : preferredContact === 'social' ? (
                <div className="bg-tattoo-black/30 border border-tattoo-white/10 rounded-xl p-6 md:p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-4">
                      <Instagram className="w-5 h-5 text-tattoo-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-tattoo-white">Reach Out on Social Media</h2>
                      <p className="text-tattoo-white/70">Send me a quick DM for faster responses</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <a
                      href="https://instagram.com/fernando_tattoos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-6 rounded-lg border border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-red/30 hover:bg-tattoo-black/70 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-4">
                        <Instagram className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-tattoo-white mb-1">Instagram</h3>
                      <p className="text-tattoo-white/80 mb-4">@fernando_tattoos</p>
                      <span className="text-sm text-tattoo-white/60">Best for tattoo inspiration and updates</span>
                    </a>

                    <a
                      href="https://facebook.com/fernandotattoostudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-6 rounded-lg border border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-red/30 hover:bg-tattoo-black/70 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-4">
                        <Facebook className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-tattoo-white mb-1">Facebook</h3>
                      <p className="text-tattoo-white/80 mb-4">Fernando Tattoo Studio</p>
                      <span className="text-sm text-tattoo-white/60">Schedule booking details and consultations</span>
                    </a>

                    <a
                      href="https://tiktok.com/@fernando_ink"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-6 rounded-lg border border-tattoo-white/10 bg-tattoo-black/50 hover:border-tattoo-red/30 hover:bg-tattoo-black/70 transition-all duration-300 sm:col-span-2"
                    >
                      <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                      </div>
                      <h3 className="text-lg font-bold text-tattoo-white mb-1">TikTok</h3>
                      <p className="text-tattoo-white/80 mb-4">@fernando_ink</p>
                      <span className="text-sm text-tattoo-white/60">Watch process videos and follow my work</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-tattoo-black/30 border border-tattoo-white/10 rounded-xl p-6 md:p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-tattoo-blue/10 flex items-center justify-center mr-4">
                      <Calendar className="w-5 h-5 text-tattoo-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-tattoo-white">Ready to Book?</h2>
                      <p className="text-tattoo-white/70">Skip directly to scheduling a consultation</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-20 h-20 rounded-full bg-tattoo-red/10 flex items-center justify-center mb-6">
                      <Calendar className="w-10 h-10 text-tattoo-red" />
                    </div>

                    <h3 className="text-xl font-bold text-tattoo-white mb-2">Schedule a Consultation</h3>
                    <p className="text-tattoo-white/80 mb-6 max-w-md">
                      Consultations help me understand your vision and allow us to discuss design options, pricing, and scheduling for your tattoo.
                    </p>

                    <div className="space-y-4">
                      <p className="text-tattoo-white/70 text-sm">
                        A $50 deposit is required to secure your consultation appointment.
                        <br />This deposit will be applied toward your tattoo if you decide to proceed.
                      </p>

                      <Button asChild size="lg" className="bg-tattoo-red hover:bg-tattoo-red/90">
                        <Link href="/book">
                          <Calendar className="w-5 h-5 mr-2" />
                          Schedule Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
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
            <h2 className="tattoo-display text-tattoo-white mb-4">
              Frequently <span className="text-tattoo-red relative">
                Asked Questions
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
              </span>
            </h2>
            <p className="tattoo-paragraph max-w-2xl mx-auto">
              Everything you need to know before booking with me
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full flex items-center justify-between p-5 rounded-lg text-left transition-all duration-300 ${
                    openFaq === index
                      ? "bg-tattoo-black border-2 border-tattoo-red/30 shadow-lg"
                      : "bg-tattoo-black/50 border border-tattoo-white/10 hover:border-tattoo-red/20"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`mr-4 transition-colors duration-300 ${openFaq === index ? "text-tattoo-red" : "text-tattoo-red/70"}`}>
                      <FileQuestion className="w-5 h-5" />
                    </div>
                    <span className={`font-medium ${openFaq === index ? "text-tattoo-red" : "text-tattoo-white"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-300 ${
                    openFaq === index
                      ? "bg-tattoo-red/10 text-tattoo-red"
                      : "bg-tattoo-black/30 text-tattoo-white/70"
                  }`}>
                    {openFaq === index ? '−' : '+'}
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-tattoo-black to-tattoo-black/90 border border-tattoo-red/10 p-5 rounded-lg text-tattoo-white/80 ml-9"
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
            className="text-center mb-10"
          >
            <h2 className="tattoo-display text-tattoo-white mb-4">
              Studio <span className="text-tattoo-red relative">
                Location
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
              </span>
            </h2>
            <p className="tattoo-paragraph max-w-2xl mx-auto">
              Located in the heart of the Dallas-Fort Worth metroplex
            </p>
          </motion.div>

          <div className="rounded-xl overflow-hidden border border-tattoo-white/10 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214434.95223867716!2d-97.16250590505372!3d32.81355550639026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e6e122dc807ad%3A0xa4af8bf8dd69acbd!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1711418424713!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Tattoo Studio Location"
            ></iframe>
          </div>
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
            <h2 className="tattoo-display text-tattoo-white mb-4">
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
              <h2 className="text-3xl md:text-4xl font-bold text-tattoo-white mb-4">
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
