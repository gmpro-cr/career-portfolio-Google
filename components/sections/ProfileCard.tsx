import React, { useState, useRef, useEffect } from 'react';
import { TECH_STACK } from '../../constants';
import { generateAssistantResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';

const ProfileCard: React.FC = () => {
  const [photoError, setPhotoError] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm Gaurav's AI Assistant. Ask me anything about his work experience or skills.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateAssistantResponse(input);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-full p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 grid-rows-auto md:grid-rows-3 gap-3 md:gap-4 overflow-y-auto md:overflow-hidden pb-28 md:pb-6">

      {/* 1. Identity Module */}
      <div className="md:col-span-2 glass-panel p-5 md:p-6 rounded-3xl shadow-glass flex flex-col justify-between relative overflow-hidden bg-white/60">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold tracking-wider mb-3 border border-blue-200">
            Open to Opportunities
          </div>

          {/* Photo + Name Row */}
          <div className="flex items-center gap-4 md:gap-5 mb-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 border-3 border-white shadow-lg">
              {!photoError ? (
                <img
                  src="/photo.jpg"
                  alt="Gaurav Mahale"
                  className="w-full h-full object-cover"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-2xl">👤</span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-black text-canvas-text tracking-tighter leading-[0.9]">
                GAURAV <span className="text-transparent bg-clip-text bg-gradient-to-r from-canvas-accent to-purple-600">MAHALE</span>
              </h1>
              <p className="text-sm text-canvas-muted mt-1">Fintech × Agentic AI</p>
            </div>
          </div>

          <div className="flex gap-8 text-sm">
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Currently</div>
              <div className="font-semibold text-canvas-text">Pareto.AI</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase">Experience</div>
              <div className="font-semibold text-canvas-text">8.5+ Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Skills/Tech Stack */}
      <div className="glass-panel p-5 rounded-3xl shadow-glass overflow-hidden bg-gradient-to-br from-white to-gray-50">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Skills</div>
        <div className="flex flex-wrap gap-1.5">
          {TECH_STACK.slice(0, 8).map((tech) => (
            <span key={tech.id} className="px-2 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-medium text-gray-700 shadow-sm">
              {tech.name}
            </span>
          ))}
          {TECH_STACK.length > 8 && (
            <span className="px-2 py-1 text-[10px] text-gray-400">+{TECH_STACK.length - 8}</span>
          )}
        </div>
      </div>

      {/* 3. About Module */}
      <div className="md:col-span-2 glass-panel p-5 rounded-3xl shadow-glass bg-gradient-to-br from-white to-gray-50 flex flex-col">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">About</div>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          AI Product Manager with 8+ years in banking and finance. Training LLMs at Pareto.AI while managing corporate lending at Yes Bank.
        </p>
        <div className="mt-auto pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] text-gray-400">Education</div>
            <div className="text-xs font-medium text-gray-700">PGPM, IIM Sirmaur</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400">Certifications</div>
            <div className="text-xs font-medium text-gray-700">IBM AI Product Mgmt</div>
          </div>
        </div>
      </div>

      {/* 4. Contact */}
      <div className="glass-panel p-5 rounded-3xl shadow-glass bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center text-center">
        <div className="text-2xl mb-2">✉️</div>
        <div className="text-xs text-gray-300 mb-2">Get in touch</div>
        <a href="mailto:mahalegauravk@gmail.com" className="px-4 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-medium hover:scale-105 transition-transform">
          Email Me
        </a>
      </div>

      {/* 5. AI Chat - spans bottom */}
      <div className="md:col-span-3 glass-panel rounded-3xl shadow-glass flex flex-col overflow-hidden border border-white/60 h-[200px] md:h-auto">
        <div className="px-4 py-2 bg-white/40 border-b border-white/20 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">AI Assistant</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/20" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-none text-xs text-gray-400">
                Typing...
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-white/60">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my experience..."
              className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;