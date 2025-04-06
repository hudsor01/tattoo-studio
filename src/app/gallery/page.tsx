'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Filter, Clock, Calendar, Star, Share2, Download, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type GalleryImage = {
  id: string
  src: string
  alt: string
  category: string
  artist?: string
  description?: string
  featured?: boolean
  width?: number
  height?: number
  date?: string
  likes?: number
  tags?: string[]
  location?: string
}

type GalleryVideo = {
  id: string
  src: string
  poster: string
  title: string
  description: string
  category: string
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [filteredItems, setFilteredItems] = useState<GalleryImage[]>([])
  const galleryRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const [showInfo, setShowInfo] = useState(false)
  const [sortOption, setSortOption] = useState<'newest' | 'popular' | 'default'>('default')
  const [activeArtist, setActiveArtist] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Gallery images with enhanced metadata - restore original paths
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: '/images/leg-piece.jpg',
      alt: 'Ornate Arm Sleeve',
      category: 'blackwork',
      artist: 'Fernando Govea',
      description: 'Intricate blackwork sleeve with geometric patterns and sacred geometry. One of my favorite pieces that showcases my precision linework.',
      featured: true,
      height: 4,
      date: '2023-11-15',
      likes: 149,
      tags: ['sleeve', 'geometric', 'blackwork', 'sacred-geometry'],
      location: 'Upper arm'
    },
    {
      id: '2',
      src: '/images/IMG_2889.JPG',
      alt: 'Geometric Shield Design',
      category: 'geometric',
      artist: 'Fernando Govea',
      description: 'Precision geometric shield with dotwork elements. I love incorporating symmetry and balance in my geometric pieces.',
      height: 3,
      date: '2023-09-22',
      likes: 87,
      tags: ['geometric', 'dotwork', 'shield', 'symmetrical'],
      location: 'Back'
    },
    {
      id: '3',
      src: '/images/IMG_2947.JPG',
      alt: 'My Tattoo Workspace',
      category: 'studio',
      artist: 'Fernando Govea',
      description: 'My custom workspace setup for precision tattooing. I use only premium equipment to ensure the best results.',
      height: 2,
      date: '2023-08-10',
      tags: ['studio', 'equipment', 'workspace'],
    },
    {
      id: '4',
      src: '/images/IMG_3534.JPG',
      alt: 'Realistic Portrait',
      category: 'realism',
      artist: 'Fernando Govea',
      description: 'Hyperrealistic portrait work with fine detail shading. I specialize in capturing emotion and personality in my portrait work.',
      featured: true,
      height: 4,
      date: '2023-10-05',
      likes: 203,
      tags: ['portrait', 'realism', 'grayscale'],
      location: 'Chest'
    },
    {
      id: '5',
      src: '/images/IMG_3896.JPG',
      alt: 'Religious Iconography',
      category: 'blackwork',
      artist: 'Fernando Govea',
      description: 'Religious symbolism with dramatic contrast and shading. This piece shows my approach to creating spiritual tattoos with respect and artistic excellence.',
      height: 3,
      date: '2023-07-18',
      likes: 175,
      tags: ['religious', 'spiritual', 'blackwork'],
      location: 'Back'
    },
    {
      id: '6',
      src: '/images/IMG_3947.JPG',
      alt: 'Memorial Portrait',
      category: 'realism',
      artist: 'Fernando Govea',
      description: 'Commemorative portrait with detailed grayscale work. Creating memorial pieces is a deeply meaningful part of my practice.',
      featured: true,
      height: 4,
      date: '2023-12-02',
      likes: 258,
      tags: ['portrait', 'memorial', 'realistic'],
      location: 'Upper arm'
    },
    {
      id: '7',
      src: '/images/IMG_4246.JPG',
      alt: 'Fine Line Artwork',
      category: 'fineline',
      artist: 'Fernando Govea',
      description: 'Delicate linework with subtle gray shading. My fine line work focuses on precision and elegance.',
      height: 3,
      date: '2023-08-30',
      likes: 112,
      tags: ['fineline', 'minimal', 'elegant'],
      location: 'Forearm'
    },
    {
      id: '8',
      src: '/images/IMG_4249.JPG',
      alt: 'Neo-Traditional Figure',
      category: 'neo-traditional',
      artist: 'Fernando Govea',
      description: 'My take on neo-traditional style with bold lines and a modern color palette.',
      height: 3,
      date: '2023-06-15',
      likes: 93,
      tags: ['neo-traditional', 'bold', 'color'],
      location: 'Thigh'
    },
    {
      id: '9',
      src: '/images/IMG_4284.JPG',
      alt: 'Japanese Style Artwork',
      category: 'japanese',
      artist: 'Fernando Govea',
      description: 'Traditional Japanese style with modern techniques. I bring a contemporary approach while respecting traditional Japanese tattoo elements.',
      featured: true,
      height: 4,
      date: '2023-11-29',
      likes: 189,
      tags: ['japanese', 'traditional', 'irezumi'],
      location: 'Back'
    },
    {
      id: '10',
      src: '/images/IMG_4454.JPG',
      alt: 'Dramatic Black & Gray',
      category: 'blackwork',
      artist: 'Fernando Govea',
      description: 'Deep blacks and subtle gray gradients create striking contrast. My black and gray work emphasizes mood and atmosphere.',
      height: 3,
      date: '2023-09-08',
      likes: 145,
      tags: ['blackwork', 'grayscale', 'contrast'],
      location: 'Shoulder'
    },
    {
      id: '11',
      src: '/images/5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg',
      alt: 'Tattoo Session in Progress',
      category: 'studio',
      artist: 'Fernando Govea',
      description: 'Working on a detailed sleeve piece. I focus fully on each client to deliver the best possible experience.',
      height: 2,
      date: '2023-10-17',
      tags: ['process', 'studio', 'session'],
    }
  ]

  // Gallery videos updated for Fernando's personal brand - restore original paths
  const galleryVideos: GalleryVideo[] = [
    {
      id: 'v1',
      src: '/videos/96E755BA-7D03-4883-BF07-085DB9F255AE.mov',
      poster: '/images/IMG_3534.JPG',
      title: 'My Precision Linework Technique',
      description: 'Watch how I create perfectly clean lines for my signature style',
      category: 'technique'
    },
    {
      id: 'v2',
      src: '/videos/2880EC96-5AB2-4142-BEEB-B4ABCF32E04F.mov',
      poster: '/images/IMG_3947.JPG',
      title: 'Shading Mastery',
      description: 'My approach to creating depth and dimension through layered shading techniques',
      category: 'technique'
    },
    {
      id: 'v3',
      src: '/videos/6CED122B-3C95-4ED3-B803-A7BCDE5E5F2B.mov',
      poster: '/images/IMG_4454.JPG',
      title: 'Color Work Process',
      description: 'How I approach vibrant, long-lasting color tattoos that stand the test of time',
      category: 'technique'
    },
    {
      id: 'v4',
      src: '/videos/719B90A0-0A98-4AF4-A14C-949A52F82067.mov',
      poster: '/images/IMG_2889.JPG',
      title: 'From Concept to Completion',
      description: "Follow along as I transform a client's idea into a finished tattoo",
      category: 'process'
    }
  ]

  // Categories focused on Fernando's specialties
  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'featured', label: 'Featured' },
    { id: 'blackwork', label: 'Black & Gray' },
    { id: 'realism', label: 'Realism' },
    { id: 'neo-traditional', label: 'Neo-Traditional' },
    { id: 'japanese', label: 'Japanese' },
    { id: 'geometric', label: 'Geometric' },
    { id: 'fineline', label: 'Fine Line' },
    { id: 'studio', label: 'Studio Life' }
  ]

  // Experience sections instead of multiple artists
  const experience = [
    { id: 'recent', name: 'Recent Work', period: '2023' },
    { id: 'signature', name: 'Signature Style', featured: true },
    { id: 'client-favorites', name: 'Client Favorites', popular: true }
  ]

  // All unique tags from images
  const allTags = Array.from(new Set(galleryImages.flatMap(img => img.tags || []))).sort()

  // More advanced filtering logic - updated for single artist focus
  const applyFilters = useCallback(() => {
    let filtered = [...galleryImages]

    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'featured') {
        filtered = filtered.filter(img => img.featured)
      } else {
        filtered = filtered.filter(img => img.category === activeCategory)
      }
    }

    // Experience filter (replacing artist filter)
    if (activeArtist === 'recent') {
      // Show only recent work (last 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filtered = filtered.filter(img => img.date && new Date(img.date) >= sixMonthsAgo);
    } else if (activeArtist === 'signature') {
      // Show featured work as signature style
      filtered = filtered.filter(img => img.featured);
    } else if (activeArtist === 'client-favorites') {
      // Show most liked pieces
      filtered = filtered.filter(img => (img.likes || 0) > 100);
    }

    // Tag filter
    if (activeTag) {
      filtered = filtered.filter(img => img.tags?.includes(activeTag))
    }

    // Sort options
    if (sortOption === 'newest') {
      filtered.sort((a, b) => {
        if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime()
        return 0
      })
    } else if (sortOption === 'popular') {
      filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    }

    setFilteredItems(filtered)
  }, [activeCategory, activeArtist, activeTag, sortOption, galleryImages])

  // Update when any filter changes
  useEffect(() => {
    applyFilters()
  }, [activeCategory, activeArtist, activeTag, sortOption, applyFilters])

  // Reset additional filters when category changes
  useEffect(() => {
    if (activeCategory !== 'all') {
      setActiveTag(null)
    }
  }, [activeCategory])

  // Initialize with all images
  useEffect(() => {
    setFilteredItems(galleryImages)
  }, [])

  // Next/Previous image navigation
  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return

    const currentIndex = filteredItems.findIndex(img => img.id === selectedImage.id)
    if (currentIndex === -1) return

    let newIndex: number
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    }

    setSelectedImage(filteredItems[newIndex])
  }

  // Keyboard navigation with additional keys
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') navigateImage('next')
    if (e.key === 'ArrowLeft') navigateImage('prev')
    if (e.key === 'Escape') setSelectedImage(null)
    if (e.key === 'i') setShowInfo(prev => !prev)
  }, [selectedImage, filteredItems])

  // Set up global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Clear all filters
  const clearFilters = () => {
    setActiveCategory('all')
    setActiveArtist(null)
    setActiveTag(null)
    setSortOption('default')
  }

  return (
    <main className="bg-tattoo-black min-h-screen">
      {/* Hero Section with enhanced parallax and Fernando's branding */}
      <div className="relative h-[75vh] overflow-hidden">
        <div className="absolute inset-0 z-10">
          <motion.div style={{ opacity: springOpacity, scale: springScale }} className="h-full w-full">
            <Image
              src="/images/IMG_3896.JPG"
              alt="Fernando Govea - Tattoo artist showcase"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-tattoo-black/70"></div>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-tattoo-black/70 via-tattoo-black/60 to-tattoo-black"></div>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-script text-3xl text-tattoo-red mb-6"
          >
            The Portfolio of
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="tattoo-heading text-shadow-bold mb-6 tracking-wider uppercase"
          >
            Fernando <span className="text-tattoo-red relative">
              Govea
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-tattoo-red/80"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-xl md:text-2xl text-tattoo-white/90 max-w-3xl mb-10 leading-relaxed"
          >
            A curated collection of custom tattoo designs and artwork, each piece representing my dedication to artistic excellence and craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              className="bg-tattoo-red hover:bg-tattoo-red/90 text-white font-medium"
              onClick={() => document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore My Work
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#0a0a0a" fillOpacity="1" d="M0,64L60,53C120,43,240,21,360,21C480,21,600,43,720,53C840,64,960,64,1080,53C1200,43,1320,21,1380,11L1440,0L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
          </svg>
        </div>
      </div>

      <div id="gallery-section" className="container max-w-7xl mx-auto px-4 py-4" ref={galleryRef}>
        {/* Enhanced Filters Section with sorting - tailored for Fernando */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="tattoo-subheading mb-2">Browse My Collection</h2>
              <p className="text-tattoo-white/70">
                {filteredItems.length} tattoo {filteredItems.length === 1 ? 'piece' : 'pieces'} to explore
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border border-tattoo-white/10 text-tattoo-white/80 hover:bg-tattoo-white/5 gap-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Sort</span>
                </Button>

                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-tattoo-black border border-tattoo-white/10 hidden group-hover:block z-50">
                  <div className="py-1">
                    <button
                      onClick={() => setSortOption('default')}
                      className={cn(
                        "block px-4 py-2 text-sm w-full text-left",
                        sortOption === 'default'
                          ? "bg-tattoo-red/10 text-tattoo-red"
                          : "text-tattoo-white/80 hover:bg-tattoo-white/5"
                      )}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => setSortOption('newest')}
                      className={cn(
                        "block px-4 py-2 text-sm w-full text-left",
                        sortOption === 'newest'
                          ? "bg-tattoo-red/10 text-tattoo-red"
                          : "text-tattoo-white/80 hover:bg-tattoo-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Newest First</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setSortOption('popular')}
                      className={cn(
                        "block px-4 py-2 text-sm w-full text-left",
                        sortOption === 'popular'
                          ? "bg-tattoo-red/10 text-tattoo-red"
                          : "text-tattoo-white/80 hover:bg-tattoo-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {(activeCategory !== 'all' || activeArtist || activeTag || sortOption !== 'default') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-tattoo-red hover:text-tattoo-red/90 hover:bg-tattoo-red/10"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Experience filters - replacing multiple artist filters */}
          <div className="flex overflow-x-auto pb-4 gap-2 hide-scrollbar mb-4">
            <Button
              onClick={() => setActiveArtist(null)}
              variant={!activeArtist ? "default" : "outline"}
              size="sm"
              className={
                !activeArtist
                  ? "bg-tattoo-blue text-white hover:bg-tattoo-blue/90 whitespace-nowrap"
                  : "bg-transparent border-tattoo-white/20 text-tattoo-white hover:border-tattoo-blue/50 whitespace-nowrap"
              }
            >
              All Artwork
            </Button>

            {experience.map(exp => (
              <Button
                key={exp.id}
                onClick={() => setActiveArtist(exp.id)}
                variant={activeArtist === exp.id ? "default" : "outline"}
                size="sm"
                className={
                  activeArtist === exp.id
                    ? "bg-tattoo-blue text-white hover:bg-tattoo-blue/90 whitespace-nowrap"
                    : "bg-transparent border-tattoo-white/20 text-tattoo-white hover:border-tattoo-blue/50 whitespace-nowrap"
                }
              >
                {exp.name}
              </Button>
            ))}
          </div>

          {/* Category filters - Unchanged */}
          <div className="flex overflow-x-auto pb-4 gap-2 hide-scrollbar mb-4">
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                className={
                  activeCategory === category.id
                    ? "bg-tattoo-red text-white hover:bg-tattoo-red/90 whitespace-nowrap"
                    : "bg-transparent border-tattoo-white/20 text-tattoo-white hover:border-tattoo-red/50 whitespace-nowrap"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Tag filters - Unchanged */}
          {activeCategory !== 'featured' && (
            <div className="flex flex-wrap gap-2 mt-4">
              {allTags.slice(0, 12).map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-tattoo-white/5 hover:border-tattoo-red/50",
                    activeTag === tag ? "bg-tattoo-white/10 border-tattoo-red text-tattoo-red" : "text-tattoo-white/70 border-tattoo-white/20"
                  )}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Masonry Grid - Unchanged structure but with personal Fernando branding */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${activeArtist}-${activeTag}-${sortOption}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px] sm:auto-rows-[250px]"
              >
                {filteredItems.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className={`group relative rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ${
                      image.height === 4 ? 'row-span-2' : image.height === 3 ? 'sm:row-span-2' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black via-tattoo-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{ pointerEvents: 'none' }} />

                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    />

                    {image.featured && (
                      <div className="absolute top-3 left-3 z-20">
                        <Badge className="bg-tattoo-red text-white border-none px-2">
                          Featured
                        </Badge>
                      </div>
                    )}

                    {image.likes && (
                      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1 bg-tattoo-black/50 text-white py-1 px-2 rounded text-xs">
                          <Star className="w-3 h-3 fill-tattoo-red stroke-none" />
                          <span>{image.likes}</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-medium text-tattoo-white truncate">{image.alt}</h3>
                        <div className="flex items-center justify-between">
                          {image.category && (
                            <p className="text-xs text-tattoo-red capitalize">{image.category}</p>
                          )}
                          {image.location && (
                            <p className="text-xs text-tattoo-white/60">{image.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-tattoo-black/30 rounded-full p-6 mb-6">
                  <Image src="/images/IMG_2947.JPG" alt="No results" width={100} height={100} className="rounded-full opacity-50" />
                </div>
                <p className="text-tattoo-white/70 text-xl mb-2">No tattoos found matching your filters</p>
                <p className="text-tattoo-white/50 text-sm mb-6 max-w-md">
                  Try adjusting your filter selection or browse my complete gallery
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90"
                >
                  View All Work
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Process Videos Section - Fernando specific */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 className="tattoo-section-title">
              Behind the <span className="text-tattoo-blue relative">
                Process
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-blue/80"></span>
              </span>
            </h2>
            <p className="tattoo-paragraph max-w-2xl mx-auto">
              Watch as I create unique tattoo art and learn about my techniques and approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {galleryVideos.map((video) => (
              <motion.div
                key={video.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-lg"
                  onClick={() => setSelectedVideo(video)}
                >
                  <Image
                    src={video.poster}
                    alt={video.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black to-transparent opacity-40"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-tattoo-red/90 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge className="bg-tattoo-blue/90 text-white border-none">
                      {video.category === 'technique' ? 'Technique' : 'Process'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-medium text-tattoo-white group-hover:text-tattoo-red transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-tattoo-white/70 text-sm mt-2">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section - Fernando specific */}
        <div className="relative mt-24 overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/IMG_3947.JPG"
              alt="Fernando Govea tattoo artwork"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-tattoo-black via-tattoo-black/90 to-tattoo-black/70"></div>
          </div>

          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            <motion.h2
              className="tattoo-heading text-shadow-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready for Your Own <span className="text-tattoo-red">Custom Tattoo</span>?
            </motion.h2>

            <motion.p
              className="text-tattoo-white/90 max-w-2xl mx-auto mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I'm ready to transform your ideas into stunning, personalized artwork.
              Book a consultation today to begin your tattoo journey with me.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" className="bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90">
                <Link
                href="/book"
                onClick={(e) => {
                  // Stop propagation to prevent any parent handlers from triggering
                  e.stopPropagation();
                }}
              >Book a Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-tattoo-white/30 text-tattoo-white hover:bg-tattoo-white/10"
              >
                <Link
                href="/contact"
                onClick={(e) => {
                  // Stop propagation to prevent any parent handlers from triggering
                  e.stopPropagation();
                }}
              >Contact Me</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Lightbox - Fernando specific details */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl p-0 bg-tattoo-black/95 border-tattoo-white/10 overflow-hidden">
          {selectedImage && (
            <div className="relative">
              <div className="absolute top-4 right-4 z-30 flex gap-2">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-blue/90 transition-colors"
                  title="Toggle image info"
                >
                  <Info className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateImage('prev')}
                  className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-red/90 transition-colors"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-red/90 transition-colors"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-blue/90 transition-colors"
                  title="Share image"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-blue/90 transition-colors"
                  title="Download image"
                >
                  <Download className="w-5 h-5" />
                </button>
                <DialogClose className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-red/90 transition-colors">
                  <X className="w-5 h-5" />
                </DialogClose>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[80vh] flex items-center justify-center"
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="95vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tattoo-black/95 to-transparent pt-12 pb-6 px-6"
                  >
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-medium text-tattoo-white">{selectedImage.alt}</h3>
                        {selectedImage.category && (
                          <Badge className="bg-tattoo-red/80 text-white border-none hover:bg-tattoo-red/90 capitalize">
                            {selectedImage.category}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                        <div>
                          {selectedImage.description && (
                            <p className="text-tattoo-white/80 mb-2">{selectedImage.description}</p>
                          )}

                          {selectedImage.location && (
                            <p className="text-sm text-tattoo-white/60">
                              <span className="text-tattoo-white/80 font-medium">Placement:</span> {selectedImage.location}
                            </p>
                          )}
                        </div>

                        <div>
                          {selectedImage.date && (
                            <p className="text-sm text-tattoo-white/60">
                              <span className="text-tattoo-white/80 font-medium">Date:</span> {new Date(selectedImage.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                            </p>
                          )}

                          {selectedImage.tags && selectedImage.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedImage.tags.map(tag => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs text-tattoo-white/80 border-tattoo-white/30"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-tattoo-white/80 border-tattoo-white/20 hover:bg-tattoo-white/5"
                          asChild
                        >
                          <Link
                            href="/book"
                            onClick={(e) => {
                              // Stop propagation to prevent any parent handlers from triggering
                              e.stopPropagation();
                            }}
                          >
                            Book a Similar Style
                          </Link>
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-tattoo-red border-tattoo-white/20 hover:bg-tattoo-white/5 h-8 w-8"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <span className="text-tattoo-white/60 text-sm">{selectedImage.likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Modal - Fernando specific */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl p-0 bg-tattoo-black/95 border-tattoo-white/10 overflow-hidden">
          {selectedVideo && (
            <div className="relative">
              <div className="absolute top-4 right-4 z-30">
                <DialogClose className="p-2 rounded-full bg-tattoo-black/50 text-white hover:bg-tattoo-red/90 transition-colors">
                  <X className="w-5 h-5" />
                </DialogClose>
              </div>

              <div className="p-2">
                <video
                  src={selectedVideo.src}
                  poster={selectedVideo.poster}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] object-contain rounded"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-tattoo-white">{selectedVideo.title}</h3>
                  <Badge className="bg-tattoo-blue/90 text-white border-none">
                    {selectedVideo.category === 'technique' ? 'Technique' : 'Process'}
                  </Badge>
                </div>
                <p className="text-tattoo-white/80 mb-4">{selectedVideo.description}</p>

                <div className="flex justify-between items-center mt-6">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-tattoo-white/80 border-tattoo-white/20 hover:bg-tattoo-white/5"
                  >
                    <Link
                    href="/book"
                    onClick={(e) => {
                      // Stop propagation to prevent any parent handlers from triggering
                      e.stopPropagation();
                    }}
                  >Book with Fernando</Link>
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-tattoo-white/80 border-tattoo-white/20 hover:bg-tattoo-white/5 h-8 w-8"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Custom styles - unchanged */}
      <style jsx global>{`
        /* Enhanced scrollbar styling */
        .hide-scrollbar::-webkit-scrollbar {
          height: 4px;
        }

        .hide-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }

        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(214, 40, 40, 0.5);
          border-radius: 2px;
        }

        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(214, 40, 40, 0.8);
        }

        /* Image hover effects */
        .image-zoom-effect {
          transition: transform 0.5s ease-out;
        }

        .image-zoom-effect:hover {
          transform: scale(1.05);
        }

        /* Keyboard shortcut hint in lightbox mode */
        @keyframes pulseOpacity {
          0% { opacity: 0.7; }
          50% { opacity: 0.4; }
          100% { opacity: 0.7; }
        }

        .keyboard-hint {
          animation: pulseOpacity 2s infinite;
        }
      `}</style>
    </main>
  )
}
