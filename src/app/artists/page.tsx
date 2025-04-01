import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Artists | Tattoo Studio",
  description: "Meet our talented team of tattoo artists specializing in various styles",
};

const artists = [
  {
    id: "fernando",
    name: "Fernando",
    image: "/fernando-card.jpg",
    specialty: "Black & Grey Realism, Japanese",
    bio: "With over a decade of experience, Fernando has mastered the art of black and grey realism and Japanese style tattoos. His attention to detail and precision make him highly sought after for portrait work and large-scale pieces.",
    availableDays: "Tuesday - Saturday",
    instagram: "@fernando_tattoos",
    email: "fernando@tattoo-studio.com",
    featured: ["/IMG_3896.JPG", "/IMG_3947.JPG", "/IMG_4246.JPG"]
  },
  {
    id: "elena",
    name: "Elena",
    image: "/IMG_3534.JPG",
    specialty: "Neo-Traditional, Color Work",
    bio: "Elena brings vibrant energy to her neo-traditional designs. Her bold lines and bright colors create eye-catching pieces that stand the test of time. She specializes in animal designs and floral patterns.",
    availableDays: "Monday - Thursday",
    instagram: "@elena_ink",
    email: "elena@tattoo-studio.com",
    featured: ["/IMG_4249.JPG", "/IMG_4284.JPG", "/IMG_4454.JPG"]
  },
  {
    id: "marcus",
    name: "Marcus",
    image: "/IMG_2889.JPG",
    specialty: "Geometric, Blackwork",
    bio: "Marcus combines precision with creativity in his geometric and blackwork designs. His mathematical approach to tattooing creates stunning symmetrical pieces and complex patterns that flow beautifully with the body's natural contours.",
    availableDays: "Wednesday - Sunday",
    instagram: "@marcus_geometric",
    email: "marcus@tattoo-studio.com",
    featured: ["/IMG_2947.JPG", "/5082639F-3D97-45F8-8BFE-D28EBEE539DF.jpg", "/IMG_1610.HEIC"]
  }
];

export default function ArtistsPage() {
  return (
    <main className="bg-tattoo-black min-h-screen pb-16">
      {/* Header */}
      <div className="py-12 bg-gradient-to-b from-tattoo-black to-tattoo-black/90">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-tattoo-white mb-4">
            Our <span className="text-tattoo-red">Artists</span>
          </h1>
          <p className="text-xl text-tattoo-white/90 max-w-2xl mx-auto">
            Meet the talented team behind our exceptional tattoo work
          </p>
        </div>
      </div>
      
      {/* Artists Section */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-24">
          {artists.map((artist, index) => (
            <div 
              key={artist.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Artist Image */}
              <div className="md:w-1/3">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Artist Info */}
              <div className="md:w-2/3 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-tattoo-white">{artist.name}</h2>
                  <p className="text-tattoo-red font-medium">{artist.specialty}</p>
                </div>
                
                <p className="text-tattoo-white/80">
                  {artist.bio}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-tattoo-white/70">
                    <Calendar className="w-5 h-5 text-tattoo-blue" />
                    <span>{artist.availableDays}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-tattoo-white/70">
                    <Instagram className="w-5 h-5 text-tattoo-blue" />
                    <span>{artist.instagram}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-tattoo-white/70">
                    <Mail className="w-5 h-5 text-tattoo-blue" />
                    <span>{artist.email}</span>
                  </div>
                </div>
                
                {/* Featured Work */}
                <div>
                  <h3 className="text-xl font-semibold text-tattoo-white mb-4">Featured Work</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {artist.featured.map((image, idx) => (
                      <div key={idx} className="aspect-square relative rounded-md overflow-hidden">
                        <Image
                          src={image}
                          alt={`${artist.name}'s work ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-tattoo-red text-tattoo-white hover:bg-tattoo-red/90">
                    <Link href={`/book?artist=${artist.id}`}>Book With {artist.name}</Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="border-tattoo-white/20 text-tattoo-white hover:bg-tattoo-white/10">
                    <Link href={`/artists/${artist.id}`}>View Full Portfolio</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 md:px-6 mt-24">
        <div className="bg-tattoo-blue p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-tattoo-white mb-4">
            Can't Decide Which Artist?
          </h2>
          <p className="text-tattoo-white/90 max-w-2xl mx-auto mb-8">
            Submit your tattoo idea through our contact form, and we'll match you with the best artist for your style.
          </p>
          <Button asChild size="lg" className="bg-tattoo-white text-tattoo-blue hover:bg-tattoo-white/90">
            <Link href="/contact">Submit Your Idea</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
