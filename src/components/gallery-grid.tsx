'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type GalleryImage = {
  src: string;
  alt: string;
  category?: string;
};

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    { src: '/IMG_1610.HEIC', alt: 'Detailed arm tattoo', category: 'Black and Grey' },
    { src: '/IMG_2889.JPG', alt: 'Greek-inspired circular tattoo', category: 'Black and Grey' },
    { src: '/IMG_2947.JPG', alt: 'Tattoo workspace', category: 'Studio' },
    { src: '/IMG_3534.JPG', alt: 'Detailed tattoo artwork', category: 'Black and Grey' },
    { src: '/IMG_3896.JPG', alt: 'Religious tattoo design', category: 'Black and Grey' },
    { src: '/IMG_3947.JPG', alt: 'Detailed portrait tattoo', category: 'Black and Grey' },
    { src: '/IMG_4246.JPG', alt: 'Fine line tattoo work', category: 'Black and Grey' },
    { src: '/IMG_4249.JPG', alt: 'Religious figure tattoo', category: 'Black and Grey' },
    { src: '/IMG_4284.JPG', alt: 'Detailed religious tattoo', category: 'Black and Grey' },
    { src: '/IMG_4454.JPG', alt: 'Portrait tattoo artwork', category: 'Black and Grey' },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg bg-tattoo-black/5 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tattoo-black/80 via-tattoo-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <span className="text-sm text-tattoo-white font-medium">{image.alt}</span>
              {image.category && (
                <span className="text-xs text-tattoo-white/70">{image.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-tattoo-black border-tattoo-white/10">
          {selectedImage && (
            <div className="relative aspect-square md:aspect-[4/3] w-full">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
