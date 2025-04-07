'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type GalleryImage = {
  src: string
  alt: string
  category?: string
}

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [filter, setFilter] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const galleryImages: GalleryImage[] = [
    {
      src: '/images/IMG_2889.JPG',
      alt: 'Greek-inspired circular tattoo',
      category: 'Black and Grey',
    },
    {
      src: '/images/IMG_2947.JPG',
      alt: 'Tattoo workspace',
      category: 'Studio'
    },
    {
      src: '/images/IMG_3534.JPG',
      alt: 'Detailed tattoo artwork',
      category: 'Black and Grey'
    },
    {
      src: '/images/IMG_3896.JPG',
      alt: 'Religious tattoo design',
      category: 'Black and Grey'
    },
    {
      src: '/images/IMG_3947.JPG',
      alt: 'Detailed portrait tattoo',
      category: 'Black and Grey'
    },
    {
      src: '/images/IMG_4246.JPG',
      alt: 'Fine line tattoo work',
      category: 'Black and Grey'
    },
    {
      src: '/images/IMG_4249.JPG',
      alt: 'Religious figure tattoo',
      category: 'Black and Grey'
    },
    {
      src: '/images/IMG_4284.JPG',
      alt: 'Detailed religious tattoo',
      category: 'Black and Grey'
    },
    {
      src: '/images/IMG_4454.JPG',
      alt: 'Portrait tattoo artwork',
      category: 'Black and Grey'
    },
    {
      src: '/images/5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg',
      alt: 'Tattoo session in progress',
      category: 'Studio',
    },
    {
      src: '/images/leg-piece.jpg',
      alt: 'Detailed leg tattoo piece',
      category: 'Black and Grey',
    },
  ]

  // Get unique categories for filter buttons
  const categories = Array.from(new Set(galleryImages.map(img => img.category).filter(Boolean)));

  // Filter images based on selected category
  const filteredImages = filter
    ? galleryImages.filter(img => img.category === filter)
    : galleryImages;

  // Navigate to next/previous image in lightbox
  const navigateImage = (direction: 'next' | 'prev') => {
    const images = filter ? filteredImages : galleryImages;
    const newIndex = direction === 'next'
      ? (selectedIndex + 1) % images.length
      : (selectedIndex - 1 + images.length) % images.length;

    setSelectedIndex(newIndex);
    const newImage = images[newIndex];
    if (newImage) {
      setSelectedImage(newImage);
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  // Handle opening an image and setting its index
  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex justify-center mb-8 flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            filter === null
              ? 'bg-tattoo-red text-white shadow-md'
              : 'bg-zinc-800/70 text-white/80 hover:bg-zinc-700'
          }`}
          onClick={() => setFilter(null)}
        >
          All Work
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === category
                ? 'bg-tattoo-red text-white shadow-md'
                : 'bg-zinc-800/70 text-white/80 hover:bg-zinc-700'
            }`}
            onClick={() => setFilter(category as string)}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Main Gallery Grid with symmetrical layout */}
      <div className="w-full px-1">
        <AnimatePresence>
          <motion.div
            layout
            className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr'
          >
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300'
                onClick={() => openImage(image, index)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                  className='object-cover transition-all duration-500 group-hover:scale-105'
                  quality={85}
                />

                <div className='absolute inset-x-0 bottom-0 p-3 z-20 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
                  <h3 className='text-sm sm:text-base font-medium text-white truncate'>{image.alt}</h3>
                  {image.category && (
                    <p className='text-xs text-white/80 mt-1'>{image.category}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Lightbox with navigation */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent
          ref={dialogRef}
          onKeyDown={handleKeyDown}
          className='max-w-6xl p-0 overflow-hidden bg-tattoo-black border-tattoo-white/10 rounded-lg'
          tabIndex={0} // Make the dialog focusable for keyboard events
        >
          <div className="relative">
            {/* Navigation controls */}
            <div className="absolute top-4 right-4 z-30 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-tattoo-red/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-tattoo-red/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <DialogClose className="p-2 rounded-full bg-black/50 text-white hover:bg-tattoo-red/80 transition-colors">
                <X className="w-5 h-5" />
              </DialogClose>
            </div>

            {/* Image display */}
            <AnimatePresence mode="wait">
              {selectedImage && (
                <motion.div
                  key={selectedImage.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-[85vh] flex items-center justify-center"
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="95vw"
                    className="object-contain"
                    priority
                    quality={90}
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-4 px-4">
                    <h3 className="text-xl font-medium text-white">{selectedImage.alt}</h3>
                    {selectedImage.category && (
                      <p className="text-sm text-white/70 mt-1">{selectedImage.category}</p>
                    )}
                    <p className="text-xs text-white/50 mt-2">Use arrow keys to navigate</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
