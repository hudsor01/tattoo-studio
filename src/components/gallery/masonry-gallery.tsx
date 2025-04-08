'use client';

import React from 'react';
import { Masonry } from 'masonic';
import Image from 'next/image';
import { useWindowSize } from '@/hooks/use-window-size';
import type { JSX } from 'react'

type GalleryItem = {
  src: string;
  alt: string;
};

interface MasonryGalleryProps {
  items: GalleryItem[];
  columns?: number;
  overscanBy?: number;
  render?: ({ data }: { data: GalleryItem }) => JSX.Element;
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

export default function MasonryGallery({
  items,
  columns: columnsProp,
  overscanBy = 2,
  render = MasonryCard
}: MasonryGalleryProps) {
  const { width } = useWindowSize();

  // Calculate columns based on screen width or use the provided columns prop
  const getColumns = () => {
    if (columnsProp) return columnsProp;

    if (width) {
      if (width < 640) return 1;
      if (width < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const getColumnWidth = () => {
    if (!width) return 300;
    return Math.floor(width / getColumns()) - 16;
  };

  return (
    <Masonry
      items={items}
      columnCount={getColumns()}
      columnGutter={16}
      columnWidth={getColumnWidth()}
      overscanBy={overscanBy}
      render={render}
    />
  );
}
