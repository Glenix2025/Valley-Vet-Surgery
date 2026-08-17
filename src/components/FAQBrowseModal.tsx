import React, { useState } from 'react';
import { X, Search, HelpCircle, MessageSquare, Check, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { FAQ_KNOWLEDGE_BASE, FAQItem } from '../data/valleyVetData';

interface FAQBrowseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (question: string) => void;
}

export const FAQBrowseModal: React.FC<FAQBrowseModalProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Clinic Info', 'Services & Surgery', 'Emergencies', 'Wellness & Farm', 'Booking & Policies'];

  const filteredFAQs = FAQ_KNOWLEDGE_BASE.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/25 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-emerald-950/20 border border-white/60 flex flex-col">
        {/* Header */}
        <div className="bg-[#2d5a47] text-white px-6 py-4 flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl text-emerald-200">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold">FAQ Knowledge Base (22 Topics)</h2>
              <p className="text-xs text-emerald-200">Official information verified for Valley Veterinary Surgery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 sm:p-5 bg-white/50 border-b border-white/60 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. snake bites, desexing, Walkerston hours, Hendra vaccine)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-full border border-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2d5a47] text-white shadow-xs'
                    : 'bg-white/70 text-[#2c3e50] border border-white/80 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of FAQs */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 text-stone-500">
              <p className="text-sm font-medium">No FAQ topics found matching "{searchTerm}"</p>
              <p className="text-xs mt-1">Try searching for hours, surgery, emergency, or booking.</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-4 hover:border-emerald-200 transition-all shadow-sm group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2d5a47]/10 text-[#2d5a47] border border-[#2d5a47]/15">
                      {faq.category}
                    </span>
                    <span className="text-xs font-semibold text-stone-400">#{faq.id}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-90">
                    <button
                      onClick={() => handleCopy(faq.id, `${faq.question}\n${faq.answer}`)}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors text-xs flex items-center gap-1"
                      title="Copy Q&A text"
                    >
                      {copiedId === faq.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="text-[11px] font-medium text-stone-500">Copy</span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onSelectQuestion(faq.question);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#2d5a47]/10 hover:bg-[#2d5a47]/20 text-[#2d5a47] rounded-full text-xs font-bold transition-colors"
                      title="Ask this in chat"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Ask Assistant</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#2d5a47] group-hover:text-[#234738] transition-colors">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#2c3e50] mt-1.5 leading-relaxed bg-white/60 p-3 rounded-xl border border-white/80">
                  {faq.answer}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-white/60 backdrop-blur-md px-6 py-3.5 border-t border-white/60 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Showing {filteredFAQs.length} of {FAQ_KNOWLEDGE_BASE.length} clinic topics
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200/80 text-stone-700 rounded-full text-xs font-semibold hover:bg-stone-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
