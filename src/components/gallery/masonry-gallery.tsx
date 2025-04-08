'use client';

import React from 'react';
import { Masonry } from 'masonic';
import Image from 'next/image';
import { useWindowSize } from '@/hooks/use-window-size';

type GalleryItem = {
  src: string;
  alt: string;
};

interface MasonryGalleryProps {
  items: GalleryItem[];
}

const MasonryCard = ({ data }: { data: GalleryItem }) => (
  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <Image
      src={data.src}
      alt={data.alt}
      width={300}
      height={200}
      className="object-cover w-full h-auto"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <span className="text-white text-sm font-medium">{data.alt}</span>
    </div>
  </div>
);

export default function MasonryGallery({ items }: MasonryGalleryProps) {
  const { width } = useWindowSize();

  // Calculate columns based on screen width
  const getColumnWidth = () => {
    if (width) {
      if (width < 640) return width / 2 - 16;
      if (width < 1024) return width / 3 - 16;
      return width / 4 - 16;
    }
    return 300;
  };

  return (
    <Masonry
      items={items}
      columnGutter={16}
      columnWidth={getColumnWidth()}
      overscanBy={2}
      render={MasonryCard}
    />
  );
}
