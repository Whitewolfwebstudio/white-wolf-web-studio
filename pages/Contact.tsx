
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SectionHeader 
              label="Contact" 
              title="Establish a Partnership" 
              subtitle="Ready to discuss your next strategic move? Our experts are standing by to audit your digital presence and propose a path forward."
            />
            
            <div className="space-y-12 mb-12">
              {[
                { icon: Mail, label: 'Inquiries', val: 'hello@whitewolf.studio' },
                { icon: Phone, label: 'Call Us', val: '+1 (555) 902-1234' },
                { icon: MapPin, label: 'Headquarters', val: '221 Wolf Run Blvd, Aspen, CO' },
              ].map((item) => (
                <div key={item.label} className="flex items-start space-x-6">
                  <div className="p-4 bg-zinc-900 text-cyan-400 border border-zinc-800">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-2">{item.label}</h4>
                    <p className="text-xl font-bold uppercase tracking-tighter">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-zinc-900 border border-zinc-800">
              <p className="text-sm font-medium text-zinc-500 italic">
                "We typically respond to qualified inquiries within 4 business hours. Confidentiality is guaranteed."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="p-10 md:p-16 bg-zinc-900 border border-zinc-800 relative z-10">
              {formState === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-cyan-400 text-zinc-950 flex items-center justify-center rounded-full mx-auto mb-8">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Transmission Received</h3>
                  <p className="text-zinc-500">A senior strategist will review your project parameters and contact you shortly.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-8 text-cyan-400 font-bold uppercase tracking-widest text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-400 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Corporate Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@company.com"
                        className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Service Category</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-100 focus:border-cyan-400 outline-none transition-all">
                      <option>Web Design & Development</option>
                      <option>UI/UX Design</option>
                      <option>E-commerce Solutions</option>
                      <option>Optimization & Performance</option>
                      <option>Other / Not Sure</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Project Brief</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Tell us about your objectives and constraints..."
                      className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-100 placeholder:text-zinc-700 focus:border-cyan-400 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="w-full py-6 bg-zinc-50 text-zinc-950 font-black uppercase tracking-[0.2em] text-sm hover:bg-cyan-400 disabled:opacity-50 transition-all flex items-center justify-center group"
                  >
                    {formState === 'submitting' ? 'Transmitting...' : (
                      <>Initialize Consultation <Send size={18} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
            {/* Decorative BG */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-zinc-800 z-0" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
