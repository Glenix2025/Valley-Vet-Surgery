import React from 'react';
import { X, MapPin, Phone, Clock, Stethoscope, ShieldAlert, Navigation, Calendar } from 'lucide-react';
import { CLINIC_LOCATIONS, GENERAL_HOURS, CLINIC_LINKS } from '../data/valleyVetData';

interface ClinicDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicDirectoryModal: React.FC<ClinicDirectoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/25 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-emerald-950/20 border border-white/60 flex flex-col">
        {/* Header */}
        <div className="bg-[#2d5a47] text-white px-6 py-4 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl text-emerald-200">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold">Clinic Locations & Hours</h2>
              <p className="text-xs text-emerald-200">Serving the Mackay, Walkerston & Marian regions for over 22 years</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* General Hours summary card */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/80 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-[#2d5a47] font-semibold text-sm mb-1">
                <Clock className="w-4 h-4 text-[#2d5a47]" />
                <span>General Clinic Opening Hours</span>
              </div>
              <p className="text-xs text-[#2c3e50]">
                <strong>Mon - Fri:</strong> 8:00am - 6:00pm &nbsp;|&nbsp; <strong>Sat:</strong> 8:00am - 12:00pm &nbsp;|&nbsp; <strong>Sun:</strong> Closed
              </p>
              <p className="text-xs text-stone-500 mt-1">
                <strong>Consulting Hours:</strong> Mon - Fri 8:00am - 11:00am & 3:00pm - 6:00pm | Sat 8:00am - 12:00pm
              </p>
            </div>

            <a
              href="tel:0749142404"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500/15 border border-amber-300/60 rounded-full text-xs font-bold text-amber-900 hover:bg-amber-500/25 transition-colors flex-shrink-0"
            >
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Marian After-Hours: (07) 4914 2404</span>
            </a>
          </div>

          {/* Three Clinic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CLINIC_LOCATIONS.map((clinic) => (
              <div
                key={clinic.id}
                className={`rounded-2xl p-4 border flex flex-col justify-between transition-all backdrop-blur-md ${
                  clinic.isEmergencyBase
                    ? 'bg-amber-50/70 border-amber-200/80 hover:border-amber-300 shadow-sm'
                    : 'bg-white/80 border-white/80 hover:border-emerald-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <h3 className="font-display font-bold text-base text-[#2d5a47]">
                      {clinic.suburb} Surgery
                    </h3>
                    {clinic.isEmergencyBase && (
                      <span className="text-[9px] uppercase font-bold bg-amber-300/80 text-amber-950 px-2 py-0.5 rounded-full">
                        24/7 Base
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-[#2c3e50]">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                      <span>{clinic.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#2d5a47] flex-shrink-0" />
                      <a
                        href={clinic.telHref}
                        className="font-bold text-[#2d5a47] hover:underline font-mono"
                      >
                        {clinic.formattedPhone}
                      </a>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="mt-3 pt-3 border-t border-stone-200/60">
                    <div className="text-[11px] font-semibold text-[#5a7d6e] mb-1.5">Special Services:</div>
                    <div className="flex flex-wrap gap-1">
                      {clinic.specialFeatures.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 bg-stone-100/80 text-[#2c3e50] rounded-full font-medium"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      'Valley Veterinary Surgery ' + clinic.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5a7d6e] hover:text-[#2d5a47]"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>

                  <a
                    href={clinic.telHref}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#2d5a47]/10 text-[#2d5a47] rounded-full font-bold text-xs hover:bg-[#2d5a47]/20 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/60 backdrop-blur-md px-6 py-3.5 border-t border-white/60 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-stone-500">
            Online booking available 24/7 for all three locations.
          </div>
          <div className="flex items-center gap-2">
            <a
              href={CLINIC_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#2d5a47] text-white rounded-full text-xs font-bold hover:bg-[#234738] shadow-md shadow-[#2d5a47]/20 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-200/80 text-stone-700 rounded-full text-xs font-medium hover:bg-stone-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
