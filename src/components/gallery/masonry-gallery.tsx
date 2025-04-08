'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWindowSize } from '@/hooks/use-window-size';
import { motion, AnimatePresence } from 'framer-motion';

type GalleryItem = {
  src: string;
  alt: string;
};

interface MasonryGalleryProps {
  galleryItems: GalleryItem[];
}

export default function MasonryGallery({ galleryItems }: MasonryGalleryProps) {
  const { width } = useWindowSize();
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Calculate columns based on screen width
  const getColumns = (width: number) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const columns = width ? getColumns(width) : 3;
  const columnGap = 20;

  // Handle image load and store aspect ratio
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      setImageHeights(prev => ({
        ...prev,
        [src]: aspectRatio
      }));
    }
  };

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Escape') {
          setLightboxIndex(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

  // Distribute items into columns
  const distributeItems = () => {
    const columnItems: GalleryItem[][] = Array(columns).fill(null).map(() => []);
    const columnHeights: number[] = Array(columns).fill(0);

    galleryItems.forEach(item => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnItems[shortestColumnIndex].push(item);
      const estimatedHeight = imageHeights[item.src] || 1;
      columnHeights[shortestColumnIndex] += estimatedHeight;
    });

    return columnItems;
  };

  return (
    <div className="w-full pb-10">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          columnGap: `${columnGap}px`,
          width: '100%'
        }}
      >
        {distributeItems().map((column, colIndex) => (
          <div key={`column-${colIndex}`} className="flex flex-col space-y-5 w-full">
            {column.map((item, itemIndex) => (
              <motion.div
                key={`${colIndex}-${itemIndex}-${item.src}`}
                className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
                style={{ marginBottom: '20px' }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setLightboxIndex(itemIndex)}
              >
                <div className="relative w-full" style={{
                  paddingBottom: imageHeights[item.src]
                    ? `${imageHeights[item.src] * 100}%`
                    : '100%',
                  backgroundColor: '#1a1a1a'
                }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={colIndex === 0 && itemIndex < 2}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-lg transition-all duration-500"
                    quality={90}
                    onLoad={(e) => handleImageLoad(e, item.src)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                fill
                className="object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4">{galleryItems[lightboxIndex].alt}</p>

              {/* Navigation Buttons */}
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
              >
                ◀
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2"
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : prev))}
              >
                ▶
              </button>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
                onClick={() => setLightboxIndex(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
