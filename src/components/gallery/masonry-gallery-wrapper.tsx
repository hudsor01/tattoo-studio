'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Import masonry gallery only on the client side with ssr: false
const MasonryGallery = dynamic(
  () => import('@/components/gallery/masonry-gallery'),
  {
    ssr: false,
    loading: () => <GalleryFallback />
  }
);

// Fallback component to show while the client-side component is loading
// or when rendering on the server
function GalleryFallback() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg" />
      ))}
    </div>
  );
}

type GalleryItem = {
  src: string;
  alt: string;
};

interface MasonryGalleryWrapperProps {
  galleryItems: GalleryItem[];
}

export function MasonryGalleryWrapper({ galleryItems }: MasonryGalleryWrapperProps) {
  // Client-side only rendering with useEffect
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <GalleryFallback />;
  }

  return <MasonryGallery items={galleryItems} />;
}
