import React from 'react';
import { Phone, Calendar, ExternalLink, ShieldAlert, Heart, Mail } from 'lucide-react';
import { CLINIC_LOCATIONS, CLINIC_LINKS } from '../data/valleyVetData';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="sticky bottom-0 z-30 bg-[#2d5a47] text-white border-t border-white/20 shadow-2xl">
      {/* Main footer container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Clinic Phone Numbers (3 Locations) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full lg:w-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300/80 hidden xl:inline">
              Call Surgery:
            </span>

            {CLINIC_LOCATIONS.map((clinic) => (
              <a
                key={clinic.id}
                href={clinic.telHref}
                className="group flex flex-col items-start px-2 py-0.5 rounded-lg hover:bg-white/10 transition-all"
                title={`${clinic.name}: ${clinic.address}`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 opacity-90">
                    {clinic.suburb}
                  </span>
                  {clinic.isEmergencyBase && (
                    <span className="text-[9px] bg-amber-400 text-amber-950 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                      24/7 Base
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-bold text-white group-hover:text-emerald-200 transition-colors">
                  <Phone className="w-3 h-3 text-emerald-300 opacity-80" />
                  <span>{clinic.phone}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Direct Actions: Book Online + Pet Portal + Contact */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto">
            <a
              href={CLINIC_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-white text-[#2d5a47] px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-tight shadow-lg hover:bg-emerald-50 transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-[#2d5a47]" />
              <span>Book Online Anytime</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={CLINIC_LINKS.petPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 transition-all border border-white/15 hidden sm:inline-flex"
            >
              <span>Pet Portal</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 transition-all border border-white/15"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
