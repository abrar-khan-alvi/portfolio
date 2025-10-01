import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Camera, Music, ExternalLink, Youtube } from 'lucide-react';

const CreativeGUI = ({ onSwitchMode }) => {
  // IMPORTANT: Place your photos in the `public` folder and update the paths below.
  // For example, if you have `public/my-photo.jpg`, the path should be "/my-photo.jpg".
  const photos = [
    { id: 1, src: "/photo1.jpg", alt: "A photo of a scenic landscape" },
    { id: 2, src: "/photo2.jpg", alt: "A close-up nature shot" },
    { id: 3, src: "/photo3.jpg", alt: "An architectural detail" },
    { id: 4, src: "/photo4.jpg", alt: "A vibrant street scene" },
  ];
  
  const youtubeChannelUrl = "https://www.youtube.com/@alvi_saheb";

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Creative Outlet
          </h1>
          <button
            onClick={onSwitchMode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Terminal className="w-4 h-4" /> Exit to Terminal
          </button>
        </header>
        <div className="max-w-6xl mx-auto">
          <p className="text-xl mb-12 text-center text-gray-300">
            "Exploring the world through a lens and a melody."
          </p>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">Photography</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                  onClick={() => window.open(photo.src, "_blank")}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 bg-gray-800"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">Shot on Pixel 7 Pro</p>
          </section>
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">Music & Cover Songs</h2>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <p className="mb-4 text-gray-300">Check out my YouTube channel where I post cover songs, exploring various genres and artists.</p>
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold"
              >
                <Youtube className="w-5 h-5" />
                Visit Alvi Saheb's Channel
              </a>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default CreativeGUI;