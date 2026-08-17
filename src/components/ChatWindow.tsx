import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  Calendar,
  Phone,
  MapPin,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  ExternalLink,
  Info,
  AlertTriangle,
  HeartHandshake,
  Stethoscope,
} from 'lucide-react';
import {
  SUGGESTED_QUESTIONS,
  CLINIC_LOCATIONS,
  CLINIC_LINKS,
  isEmergencyQuery,
  getLocalFallbackResponse,
} from '../data/valleyVetData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isEmergencyAlert?: boolean;
}

interface ChatWindowProps {
  onOpenClinics: () => void;
  onOpenFAQs: () => void;
  onOpenContact: () => void;
  initialQuestion?: string | null;
  onClearInitialQuestion?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  onOpenClinics,
  onOpenFAQs,
  onOpenContact,
  initialQuestion,
  onClearInitialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! I am Valley Vet Assistant. How can I help you today with information regarding our Mackay, Walkerston, or Marian surgeries, opening hours, services, or booking an appointment?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [lastEmergencyTriggered, setLastEmergencyTriggered] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external initial question trigger (from FAQ modal)
  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-AU';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const isEmergency = isEmergencyQuery(query);
    if (isEmergency) {
      setLastEmergencyTriggered(true);
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call server endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-8),
        }),
      });

      let assistantReplyText = '';
      if (response.ok) {
        const data = await response.json();
        assistantReplyText = data.reply || getLocalFallbackResponse(query);
      } else {
        // Fallback to local verified response engine
        assistantReplyText = getLocalFallbackResponse(query);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: assistantReplyText,
        timestamp: new Date(),
        isEmergencyAlert: isEmergency || isEmergencyQuery(assistantReplyText),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackText = getLocalFallbackResponse(query);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date(),
        isEmergencyAlert: isEmergency,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-AU';

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setLastEmergencyTriggered(false);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: 'Hello! I am Valley Vet Assistant. How can I help you today with information regarding our Mackay, Walkerston, or Marian surgeries, opening hours, services, or booking an appointment?',
        timestamp: new Date(),
      },
    ]);
  };

  // Helper to render contextual action badges below assistant replies
  const renderMessageActions = (text: string) => {
    const lower = text.toLowerCase();
    const actions = [];

    const isBookingRelated = lower.includes('book') || lower.includes('appointment') || lower.includes('apt.vet');
    const isEmergencyRelated =
      lower.includes('emergency') ||
      lower.includes('after-hours') ||
      lower.includes('on call') ||
      lower.includes('snake') ||
      lower.includes('tick') ||
      lower.includes('immediately');
    const isLocationRelated = lower.includes('mackay') || lower.includes('walkerston') || lower.includes('marian') || lower.includes('location');
    const isPreschoolRelated = lower.includes('puppy') || lower.includes('preschool');

    if (isEmergencyRelated) {
      actions.push(
        <a
          key="emergency-marian"
          href="tel:0749142404"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs animate-pulse"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Marian On-Call: (07) 4914 2404</span>
        </a>
      );
    }

    if (isBookingRelated) {
      actions.push(
        <a
          key="book-online"
          href={CLINIC_LINKS.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Open Booking (au.apt.vet)</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      );
    }

    if (isLocationRelated && !isEmergencyRelated) {
      actions.push(
        <button
          key="view-clinics"
          onClick={onOpenClinics}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors border border-stone-200"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          <span>View All 3 Clinics & Hours</span>
        </button>
      );
    }

    if (isPreschoolRelated) {
      actions.push(
        <a
          key="call-walkerston"
          href="tel:0749592099"
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold transition-colors border border-emerald-200"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Call Walkerston: (07) 4959 2099</span>
        </a>
      );
    }

    if (actions.length === 0) return null;

    return <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex flex-wrap gap-1.5">{actions}</div>;
  };

  return (
    <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto w-full px-3 sm:px-6 py-4">
      {/* Emergency Notice Banner if triggered */}
      {lastEmergencyTriggered && (
        <div className="mb-3 p-3.5 bg-red-500/10 backdrop-blur-md border border-red-300/60 rounded-2xl flex items-center justify-between gap-3 shadow-sm animate-bounce-short">
          <div className="flex items-center gap-2.5 text-red-900">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold">Medical Emergency Alert:</span> For urgent pet care, snake bites, or paralysis ticks, please call immediately.
            </div>
          </div>
          <a
            href="tel:0749142404"
            className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (07) 4914 2404</span>
          </a>
        </div>
      )}

      {/* Main Frosted Glass Chat Card */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-emerald-900/5 flex flex-col overflow-hidden min-h-[480px]">
        {/* Chat Inner Header */}
        <div className="bg-[#2d5a47]/5 px-5 sm:px-6 py-3 border-b border-white/40 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#2d5a47]">Valley Vet Assistant</span>
              <span className="text-[11px] text-[#5a7d6e] font-medium hidden sm:inline">• Active Now</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFAQs}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-[#2d5a47] bg-white/60 hover:bg-white transition-all border border-white/80 shadow-2xs"
              title="Browse all 22 verified clinic FAQs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2d5a47]" />
              <span>22 FAQs</span>
            </button>

            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-full text-gray-400 hover:text-[#2d5a47] hover:bg-white/60 transition-all"
              title="Restart Conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
              >
                {/* Message bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] leading-relaxed ${
                    isAssistant
                      ? msg.isEmergencyAlert
                        ? 'bg-amber-50/90 rounded-2xl rounded-tl-none p-4 shadow-sm border border-amber-200 text-[#2c3e50]'
                        : 'bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-emerald-100/80 text-[#2c3e50]'
                      : 'bg-[#2d5a47] text-white rounded-2xl rounded-tr-none p-4 shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {isAssistant && renderMessageActions(msg.text)}
                </div>

                {/* Subtitle / Timestamp */}
                <div className={`flex items-center gap-2 text-[10px] text-gray-400 mt-1 ${isAssistant ? 'ml-1' : 'mr-1'}`}>
                  <span>{isAssistant ? 'Valley Vet Assistant' : 'You'}</span>
                  <span>•</span>
                  <span>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {isAssistant && (
                    <div className="flex items-center gap-1 ml-1 opacity-70 hover:opacity-100">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-[#2d5a47] p-0.5 rounded transition-colors"
                        title="Copy message"
                      >
                        {copiedMessageId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {'speechSynthesis' in window && (
                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className={`hover:text-[#2d5a47] p-0.5 rounded transition-colors ${
                            speakingId === msg.id ? 'text-emerald-700 animate-pulse' : ''
                          }`}
                          title={speakingId === msg.id ? 'Stop reading' : 'Read aloud'}
                        >
                          {speakingId === msg.id ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-emerald-100/80 max-w-[80%]">
                <div className="flex items-center gap-2 text-xs text-[#5a7d6e] font-medium">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#2d5a47] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#2d5a47] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#2d5a47] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>Consulting clinic knowledge base...</span>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 ml-1">Valley Vet Assistant • Typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Carousel */}
        <div className="px-4 sm:px-6 py-2.5 bg-white/30 border-t border-white/40">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5a7d6e] whitespace-nowrap pl-1">
              Suggested:
            </span>
            {SUGGESTED_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(question)}
                disabled={isLoading}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-[#2d5a47] border border-white/60 hover:bg-white hover:border-[#2d5a47]/30 hover:shadow-xs transition-all whitespace-nowrap shadow-2xs disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white/40 border-t border-white/40">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question about our services, hours, locations..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="w-full bg-white/80 border border-white/60 rounded-full py-3.5 pl-6 pr-24 sm:pr-28 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a47]/20 shadow-inner text-[#2c3e50] placeholder:text-gray-400"
            />

            <div className="absolute right-2 flex items-center gap-1">
              {/* Mic button if supported */}
              {recognitionRef.current && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-gray-400 hover:text-[#2d5a47] hover:bg-white/60'
                  }`}
                  title={isListening ? 'Stop voice recording' : 'Speak your question'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              {/* Send button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#2d5a47] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#234738] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#2d5a47]/20 flex items-center gap-1"
                title="Send Message"
              >
                <span>Send</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Footer disclaimer */}
          <p className="text-[10px] text-center mt-2 text-gray-400 italic">
            This assistant provides FAQ information. For medical emergencies or urgent pet care, please call us directly.
          </p>
        </div>
      </div>
    </div>
  );
};
