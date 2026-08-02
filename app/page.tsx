"use client";

import { useState } from 'react';
import {
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
  Sofa,
  Lamp,
  Palette as PaletteIcon,
  Clock,
  Truck,
  Shield,
  RefreshCw,
  ArrowUpRight,
  Sparkles,
  Quote
} from 'lucide-react';

// Social icons
function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5V12h3.5l-.5 3H11.5v6.5h-3V15H7v-3h1.5v-2.2C8.5 7.5 10 6 12.5 6H15v2.5Z" />
    </svg>
  );
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 4l7.2 9.6L4.4 20H6l6-6.5 4.6 6.5H20l-7.5-10L19 4h-1.6l-5.5 6-4.2-6H4Zm2.4 1.4h2.1l9.1 13.2h-2.1L6.4 5.4Z" />
    </svg>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);

  const navLinks = ['Home', 'Shop', 'Blog', 'About', 'Contact'];
  const categories = ['All', 'Lighting', 'Furniture', 'Decor', 'Textiles', 'Plants'];

  const heroSlides = [
    {
      eyebrow: 'THE WINTER SALE',
      detail: 'NOW THROUGH 10/25',
      headline: '25% OFF EVERYTHING',
      cta: 'SHOP NOW'
    },
    {
      eyebrow: 'NEW ARRIVALS',
      detail: 'JUST LANDED',
      headline: 'The Autumn Edit',
      cta: 'View Collection'
    }
  ];

  const shopTiles = [
    {
      name: 'shop candles',
      image: 'https://i.pinimg.com/736x/21/cb/57/21cb576b1d229d2c9a01c71ae0f680c2.jpg'
    },
    {
      name: 'shop vases',
      image: 'https://i.pinimg.com/736x/f1/73/eb/f173ebac450e69bc939ac98fde3ab6fc.jpg'
    },
    {
      name: 'shop wall decor',
      image: 'https://i.pinimg.com/736x/c9/cd/ec/c9cdec2631064c5aaf46a191568420bb.jpg'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Luxury Resin Wall Clock',
      price: '$2,299',
      rating: 4.8,
      reviews: 234,
      image: 'https://i.pinimg.com/736x/ac/af/2a/acaf2a245434df67ebddb1d52a84bedb.jpg',
      category: 'Decor',
      isNew: true
    },
    {
      id: 2,
      name: 'Modern Arc Floor Lamp',
      price: '$349',
      rating: 4.6,
      reviews: 189,
      image: 'https://i.pinimg.com/1200x/cb/22/b4/cb22b40911674f4d60b2a1d54ca0a510.jpg',
      category: 'Lighting',
      isNew: false
    },
    {
      id: 3,
      name: 'Abstract Green Art Set',
      price: '$599',
      rating: 4.9,
      reviews: 312,
      image: 'https://i.pinimg.com/736x/67/b9/74/67b9749261ccf04bfcf137f92a26f477.jpg',
      category: 'Decor',
      isNew: true
    },
    {
      id: 4,
      name: 'Luxury Wool Rug',
      price: '$899',
      rating: 4.7,
      reviews: 167,
      image: 'https://i.pinimg.com/736x/95/fc/47/95fc4741a3633e6cff197ec7214ae8ec.jpg',
      category: 'Textiles',
      isNew: false
    }
  ];

  const testimonials = [
    {
      quote: "Every piece feels considered. My living room finally looks like the mood board I've been carrying around for years.",
      name: 'Meera K.',
      role: 'Verified customer'
    },
    {
      quote: 'The quality is a different tier entirely. Packaging alone told me this was a brand that cares about the details.',
      name: 'Daniel R.',
      role: 'Verified customer'
    },
    {
      quote: 'Ordered the arc lamp on a whim — it is now the first thing guests ask about when they walk in.',
      name: 'Priya S.',
      role: 'Verified customer'
    }
  ];

  const galleryImages = [
    'https://i.pinimg.com/736x/27/44/7f/27447f08566e672c8628849290795b9e.jpg',
    'https://i.pinimg.com/736x/37/7d/70/377d70624a628a598f77416c7cce7676.jpg',
    'https://i.pinimg.com/736x/ab/1a/cd/ab1acd185e03798f6e1de90830aa5dab.jpg',
    'https://i.pinimg.com/736x/70/ed/06/70ed0645fada5f61daa98db53c6830d0.jpg',
    'https://i.pinimg.com/736x/e2/24/56/e22456c4bce868c4c3f3f0ce39399f66.jpg',
    'https://i.pinimg.com/736x/8f/c8/c5/8fc8c5974b7ff2fb567aba0f2ac14538.jpg'
  ];

  const slide = heroSlides[heroSlide];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        body { font-family: 'Manrope', sans-serif; }
      `}</style>

   

      {/* Hero banner - NOVALIE style with white background */}
      <section className="px-4 pb-6 pt-6 md:px-8 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-1xl ring-1 ring-[#6F7C8F]/15 sm:grid-cols-5">
            <div className="relative sm:col-span-2">
              <img
                src="https://i.pinimg.com/1200x/96/50/51/9650512c275776f55168edbb5c0a4a3d.jpg"
                alt="Home decor styling"
                className="h-[220px] w-full object-cover sm:h-full"
              />
            </div>

            <div className="flex flex-col items-center justify-center bg-[#6F7C8F] px-8 py-14 text-center sm:col-span-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-white/70">{slide.detail}</span>
              <span className="font-display text-[30px] font-medium italic leading-tight text-white md:text-[40px]">
                {slide.eyebrow}
              </span>
              <h2 className="mt-1 font-display text-[28px] font-medium text-white md:text-[34px]">
                {slide.headline}
              </h2>
              <button className="mt-8 rounded-full bg-white px-10 py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-[#6F7C8F] transition hover:bg-white/90 hover:scale-105">
                {slide.cta}
              </button>
            </div>

<div className="flex flex-col gap-2 sm:col-span-1">
  <img
    src="https://i.pinimg.com/736x/f5/1c/5b/f51c5ba0792f553ce19bb3a1a5d7b678.jpg"
    className="flex-1 w-full object-cover border-8 border-white"
  />
  <img
    src="https://i.pinimg.com/1200x/9a/0c/26/9a0c2691100ecd883f06faa7438eb946.jpg"
    className="flex-1 w-full object-cover border-8 border-white"
  />
  <img
    src="https://i.pinimg.com/736x/71/5a/ae/715aaed7f525a1a92f2c0318eb46ad3e.jpg"
    className="flex-1 w-full object-cover border-8 border-white"
  />
</div>
          </div>

          {/* Slide controls */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[#6F7C8F]/25 transition hover:bg-[#6F7C8F] hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-[#4F5A6B]" />
            </button>
            <div className="flex gap-1.5">
              {heroSlides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === heroSlide ? 'w-5 bg-[#6F7C8F]' : 'w-1.5 bg-[#6F7C8F]/25'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setHeroSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-[#6F7C8F]/25 transition hover:bg-[#6F7C8F] hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-3.5 w-3.5 text-[#4F5A6B]" />
            </button>
          </div>
        </div>
      </section>

      {/* Shop tiles row - NOVALIE style */}
      <section className="px-4 pb-10 pt-6 md:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {shopTiles.map((tile) => (
              <div key={tile.name} className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2 ring-1 ring-[#6F7C8F]/12">
                <img
                  src={tile.image}
                  alt={tile.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#6F7C8F]/85 py-3 text-center backdrop-blur-sm">
                  <span className="text-[12px] font-medium tracking-[0.1em] text-white">{tile.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute -bottom-2 right-3 flex h-9 w-9 translate-y-full items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-[#6F7C8F]/15 transition hover:bg-[#6F7C8F] hover:text-white sm:bottom-3">
            <ArrowUpRight className="h-4 w-4 text-[#4F5A6B]" />
          </button>
        </div>
      </section>

      {/* Trust features - NOVALIE style on white */}
      <section className="border-y border-[#6F7C8F]/12 bg-[#F5F6F8] px-4 py-12 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 md:grid-cols-4">
          {[
            { icon: Truck, label: 'Complimentary Delivery', desc: 'On orders over $100' },
            { icon: Shield, label: 'Secure Checkout', desc: '100% protected' },
            { icon: RefreshCw, label: 'Hassle-Free Returns', desc: '30-day guarantee' },
            { icon: Clock, label: 'Concierge Support', desc: 'Dedicated team' }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6F7C8F]/10 ring-1 ring-[#6F7C8F]/20">
                <feature.icon className="h-4 w-4 text-[#6F7C8F]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#3A424E]">{feature.label}</p>
                <p className="mt-0.5 text-xs text-[#6F7C8F]/55">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section - NOVALIE style on white */}
      <section className="relative px-4 py-24 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6F7C8F]">
              Categories
            </span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#3A424E]">
              Shop by <span className="italic text-[#6F7C8F]">Style</span>
            </h2>
            <p className="mt-3 text-sm text-[#6F7C8F]/55">Find what speaks to your aesthetic</p>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { name: 'Lighting', icon: Lamp },
              { name: 'Furniture', icon: Sofa },
              { name: 'Decor', icon: PaletteIcon },
              { name: 'Textiles', icon: RefreshCw }
            ].map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer rounded-3xl bg-[#F5F6F8] p-10 text-center ring-1 ring-[#6F7C8F]/10 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:ring-[#6F7C8F]/30 hover:shadow-2xl hover:shadow-[#6F7C8F]/10"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#6F7C8F]/10 ring-1 ring-[#6F7C8F]/20 transition duration-300 group-hover:scale-110 group-hover:bg-[#6F7C8F] group-hover:ring-[#6F7C8F]">
                  <category.icon className="h-6 w-6 text-[#6F7C8F] transition group-hover:text-white" />
                </div>
                <p className="font-display text-[16px] font-medium text-[#3A424E]">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - NOVALIE style on white */}
      <section className="relative px-4 py-24 md:px-8">
        <div className="container relative mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6F7C8F]">
              Curated Selection
            </span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-[#3A424E]">
              Featured <span className="italic text-[#6F7C8F]">Pieces</span>
            </h2>
            <p className="mt-3 text-sm text-[#6F7C8F]/55">Handpicked for the discerning eye</p>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeCategory === cat
                      ? 'bg-[#6F7C8F] text-white'
                      : 'bg-[#F5F6F8] text-[#6F7C8F]/70 ring-1 ring-[#6F7C8F]/12 hover:bg-white hover:text-[#3A424E]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative rounded-3xl bg-[#F5F6F8] ring-1 ring-[#6F7C8F]/10 transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:ring-[#6F7C8F]/25 hover:shadow-2xl hover:shadow-[#6F7C8F]/10">
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A424E]/25 via-transparent to-transparent" />
                  {product.isNew && (
                    <span className="absolute left-5 top-5 rounded-full bg-[#6F7C8F] px-3 py-1 text-[11px] font-medium tracking-wide text-white shadow-sm">
                      New
                    </span>
                  )}
                  <button className="absolute right-5 top-5 rounded-full bg-white/85 p-2.5 backdrop-blur-sm transition hover:bg-white hover:scale-110">
                    <Heart className="h-4 w-4 text-[#3A424E]" />
                  </button>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-[16px] font-medium text-[#3A424E]">{product.name}</h3>
                    <p className="font-medium text-[#6F7C8F]">{product.price}</p>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#6F7C8F] text-[#6F7C8F]" />
                    <span className="text-sm font-medium text-[#6F7C8F]/80">{product.rating}</span>
                    <span className="text-sm text-[#6F7C8F]/40">({product.reviews})</span>
                  </div>
                  <button className="mt-5 w-full rounded-full border border-[#6F7C8F]/25 bg-white py-3 text-sm font-medium tracking-wide text-[#3A424E] transition hover:border-[#6F7C8F] hover:bg-[#6F7C8F] hover:text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NOVALIE style on white */}
      <section className="relative px-4 py-24 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6F7C8F]">
            In Their Words
          </span>
          <h2 className="mt-3 font-display text-4xl font-medium text-[#3A424E]">
            Loved by Our Community
          </h2>

          <div className="relative mt-12 rounded-3xl bg-[#F5F6F8] p-10 ring-1 ring-[#6F7C8F]/10 md:p-14">
            <Quote className="mx-auto h-7 w-7 text-[#6F7C8F]/50" />
            <p className="mt-6 font-display text-[22px] italic leading-relaxed text-[#3A424E] md:text-[24px]">
              {testimonials[testimonialIndex].quote}
            </p>
            <p className="mt-6 text-sm font-semibold text-[#3A424E]">{testimonials[testimonialIndex].name}</p>
            <p className="text-xs text-[#6F7C8F]/55">{testimonials[testimonialIndex].role}</p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-[#6F7C8F]/20 transition hover:bg-[#6F7C8F] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 text-[#4F5A6B]" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      i === testimonialIndex ? 'w-5 bg-[#6F7C8F]' : 'bg-[#6F7C8F]/25'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-[#6F7C8F]/20 transition hover:bg-[#6F7C8F] hover:text-white"
              >
                <ChevronRight className="h-4 w-4 text-[#4F5A6B]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - NOVALIE style on white */}
      <section className="relative px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6F7C8F]">
            Community Styling
          </span>
          <h2 className="mt-3 font-display text-4xl font-medium text-[#3A424E]">@novalie.home</h2>
          <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-[#6F7C8F]/12">
                <img src={img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center bg-[#3A424E]/0 transition group-hover:bg-[#3A424E]/40">
                  <Instagram className="h-5 w-5 text-white opacity-0 transition group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA banner - NOVALIE style with white background */}
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#6F7C8F]">
          <div className="flex flex-col items-center gap-8 px-8 py-14 sm:flex-row sm:justify-between sm:px-14">
            <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
              <ArrowUpRight className="h-4 w-4" />
              Visit Site
            </a>
            <div className="text-center sm:text-right">
              <h2 className="font-display text-[30px] font-medium text-white md:text-[36px]">
                Join the Email List
              </h2>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/25 sm:w-64"
                />
                <button className="rounded-full bg-white px-7 py-3 text-[13px] font-semibold tracking-wide text-[#6F7C8F] transition hover:bg-white/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Floating button */}
      <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#6F7C8F] shadow-xl shadow-[#6F7C8F]/30 transition hover:bg-[#5C6879]">
        <Sparkles className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}