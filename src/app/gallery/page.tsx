import React from 'react';
import { MasonryGalleryWrapper } from '@/components/gallery/masonry-gallery-wrapper';

const images = [
  '5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg',
  'IMG_2889.JPG',
  'IMG_2947.JPG',
  'IMG_3534.JPG',
  'IMG_3896.JPG',
  'IMG_3947.JPG',
  'IMG_4246.JPG',
  'IMG_4249.JPG',
  'IMG_4284.JPG',
  'IMG_4454.JPG',
  'business-card.jpg',
  'leg-piece.jpg'
];

// Create a data array with src and alt for each image
const galleryItems = images.map((img, index) => ({
  src: `/images/${img}`,
  alt: `Gallery image ${index + 1}`,
}));

export default function GalleryPage() {
  return (
    <main className="bg-tattoo-black min-h-screen">
      <div id="gallery-section" className="container max-w-7xl mx-auto px-4 py-4">
        <div className="text-center mb-12 mt-8">
          <h2 className="tattoo-section-title">
            Tattoo{' '}
            <span className="relative text-tattoo-red">
              Gallery
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-tattoo-red/80"></span>
            </span>
          </h2>
          <p className="tattoo-paragraph mx-auto max-w-3xl">
            Browse through my portfolio of custom tattoo creations.
          </p>
        </div>

        <MasonryGalleryWrapper galleryItems={galleryItems} />
      </div>
    </main>
  );
}
