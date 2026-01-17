
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Shield, Target, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeader 
                label="Who We Are" 
                title="A Pack of Visionaries" 
                subtitle="White Wolf Web Studio was founded on the principles of the high-altitude predator: intelligence, loyalty, and relentless strategic focus."
              />
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                We observed a market saturated with generic "digital agencies" that prioritised volume over value. We chose a different path. We only take on projects where we can fundamentally move the needle for our clients.
              </p>
              <p className="text-zinc-500 font-light italic">
                "Leadership is not just about being first; it's about making sure your territory is protected and your future is secure."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/seed/agency-office/1000/1200" 
                alt="Our Studio" 
                className="w-full grayscale brightness-50"
              />
              <div className="absolute inset-0 border-[20px] border-zinc-950/50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-zinc-900/20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader label="Values" title="The Code of Conduct" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: 'Protection', desc: 'Your security and brand reputation are our primary concern.' },
              { icon: Target, title: 'Precision', desc: 'Every decision is calculated. Every line of code serves a purpose.' },
              { icon: Users, title: 'Loyalty', desc: 'We are your long-term technical partner, not a one-time vendor.' },
              { icon: Zap, title: 'Velocity', desc: 'We move fast, delivering results that keep you ahead of the curve.' },
            ].map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-full mx-auto mb-8 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-zinc-950 transition-all">
                  <v.icon size={28} />
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tighter mb-4">{v.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="p-16 bg-zinc-900 border border-zinc-800">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">The Mission</h3>
              <p className="text-zinc-400 text-xl leading-relaxed font-light">
                To engineer the digital infrastructure of tomorrow, empowering the world's most ambitious brands to scale without limits through strategic design and uncompromising performance.
              </p>
            </div>
            <div className="p-16 border border-zinc-900">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">The Vision</h3>
              <p className="text-zinc-400 text-xl leading-relaxed font-light">
                To become the definitive global standard for agency-client partnerships, where trust and technological superiority converge to create lasting digital legacies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
