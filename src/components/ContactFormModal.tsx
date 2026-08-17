import React, { useState } from 'react';
import { X, Mail, Phone, Send, Calendar, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { CLINIC_LINKS, CLINIC_LOCATIONS } from '../data/valleyVetData';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Enquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'General Enquiry',
      message: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/25 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl shadow-emerald-950/20 border border-white/60 flex flex-col">
        {/* Header */}
        <div className="bg-[#2d5a47] text-white px-6 py-4 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl text-emerald-200">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold">Contact Valley Veterinary Surgery</h2>
              <p className="text-xs text-emerald-200">Email: {CLINIC_LINKS.email}</p>
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
          {/* Notice */}
          <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 flex items-start gap-2.5 text-xs text-[#2c3e50] shadow-xs">
            <Info className="w-4 h-4 text-[#2d5a47] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#2d5a47]">Need to book an appointment or have an urgent concern?</p>
              <p className="mt-0.5 leading-relaxed">
                For urgent pet care, call your nearest clinic immediately. For appointments, please use our{' '}
                <a
                  href={CLINIC_LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#2d5a47]"
                >
                  Online Booking System
                </a>.
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#2d5a47] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2d5a47]">Enquiry Form Demo Completed</h3>
              <p className="text-xs text-[#2c3e50] max-w-md mx-auto leading-relaxed">
                This is a demo representation of the clinic's contact structure. For actual general enquiries, you can email{' '}
                <a href={`mailto:${CLINIC_LINKS.email}`} className="text-[#2d5a47] font-semibold underline">
                  {CLINIC_LINKS.email}
                </a>{' '}
                or call one of our 3 clinics directly.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white/80 hover:bg-white text-[#2c3e50] border border-white/80 text-xs font-semibold rounded-full shadow-xs"
                >
                  Send Another Demo Enquiry
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-[#2d5a47] hover:bg-[#234738] text-white text-xs font-bold rounded-full shadow-md shadow-[#2d5a47]/20"
                >
                  Return to Chat
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#2d5a47] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/80 border border-white/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2d5a47] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/80 border border-white/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2d5a47] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0412 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/80 border border-white/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2d5a47] mb-1">Service or Topic</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/80 border border-white/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50]"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Puppy Preschool (Walkerston)">Puppy Preschool (Walkerston)</option>
                  <option value="Farm / Large Animal Visit">Farm / Large Animal Visit</option>
                  <option value="Orthopaedic / TPLO Surgery (Marian)">Orthopaedic / TPLO Surgery (Marian)</option>
                  <option value="Hendra Vaccination (Horses)">Hendra Vaccination (Horses)</option>
                  <option value="Desexing or Dental Care">Desexing or Dental Care</option>
                  <option value="Cost Estimate Request">Cost Estimate Request</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2d5a47] mb-1">Message *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can our veterinary team assist you and your animals?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/80 border border-white/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href={`mailto:${CLINIC_LINKS.email}?subject=${encodeURIComponent(
                    `Enquiry: ${formData.service}`
                  )}&body=${encodeURIComponent(
                    `Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
                  )}`}
                  className="inline-flex items-center gap-1.5 text-[#5a7d6e] hover:text-[#2d5a47] text-xs font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Email Client</span>
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#2d5a47] hover:bg-[#234738] text-white rounded-full font-bold text-xs shadow-md shadow-[#2d5a47]/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Demo Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
