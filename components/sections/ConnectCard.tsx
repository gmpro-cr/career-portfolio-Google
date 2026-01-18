import React, { useState, useRef, useEffect } from 'react';
import { generateAssistantResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';

const ConnectCard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there. I'm Gaurav's AI Assistant. Ask me anything about his work, or I can help you draft an email to him.",
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
    <div className="w-full max-w-4xl h-full md:h-[60vh] flex flex-col md:flex-row gap-4 md:gap-6 p-4 pb-28 md:pb-0 md:p-0">
      {/* Left: Quick Actions */}
      <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-4 shrink-0">
        <div className="glass-panel p-6 rounded-3xl shadow-glass flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg">
            ✉️
          </div>
          <h3 className="font-bold text-lg mb-2">Direct Channel</h3>
          <p className="text-sm text-gray-500 mb-6">Preferred for high-priority inquiries.</p>
          <a href="mailto:mahalegauravk@gmail.com" className="px-6 py-2 bg-black text-white rounded-xl font-medium hover:scale-105 transition-transform">
            Send Email
          </a>
        </div>
        <div className="glass-panel p-6 rounded-3xl shadow-glass h-1/3 flex justify-around items-center text-2xl">
          <a href="#" className="hover:scale-110 transition-transform opacity-70 hover:opacity-100">💼</a>
          <a href="#" className="hover:scale-110 transition-transform opacity-70 hover:opacity-100">🐙</a>
          <a href="#" className="hover:scale-110 transition-transform opacity-70 hover:opacity-100">🐦</a>
        </div>
      </div>

      {/* Right: AI Chat */}
      <div className="flex-1 glass-panel rounded-3xl shadow-glass flex flex-col overflow-hidden border border-white/60">
        <div className="p-4 bg-white/40 border-b border-white/20 flex justify-between items-center backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Assistant_AI</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/20" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <span className="animate-pulse text-gray-400 text-xs">Processing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white/60 backdrop-blur-md">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message..."
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all shadow-inner"
            />
            <button
              onClick={handleSend}
              className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;