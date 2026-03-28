import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// Portfolio reference data — replace imageUrl + link when real projects exist
// ---------------------------------------------------------------------------
const accordionItems = [
  {
    id: 1,
    title: 'PPC kampaně',
    category: 'Google Ads · Sklik',
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'SEO optimalizace',
    category: 'Organický růst',
    imageUrl:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'META reklama',
    category: 'Facebook · Instagram',
    imageUrl:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'Tvorba webů',
    category: 'Design · Vývoj',
    imageUrl:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 5,
    title: 'Datová analytika',
    category: 'GA4 · Looker Studio',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AccordionItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}

interface AccordionItemProps {
  item: AccordionItem;
  isActive: boolean;
  onMouseEnter: () => void;
}

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => (
  <a
    href={item.link}
    className={[
      'relative h-[480px] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0',
      'transition-all duration-700 ease-in-out',
      'border border-white/5 hover:border-[#00fffa]/20',
      isActive ? 'w-[380px]' : 'w-[60px]',
    ].join(' ')}
    onMouseEnter={onMouseEnter}
  >
    {/* Image */}
    <img
      src={item.imageUrl}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://placehold.co/380x480/111827/ffffff?text=Coming+Soon';
      }}
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

    {/* Coming soon badge */}
    {isActive && (
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/10 bg-black/40 backdrop-blur-sm">
        Připravujeme
      </div>
    )}

    {/* Active state: bottom text */}
    {isActive && (
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-[#00fffa] text-xs font-semibold uppercase tracking-widest mb-1">
          {item.category}
        </p>
        <h3 className="text-white text-xl font-black">{item.title}</h3>
      </div>
    )}

    {/* Inactive state: rotated label */}
    {!isActive && (
      <span className="absolute bottom-24 left-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap text-white/60 text-sm font-semibold">
        {item.title}
      </span>
    )}
  </a>
);

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 lg:py-36 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#00fffa] text-xs font-bold uppercase tracking-widest mb-3">
            Reference
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Projekty, na které jsme hrdí
          </h2>
          <p className="text-slate-400 text-lg">
            Nahlédněte do naší práce. Každý projekt byl navržen s jediným cílem — přinést výsledky.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-row items-center justify-center gap-3 overflow-x-auto pb-4">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-semibold text-base text-[#0a1628]"
            style={{
              background: 'linear-gradient(135deg, #00fffa, #00c8c4)',
              boxShadow: '0 0 20px rgba(0,255,250,0.35)',
            }}
          >
            Chcete být dalším příkladem?
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
