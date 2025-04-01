import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gallery | Tattoo Studio',
  description: 'Browse our portfolio of custom tattoo designs and completed work',
}

// Define tattoo gallery items
const galleryItems = [
  {
    id: 1,
    src: '/IMG_3534.JPG',
    alt: 'Blackwork arm tattoo',
    category: 'blackwork',
  },
  {
    id: 2,
    src: '/IMG_3896.JPG',
    alt: 'Realistic portrait tattoo',
    category: 'realism',
  },
  {
    id: 3,
    src: '/IMG_3947.JPG',
    alt: 'Traditional rose tattoo',
    category: 'traditional',
  },
  {
    id: 4,
    src: '/IMG_4246.JPG',
    alt: 'Japanese inspired sleeve',
    category: 'japanese',
  },
  {
    id: 5,
    src: '/IMG_4249.JPG',
    alt: 'Black and gray shading',
    category: 'blackwork',
  },
  {
    id: 6,
    src: '/IMG_4284.JPG',
    alt: 'Geometric pattern design',
    category: 'geometric',
  },
  {
    id: 7,
    src: '/IMG_4454.JPG',
    alt: 'Script lettering tattoo',
    category: 'lettering',
  },
  {
    id: 8,
    src: '/IMG_2889.JPG',
    alt: 'Colorful abstract tattoo',
    category: 'color',
  },
  {
    id: 9,
    src: '/IMG_2947.JPG',
    alt: 'Fine line minimalist tattoo',
    category: 'fineline',
  },
]

export default function GalleryPage() {
  return (
    <main className='bg-tattoo-black min-h-screen pb-16'>
      {/* Header Banner */}
      <div className='relative h-[40vh] overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-tattoo-black to-transparent z-10' />

        <video
          src='/719B90A0-0A98-4AF4-A14C-949A52F82067.mov'
          className='w-full h-full object-cover'
          autoPlay
          muted
          loop
          playsInline
        />

        <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4'>
          <h1 className='text-4xl md:text-5xl font-bold text-tattoo-white mb-4'>
            Our <span className='text-tattoo-red'>Gallery</span>
          </h1>
          <p className='text-xl text-tattoo-white/90 max-w-2xl'>
            Browse through our collection of custom tattoo designs
          </p>
        </div>
      </div>

      {/* Gallery Filters */}
      <div className='container mx-auto px-4 md:px-6 py-8'>
        <div className='flex flex-wrap justify-center gap-2 mb-12'>
          <button className='px-4 py-2 rounded-full bg-tattoo-red text-tattoo-white hover:bg-opacity-90 transition-all'>
            All Styles
          </button>
          <button className='px-4 py-2 rounded-full bg-tattoo-black text-tattoo-white border border-tattoo-white/20 hover:border-tattoo-red transition-all'>
            Blackwork
          </button>
          <button className='px-4 py-2 rounded-full bg-tattoo-black text-tattoo-white border border-tattoo-white/20 hover:border-tattoo-red transition-all'>
            Traditional
          </button>
          <button className='px-4 py-2 rounded-full bg-tattoo-black text-tattoo-white border border-tattoo-white/20 hover:border-tattoo-red transition-all'>
            Japanese
          </button>
          <button className='px-4 py-2 rounded-full bg-tattoo-black text-tattoo-white border border-tattoo-white/20 hover:border-tattoo-red transition-all'>
            Realism
          </button>
          <button className='px-4 py-2 rounded-full bg-tattoo-black text-tattoo-white border border-tattoo-white/20 hover:border-tattoo-red transition-all'>
            Geometric
          </button>
          <button className='px-4 py-2 rounded-full bg-tattoo-black text-tattoo-white border border-tattoo-white/20 hover:border-tattoo-red transition-all'>
            Fine Line
          </button>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className='group relative aspect-square overflow-hidden rounded-lg cursor-pointer'
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-110'
              />

              <div className='absolute inset-0 bg-gradient-to-t from-tattoo-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                <span className='text-xs text-tattoo-red uppercase tracking-wider'>
                  {item.category}
                </span>
                <h3 className='text-tattoo-white font-medium'>{item.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Process Videos Section */}
        <div className='mt-20 text-center'>
          <h2 className='text-3xl font-bold text-tattoo-white mb-2'>
            Behind the <span className='text-tattoo-blue'>Scenes</span>
          </h2>
          <p className='text-tattoo-white/70 max-w-2xl mx-auto mb-10'>
            Watch our talented artists in action as they bring these designs to life
          </p>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='rounded-lg overflow-hidden'>
              <video
                src='/96E755BA-7D03-4883-BF07-085DB9F255AE.mov'
                className='w-full aspect-video object-cover'
                controls
                poster='/IMG_3534.JPG'
              />
              <div className='bg-tattoo-blue p-4 text-left'>
                <h3 className='text-white font-medium'>Precise Linework</h3>
                <p className='text-white/70 text-sm'>
                  Creating clean, consistent lines requires steady hands and years of practice
                </p>
              </div>
            </div>

            <div className='rounded-lg overflow-hidden'>
              <video
                src='/2880EC96-5AB2-4142-BEEB-B4ABCF32E04F.mov'
                className='w-full aspect-video object-cover'
                controls
                poster='/IMG_3947.JPG'
              />
              <div className='bg-tattoo-blue p-4 text-left'>
                <h3 className='text-white font-medium'>Color Blending</h3>
                <p className='text-white/70 text-sm'>
                  Watch how we create smooth color transitions and vibrant designs
                </p>
              </div>
            </div>

            <div className='rounded-lg overflow-hidden'>
              <video
                src='/6CED122B-3C95-4ED3-B803-A7BCDE5E5F2B.mov'
                className='w-full aspect-video object-cover'
                controls
                poster='/IMG_4454.JPG'
              />
              <div className='bg-tattoo-blue p-4 text-left'>
                <h3 className='text-white font-medium'>Shading Techniques</h3>
                <p className='text-white/70 text-sm'>
                  The art of creating depth and dimension through various shading methods
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='mt-20 text-center bg-tattoo-red py-12 px-6 rounded-lg'>
          <h2 className='text-3xl font-bold text-tattoo-white mb-4'>
            Ready to Create Your Own Masterpiece?
          </h2>
          <p className='text-tattoo-white/90 max-w-2xl mx-auto mb-8'>
            Schedule a consultation with our artists to start planning your custom tattoo
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a
              href='/book'
              className='px-6 py-3 bg-tattoo-black text-tattoo-white rounded-md hover:bg-opacity-90 transition-all'
            >
              Book Appointment
            </a>
            <a
              href='/contact'
              className='px-6 py-3 bg-transparent border border-tattoo-white text-tattoo-white rounded-md hover:bg-tattoo-white/10 transition-all'
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
