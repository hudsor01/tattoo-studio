'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the MasonryGallery component with dynamic import and SSR disabled
// This is valid here because we're in a client component
const MasonryGallery = dynamic(
  () => import('@/components/gallery/masonry-gallery'),
  { ssr: false } // This option is valid inside a client component
);

type GalleryItem = {
  src: string;
  alt: string;
};

interface GalleryClientProps {
  galleryItems: GalleryItem[];
}

export default function GalleryClient({ galleryItems }: GalleryClientProps) {
  return <MasonryGallery galleryItems={galleryItems} />;
}
