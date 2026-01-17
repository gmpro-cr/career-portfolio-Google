import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { generateAnalystResponse } from '../services/geminiService';

interface AnalystChatProps {
  onClose: () => void;
}

const AnalystChat: React.FC<AnalystChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Greetings, Investor. I am the GMHL Analyst Bot. Ask me about Gaurav's risk profile, ROI, or technical assets.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await generateAnalystResponse(input);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-terminal-bg border border-terminal-accent shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col h-[600px] rounded-lg overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-terminal-surface border-b border-terminal-border p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-ping' : 'bg-terminal-accent'}`}></div>
            <span className="font-mono font-bold text-terminal-accent">GMHL_ANALYST_V1.0</span>
          </div>
          <button onClick={onClose} className="text-terminal-muted hover:text-white font-mono text-xl">×</button>
        </div>

        {/* Chat Body */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 font-mono text-sm">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg border ${
                msg.role === 'user' 
                  ? 'bg-terminal-surface border-terminal-border text-white' 
                  : 'bg-terminal-accent/10 border-terminal-accent/30 text-terminal-accent'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-terminal-border bg-terminal-surface">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for Due Diligence..."
              className="flex-grow bg-terminal-bg border border-terminal-border text-white px-3 py-2 font-mono text-sm focus:outline-none focus:border-terminal-accent"
              disabled={loading}
              autoFocus
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-terminal-accent text-terminal-bg font-bold px-4 py-2 hover:bg-emerald-400 disabled:opacity-50"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystChat;