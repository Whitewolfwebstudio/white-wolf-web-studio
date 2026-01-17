
import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, subtitle, align = 'left' }) => {
  return (
    <div className={`mb-24 ${align === 'center' ? 'text-center' : 'text-left'} perspective-1000`}>
      <motion.span 
        initial={{ opacity: 0, y: -30, rotateX: -60, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block py-2 px-5 bg-zinc-900 border border-zinc-800 text-cyan-400 text-[10px] font-black uppercase tracking-[0.6em] mb-10 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
      >
        {label}
      </motion.span>
      
      <div className="overflow-hidden preserve-3d">
        <motion.h2 
          initial={{ y: "120%", rotateX: 60, opacity: 0 }}
          whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-10 leading-[0.9] text-white"
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <div className="overflow-hidden">
          <motion.p 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-zinc-500 text-xl md:text-3xl max-w-4xl leading-relaxed font-light"
            style={{ margin: align === 'center' ? '0 auto' : '0' }}
          >
            {subtitle}
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
