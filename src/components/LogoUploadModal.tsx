import React, { useRef, useState } from 'react';
import { X, Upload, Check, Trash2, Image as ImageIcon, ShieldCheck } from 'lucide-react';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  customLogoUrl: string | null;
  onLogoChange: (url: string | null) => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({
  isOpen,
  onClose,
  customLogoUrl,
  onLogoChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onLogoChange(result);
      try {
        localStorage.setItem('vvs_custom_logo', result);
      } catch (err) {
        console.warn('Could not store logo in localStorage:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onLogoChange(null);
    try {
      localStorage.removeItem('vvs_custom_logo');
    } catch (err) {}
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/25 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-md w-full overflow-hidden shadow-2xl shadow-emerald-950/20 border border-white/60 flex flex-col">
        {/* Header */}
        <div className="bg-[#2d5a47] text-white px-6 py-4 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl text-emerald-200">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold">Official Business Logo</h2>
              <p className="text-xs text-emerald-200">Valley Veterinary Surgery</p>
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
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-[#2c3e50] leading-relaxed">
            Per the brand specifications, you can upload the clinic's real logo image file (PNG, JPG, or SVG) to display throughout this application.
          </p>

          {/* Current Logo Preview */}
          <div className="p-5 bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 flex flex-col items-center justify-center text-center shadow-xs">
            {customLogoUrl ? (
              <div className="space-y-3">
                <img
                  src={customLogoUrl}
                  alt="Custom Clinic Logo"
                  className="max-h-24 max-w-full object-contain mx-auto rounded-2xl bg-white p-2 border border-white/80 shadow-2xs"
                />
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#2d5a47] font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Real Clinic Logo Active</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-2">
                <div className="w-16 h-16 rounded-2xl bg-[#2d5a47] text-emerald-200 flex items-center justify-center mx-auto shadow-md shadow-[#2d5a47]/20 font-display font-bold text-xl border border-white/40">
                  VVS
                </div>
                <p className="text-xs text-[#5a7d6e] font-semibold">Default Branded Crest</p>
              </div>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          {/* Upload Button */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="logo-upload-input"
            />
            <label
              htmlFor="logo-upload-input"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2d5a47] hover:bg-[#234738] text-white rounded-full font-bold text-xs cursor-pointer transition-all shadow-md shadow-[#2d5a47]/20 active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Real Logo File</span>
            </label>

            {customLogoUrl && (
              <button
                type="button"
                onClick={handleRemove}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-white/70 hover:bg-white text-stone-700 border border-white/80 rounded-full text-xs font-semibold transition-all shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                <span>Reset to Default Logo Mark</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/60 backdrop-blur-md px-6 py-3.5 border-t border-white/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#2d5a47] text-white text-xs font-bold rounded-full hover:bg-[#234738] shadow-xs transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
