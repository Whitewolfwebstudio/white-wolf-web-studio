
import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, ICON_MAP } from '../constants';
import { ArrowLeft, CheckCircle2, ChevronRight, Zap, Sparkles, Loader2 } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { GoogleGenAI } from "@google/genai";

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = SERVICES.find(s => s.path.includes(serviceId || ''));
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = ICON_MAP[service.icon];

  const generateInsight = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a visionary technical director. Analyze this service: "${service.title}" - ${service.fullDescription}. Provide a short, ultra-compelling strategic insight (30 words max) on why this service is critical for market dominance in the next 24 months.`,
      });
      setAiInsight(response.text || "Insight unavailable at this time.");
    } catch (error) {
      console.error("AI Insight Error:", error);
      setAiInsight("Performance optimization requires deeper analysis.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="pt-32">
      {/* Hero Header */}
      <section className="relative py-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/#services" className="inline-flex items-center text-zinc-500 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-12 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Services
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-8 p-4 bg-zinc-900 text-cyan-400 inline-block rounded-sm">
                <Icon size={48} />
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
                {service.title}
              </h1>
              <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-light mb-12">
                {service.fullDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="p-8 bg-zinc-900 border border-zinc-800 flex-grow">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">Technology Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {service.tools.map(tool => (
                      <span key={tool} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-zinc-900/40 border border-cyan-400/20 relative overflow-hidden group">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center text-cyan-400">
                    <Sparkles size={12} className="mr-2" /> Expert Insight
                  </h4>
                  <AnimatePresence mode="wait">
                    {aiInsight ? (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm italic text-zinc-300 leading-relaxed font-light"
                      >
                        "{aiInsight}"
                      </motion.p>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={generateInsight}
                        disabled={isAiLoading}
                        className="text-[10px] font-black uppercase tracking-widest py-2 px-4 bg-cyan-400 text-zinc-950 hover:bg-white transition-all disabled:opacity-50 flex items-center"
                      >
                        {isAiLoading ? <Loader2 size={12} className="animate-spin mr-2" /> : <Zap size={12} className="mr-2" />}
                        Generate Intelligence
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden border border-zinc-800"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Advantages" title="The competitive edge" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-zinc-800 bg-zinc-900/50 hover:border-cyan-400 transition-all"
              >
                <div className="text-cyan-400 mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-lg font-bold uppercase tracking-tighter text-zinc-100">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Feature Image Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[400px] md:h-[600px] relative overflow-hidden rounded-sm border border-zinc-900">
             <img 
               src={service.image} 
               className="w-full h-full object-cover opacity-20 grayscale brightness-50" 
               alt="Background context"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-2xl px-6">
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                    Engineered for <span className="text-cyan-400">Growth</span>
                  </h3>
                  <p className="text-zinc-400 text-lg font-light leading-relaxed">
                    We don't just deliver products; we deliver market advantages. Our solutions are built to withstand the rigors of high-traffic environments while maintaining peak aesthetic quality.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <SectionHeader label="Our Approach" title="Rigorous Precision" />
              <p className="text-zinc-500 text-lg leading-relaxed mb-12">
                We follow a rigorous, modular workflow designed to minimize risk while maximizing output quality. Every stage is checkpointed for performance and security.
              </p>
              <Link 
                to="/contact"
                className="px-10 py-5 bg-zinc-50 text-zinc-950 font-black uppercase tracking-widest text-xs inline-flex items-center hover:bg-cyan-400 transition-all"
              >
                Start Your Build <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="space-y-4">
              {service.process.map((step, i) => (
                <div key={step.step} className="group p-8 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Phase 0{i+1}</span>
                    <Zap size={16} className="text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">{step.step}</h4>
                  <p className="text-zinc-500 leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-12 border-b border-zinc-900 pb-8">Explore Other Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.filter(s => s.id !== service.id).slice(0, 3).map(s => (
              <Link 
                key={s.id} 
                to={s.path}
                className="group border border-zinc-900 hover:border-zinc-700 transition-all overflow-hidden bg-zinc-900/20"
              >
                <div className="h-32 w-full overflow-hidden">
                  <img src={s.image} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" alt={s.title} />
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold uppercase tracking-tighter group-hover:text-cyan-400 transition-colors mb-4">{s.title}</h4>
                  <p className="text-zinc-500 text-xs line-clamp-2">{s.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
