'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import masonry gallery only on the client side
const MasonryGallery = dynamic(
  () => import('@/components/gallery/masonry-gallery'),
  { ssr: false }
);

type GalleryItem = {
  src: string;
  alt: string;
};

interface MasonryGalleryWrapperProps {
  galleryItems: GalleryItem[];
}

export function MasonryGalleryWrapper({ galleryItems }: MasonryGalleryWrapperProps) {
  return <MasonryGallery items={galleryItems} />;
}
