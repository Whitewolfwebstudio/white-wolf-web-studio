
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to White Wolf Studio. I am your AI strategist. How can I help architect your digital future today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the Lead Digital Strategist at White Wolf Web Studio. You are professional, visionary, and technically elite. Your tone is sophisticated yet helpful. You advise on web design, engineering, and digital growth. If users ask complex technical or strategic questions, you use deep reasoning to provide the best architectural advice.",
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });

      const aiResponse = response.text || "I apologize, my neural link was momentarily interrupted. Could you repeat that?";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "My sensors indicate a connection error. Please try transmitting again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-[450px] h-[600px] bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col glow-blue"
          >
            {/* Header */}
            <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-400 rounded-sm">
                  <Bot size={20} className="text-zinc-950" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-100">Alpha AI</h3>
                  <div className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2" />
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Neural Link Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`mt-1 p-2 rounded-sm shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-cyan-950/30 text-cyan-400 border border-cyan-400/20'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-800/50 text-zinc-100 border border-zinc-800/50'}`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-3">
                    <div className="p-2 rounded-sm bg-cyan-950/30 text-cyan-400 border border-cyan-400/20">
                      <Loader2 size={14} className="animate-spin" />
                    </div>
                    <div className="p-4 bg-zinc-800/50 text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center">
                      <Sparkles size={12} className="mr-2 animate-pulse" />
                      Alpha is thinking...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-6 bg-zinc-900 border-t border-zinc-800">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your next digital move..."
                  className="w-full bg-zinc-950 border border-zinc-800 p-4 pr-12 text-sm text-zinc-100 focus:border-cyan-400 outline-none transition-all placeholder:text-zinc-700"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="mt-4 text-[9px] text-center text-zinc-600 uppercase tracking-widest font-bold">
                Powered by Gemini 3 Pro Neural Engine
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-zinc-50 text-zinc-950 rounded-full flex items-center justify-center shadow-2xl hover:bg-cyan-400 transition-all group overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
