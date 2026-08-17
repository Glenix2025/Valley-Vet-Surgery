import React from 'react';
import { Phone, ExternalLink, Calendar, ShieldAlert, Clock, MapPin, Sparkles, HelpCircle, Mail, Image as ImageIcon } from 'lucide-react';
import { CLINIC_LOCATIONS, CLINIC_LINKS } from '../data/valleyVetData';

interface HeaderProps {
  onOpenClinics: () => void;
  onOpenFAQs: () => void;
  onOpenContact: () => void;
  onOpenLogoModal: () => void;
  customLogoUrl: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenClinics,
  onOpenFAQs,
  onOpenContact,
  onOpenLogoModal,
  customLogoUrl,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/50 backdrop-blur-md border-b border-white/40 shadow-xs shadow-emerald-950/5">
      {/* Top emergency announcement bar */}
      <div className="bg-[#2d5a47]/95 backdrop-blur-md text-white text-xs py-1.5 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide text-white/90 text-[11px] sm:text-xs">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">Queensland Veterinary Practice:</span>
            <span className="font-semibold text-emerald-200">Mackay • Walkerston • Marian</span>
            <span className="opacity-60 hidden md:inline">| Over 22 Years of Pet Care</span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            <a
              href="tel:0749142404"
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-emerald-100 px-2.5 py-0.5 rounded-full transition-all font-medium border border-white/20 shadow-xs"
              title="Marian After-Hours On-Call Base"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden xs:inline">After-Hours On-Call:</span>
              <span className="font-semibold text-white font-mono">(07) 4914 2404</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Business Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenLogoModal}
              title="Click to customize or view clinic logo"
              className="group relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/40 rounded-2xl overflow-hidden"
            >
              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="Valley Veterinary Surgery Logo"
                  className="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-2xl bg-white/80 p-1 border border-white/60 shadow-xs"
                />
              ) : (
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#2d5a47] text-white flex items-center justify-center shadow-md shadow-[#2d5a47]/20 group-hover:scale-105 transition-transform border border-white/30">
                  <div className="text-center">
                    <span className="font-display font-extrabold text-lg sm:text-xl tracking-tighter text-emerald-200 block leading-none">
                      VVS
                    </span>
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-emerald-300">
                      VETS
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 text-white text-[9px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl font-medium">
                Logo
              </div>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-display font-bold text-[#2d5a47] tracking-tight leading-tight">
                  Valley Veterinary Surgery
                </h1>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#2d5a47]/10 text-[#2d5a47] border border-[#2d5a47]/15">
                  3 Locations
                </span>
              </div>
              <p className="text-xs uppercase tracking-wider text-[#5a7d6e] font-semibold">
                Compassionate care for your pets since 2002 • 22+ Years
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={onOpenClinics}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#2d5a47] bg-white/70 hover:bg-white transition-all border border-white/80 shadow-xs hover:shadow-sm"
              title="View clinic hours and address directory"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2d5a47]" />
              <span className="hidden md:inline">Clinics &</span> Hours
            </button>

            <button
              onClick={onOpenFAQs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#2c3e50] bg-white/70 hover:bg-white transition-all border border-white/80 shadow-xs hover:shadow-sm"
              title="Browse FAQ library"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#5a7d6e]" />
              <span className="hidden sm:inline">FAQ Guide</span>
              <span className="sm:hidden">FAQs</span>
            </button>

            <a
              href={CLINIC_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#2d5a47] hover:bg-[#234738] transition-all shadow-md shadow-[#2d5a47]/20 hover:shadow-lg active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
              <ExternalLink className="w-3 h-3 opacity-80 hidden sm:inline" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
