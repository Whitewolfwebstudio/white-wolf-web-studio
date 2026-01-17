
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { TEAM } from '../constants';
import { ArrowLeft, MessageCircle, Phone, CheckCircle2, Award, Zap, Shield, Target } from 'lucide-react';

const TeamMemberDetail: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const member = TEAM.find(m => m.id === memberId);

  if (!member) {
    return <Navigate to="/" replace />;
  }

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const waNumber = member.contact.replace(/\s+/g, '').replace('+', '');

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050507] text-white overflow-hidden selection:bg-cyan-400 selection:text-zinc-950">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] transition-all group">
          <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Grid
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 perspective-1000">
            <motion.div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative aspect-[3/4] overflow-hidden border border-zinc-800/50 shadow-2xl group"
            >
              <div style={{ transform: 'translateZ(60px)' }} className="absolute inset-0 preserve-3d">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              </div>
              <div style={{ transform: 'translateZ(100px)' }} className="absolute bottom-10 left-10 pointer-events-none">
                <span className="px-5 py-2 bg-cyan-400 text-zinc-950 text-[10px] font-black uppercase tracking-widest shadow-2xl">Classified Operative</span>
              </div>
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-cyan-400/40" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-cyan-400/40" />
            </motion.div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="h-px w-12 bg-cyan-400" />
                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]">Operative Profile // {member.id}</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-white leading-none">{member.name}</h1>
              <p className="text-2xl font-bold uppercase tracking-widest text-zinc-500 mb-12 border-b border-zinc-900 pb-8">{member.role}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Target className="text-cyan-400 mt-1" size={20} />
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Specialization</h4>
                      <p className="text-sm font-medium text-zinc-300 leading-relaxed">{member.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Shield className="text-cyan-400 mt-1" size={20} />
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Philosophy</h4>
                      <p className="text-sm italic text-zinc-400 leading-relaxed">"{member.bio}"</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-6 flex items-center">
                    <Zap size={14} className="mr-2" /> Direct Comms Channel
                   </h4>
                   <div className="text-2xl font-black tracking-tighter text-white mb-2">{member.contact}</div>
                   <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Encrypted Connection</p>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white flex items-center">
                  <Award size={18} className="mr-4 text-cyan-400" /> Neural Capacities & Skillsets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.skills.map((skill, idx) => (
                    <motion.div 
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      className="group p-5 bg-zinc-900/50 border border-zinc-800 hover:border-cyan-400 transition-all flex items-center space-x-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-zinc-950 transition-all">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-100">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3D Floating Action Button */}
      <motion.a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5, rotateX: 10 }}
        className="fixed bottom-28 right-8 z-[110] w-20 h-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:brightness-110 transition-all group perspective-1000"
      >
        <MessageCircle size={36} className="group-hover:scale-110 transition-transform" />
        <span className="absolute right-24 bg-zinc-950 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0">
          Deploy Secure Comms
        </span>
      </motion.a>
    </div>
  );
};

export default TeamMemberDetail;
