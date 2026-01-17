
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-zinc-100 flex items-center justify-center rounded-sm group-hover:bg-cyan-400 transition-colors">
            <span className="text-zinc-950 font-black text-xl italic leading-none">W</span>
          </div>
          <span className="text-xl font-black uppercase tracking-tighter">White Wolf</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label}
              to={link.path}
              className="text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact"
            className="px-6 py-2.5 bg-zinc-50 text-zinc-950 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-cyan-400 hover:text-zinc-950 transition-all transform hover:scale-105"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 flex flex-col p-8 space-y-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label}
                to={link.path}
                onClick={closeMenu}
                className="text-2xl font-bold uppercase tracking-tighter hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/contact"
              onClick={closeMenu}
              className="flex items-center justify-between p-4 bg-zinc-50 text-zinc-950 font-black uppercase tracking-widest"
            >
              Get Started <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
