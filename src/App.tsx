/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWindow } from './components/ChatWindow';
import { ClinicDirectoryModal } from './components/ClinicDirectoryModal';
import { FAQBrowseModal } from './components/FAQBrowseModal';
import { ContactFormModal } from './components/ContactFormModal';
import { LogoUploadModal } from './components/LogoUploadModal';

export default function App() {
  const [isClinicsModalOpen, setIsClinicsModalOpen] = useState(false);
  const [isFAQsModalOpen, setIsFAQsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [selectedInitialQuestion, setSelectedInitialQuestion] = useState<string | null>(null);

  // Load custom logo if stored in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vvs_custom_logo');
      if (stored) {
        setCustomLogoUrl(stored);
      }
    } catch (err) {}
  }, []);

  const handleSelectFAQQuestion = (question: string) => {
    setSelectedInitialQuestion(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf8] text-[#2c3e50] selection:bg-emerald-200 selection:text-emerald-950 font-sans relative overflow-x-hidden">
      {/* Frosted Glass ambient background blurred gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-8%] left-[-8%] w-[55%] h-[55%] bg-[#e6f2ed] rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#e1f0f7] rounded-full blur-[110px] opacity-60"></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-[#f0f7f3] rounded-full blur-[90px] opacity-40"></div>
      </div>

      {/* Short Header with frosted glass style */}
      <div className="relative z-20">
        <Header
          onOpenClinics={() => setIsClinicsModalOpen(true)}
          onOpenFAQs={() => setIsFAQsModalOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenLogoModal={() => setIsLogoModalOpen(true)}
          customLogoUrl={customLogoUrl}
        />
      </div>

      {/* Main Chat Window taking up most of the screen */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <ChatWindow
          onOpenClinics={() => setIsClinicsModalOpen(true)}
          onOpenFAQs={() => setIsFAQsModalOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
          initialQuestion={selectedInitialQuestion}
          onClearInitialQuestion={() => setSelectedInitialQuestion(null)}
        />
      </main>

      {/* Persistent Footer */}
      <div className="relative z-20">
        <Footer onOpenContact={() => setIsContactModalOpen(true)} />
      </div>

      {/* Interactive Modals */}
      <ClinicDirectoryModal
        isOpen={isClinicsModalOpen}
        onClose={() => setIsClinicsModalOpen(false)}
      />

      <FAQBrowseModal
        isOpen={isFAQsModalOpen}
        onClose={() => setIsFAQsModalOpen(false)}
        onSelectQuestion={handleSelectFAQQuestion}
      />

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <LogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        customLogoUrl={customLogoUrl}
        onLogoChange={(url) => setCustomLogoUrl(url)}
      />
    </div>
  );
}
