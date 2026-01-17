import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { generateSystemResponse } from '../services/geminiService';

const GeminiComms: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "SYSTEM ONLINE. I am the core AI. Awaiting queries regarding Subject GMHL.",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [processing, setProcessing] = useState(false);
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
    setProcessing(true);

    try {
      const responseText = await generateSystemResponse(input);
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
      setProcessing(false);
    }
  };

  return (
    <div className="h-full p-4 flex flex-col">
       <div className="flex-1 hud-border bg-hud-glass flex flex-col overflow-hidden relative">
         {/* Decorative Header */}
         <div className="h-8 bg-hud-primary/10 border-b border-hud-primary/30 flex items-center justify-between px-4">
           <span className="font-mono text-xs text-hud-primary blink">SECURE_CHANNEL_ACTIVE</span>
           <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-hud-alert animate-pulse"></div>
             <div className="w-2 h-2 rounded-full bg-hud-primary opacity-50"></div>
           </div>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] p-3 border ${
                 msg.role === 'user' 
                   ? 'bg-hud-primary/10 border-hud-primary text-white text-right' 
                   : 'bg-hud-black border-hud-secondary text-hud-primary'
               }`}>
                 <div className="text-[10px] opacity-50 mb-1">{msg.role === 'user' ? 'OPERATOR' : 'SYSTEM_CORE'}</div>
                 {msg.text}
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
           
           {processing && (
             <div className="text-hud-primary text-xs animate-pulse pl-2">
               > CALCULATING RESPONSE...
             </div>
           )}
         </div>

         {/* Input */}
         <div className="p-4 bg-hud-dark border-t border-hud-primary/30 flex gap-2">
           <span className="text-hud-primary py-2">></span>
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             placeholder="ENTER COMMAND..."
             className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none"
             autoFocus
           />
           <button 
             onClick={handleSend}
             className="text-hud-black bg-hud-primary px-4 py-1 font-bold text-xs hover:bg-white transition-colors"
           >
             SEND
           </button>
         </div>
       </div>
    </div>
  );
};

export default GeminiComms;