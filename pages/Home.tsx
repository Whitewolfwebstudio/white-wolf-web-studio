
import React from 'react';
import { motion, Variants, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { ArrowRight, ChevronRight, Cpu, Layers, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, ICON_MAP, TEAM } from '../constants';
import SectionHeader from '../components/SectionHeader';

// Advanced "Stacked" Reveal Animation Variants
// This variant makes elements look like they are being pulled from a stack at depth.
const cardStackedReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 120,
    scale: 0.85,
    rotateX: 25,
    clipPath: 'inset(100% 0 0 0)',
    z: -100
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0,
    clipPath: 'inset(0% 0 0 0)',
    z: 0,
    transition: { 
      duration: 1.6, 
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.1 
    },
  },
};

// 3D Tilt Wrapper Component for the "Cards"
const TiltCard: React.FC<{ children: React.ReactNode, className?: string, hoverY?: number }> = ({ children, className = "", hoverY = -12 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardStackedReveal}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: hoverY, scale: 1.02, transition: { duration: 0.4 } }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 ${className} relative`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="preserve-3d h-full">
        {children}
      </div>
      {/* Leading Edge Reveal Line (Cinematic Accent) */}
      <motion.div 
        variants={{
          hidden: { height: '100%', bottom: 0, opacity: 0.5 },
          visible: { 
            height: '0%', 
            bottom: '100%', 
            opacity: 0,
            transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } 
          }
        }}
        className="absolute inset-x-0 bg-cyan-400/20 z-10 pointer-events-none border-t border-cyan-400/40"
      />
    </motion.div>
  );
};

const LowPolyWolf = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotateY: -30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
      transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full aspect-square preserve-3d"
    >
      <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full scale-75 animate-pulse" />
      <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full scale-110" />

      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(34,211,238,0.3)]">
        <defs>
          <linearGradient id="wolfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.8)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.2)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{ 
            y: [0, -15, 0],
            rotateX: [0, 8, 0],
            rotateZ: [0, 3, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <g filter="url(#glow)">
            <motion.path 
              d="M250 80 L320 120 L250 150 L180 120 Z" 
              fill="none" stroke="url(#wolfGradient)" strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.path 
              d="M180 120 L140 60 L210 100 Z" 
              fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.path 
              d="M320 120 L360 60 L290 100 Z" 
              fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.path 
              d="M250 150 L310 200 L250 230 L190 200 Z" 
              fill="none" stroke="white" strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <circle cx="215" cy="185" r="3" fill="#22d3ee">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="285" cy="185" r="3" fill="#22d3ee">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <motion.path 
              d="M250 230 L290 320 L250 360 L210 320 Z" 
              fill="none" stroke="url(#wolfGradient)" strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 1.2 }}
            />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const lineReveal: Variants = {
    hidden: { y: '100%', rotateX: 60, opacity: 0, filter: 'blur(10px)' },
    visible: { 
      y: 0, 
      rotateX: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative bg-[#050507] overflow-hidden">
      {/* Dynamic Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150, 0],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            className="absolute w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full"
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <div className="overflow-hidden mb-10 perspective-1000">
                <motion.span 
                  variants={lineReveal}
                  className="inline-block py-2 px-6 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 text-cyan-400 text-xs font-black uppercase tracking-[0.6em] shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                >
                  Neural Interface Loaded // MMXXV
                </motion.span>
              </div>
              
              <div className="space-y-2 mb-14 perspective-1000">
                {["Architect", "Power", "Through Design."].map((text, idx) => (
                  <div key={idx} className="overflow-hidden pr-20 pb-3 preserve-3d">
                    <motion.h1 
                      variants={lineReveal} 
                      className={`text-4xl md:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] inline-block pr-6 
                        ${idx === 0 ? 'text-white' : 
                          idx === 1 ? 'text-zinc-800/80' : 
                          'text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-zinc-700'}`}
                    >
                      {text}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-16 font-light leading-relaxed border-l-2 border-cyan-400/30 pl-10"
              >
                White Wolf Web Studio builds high-fidelity digital systems that defy gravity and command market authority.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-10"
              >
                <Link 
                  to="/contact"
                  className="px-12 py-6 bg-cyan-400 text-zinc-950 font-black uppercase tracking-widest text-xs rounded-none hover:bg-white transition-all flex items-center justify-center group relative overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                >
                  <span className="relative z-10">Initialize Project</span>
                  <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform relative z-10" />
                </Link>
                <Link 
                  to="/about"
                  className="px-12 py-6 border border-zinc-800 text-zinc-100 font-bold uppercase tracking-widest text-xs rounded-none hover:bg-zinc-900 transition-all text-center backdrop-blur-md"
                >
                  Our Philosophy
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="hidden lg:block lg:col-span-4 perspective-1000">
            <LowPolyWolf />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-visible border-y border-zinc-900 bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Cpu, label: "Core Speed", val: "0.12ms", desc: "Engineered for instantaneous delivery." },
            { icon: Layers, label: "Structural Depth", val: "100%", desc: "Layered architectures for complex needs." },
            { icon: Globe, label: "Global Mesh", val: "Edge-Ready", desc: "Decentralized assets for zero latency." }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <TiltCard className="group h-full" hoverY={-15}>
                <div className="p-12 glass-card border-zinc-800 h-full transition-all group-hover:bg-zinc-900/80 group-hover:border-cyan-400/20">
                  <div className="mb-8 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    <stat.icon size={40} />
                  </div>
                  <div className="text-5xl font-black text-white mb-3 tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mb-6">{stat.label}</div>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">{stat.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid Restoration */}
      <section id="services" className="py-48">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            label="Neural Capabilities" 
            title="Strategic Engineering" 
            subtitle="We don't just build websites. We build technical foundations that empower growth and command authority in your niche."
          />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon];
              return (
                <TiltCard key={service.id} hoverY={-20}>
                  <Link to={service.path} className="block h-full group">
                    <div className="relative bg-[#0c0c0e] border border-zinc-800 overflow-hidden cursor-pointer h-full backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-700 shadow-2xl">
                      <div className="h-72 overflow-hidden relative">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover grayscale brightness-[0.25] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-90 transition-all duration-[1.2s] ease-[0.16,1,0.3,1]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />
                      </div>
                      
                      <div className="p-12 relative">
                        <div className="mb-8 p-5 bg-zinc-900 border border-zinc-800 inline-block group-hover:bg-cyan-400 group-hover:text-zinc-950 group-hover:-translate-y-2 transition-all duration-500">
                          <Icon size={28} />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-5 text-white group-hover:text-cyan-400 transition-colors duration-500">{service.title}</h3>
                        <p className="text-zinc-400 mb-10 leading-relaxed font-light text-base">{service.shortDescription}</p>
                        <div className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-100 group-hover:text-cyan-400 transition-all duration-500">
                          Access Details <ChevronRight size={16} className="ml-3 group-hover:translate-x-3 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Grid Restoration */}
      <section id="team" className="py-48 bg-zinc-900/5 border-y border-zinc-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.02),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader 
            label="The Alpha Pack" 
            title="Elite Personnel" 
            align="center"
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10"
          >
            {TEAM.map((member) => (
              <TiltCard key={member.id} hoverY={-12}>
                <Link to={`/team/${member.id}`} className="block h-full group">
                  <div className="relative bg-[#0c0c0e] border border-zinc-800/40 overflow-hidden flex flex-col h-full hover:shadow-[0_40px_80px_rgba(0,0,0,0.7)] group-hover:border-cyan-400/20 transition-all duration-700">
                    <div className="aspect-[4/5] overflow-hidden grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-[1s] ease-[0.16,1,0.3,1] relative">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-90" />
                    </div>
                    <div className="p-10 flex flex-col flex-grow relative z-10">
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 text-white group-hover:text-cyan-400 transition-colors duration-500">{member.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400/80 mb-8">{member.role}</p>
                      <div className="mt-auto inline-flex items-center text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-500 group-hover:text-white transition-all duration-500">
                        Intel Profile <ChevronRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-72 relative overflow-hidden text-center">
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.1),transparent)]"
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.85, y: 50, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter mb-16 text-white leading-none drop-shadow-[0_0_60px_rgba(34,211,238,0.4)]"
          >
            Ascend to <br /><span className="text-cyan-400">Superiority</span>
          </motion.h2>
          <Link 
            to="/contact"
            className="inline-flex items-center px-16 py-8 bg-white text-zinc-950 font-black uppercase tracking-[0.4em] text-lg rounded-none hover:bg-cyan-400 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group"
          >
            Join The Pack <ArrowRight className="ml-5 group-hover:translate-x-4 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
