
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-8 group">
              <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded-sm">
                <span className="text-zinc-950 font-black text-2xl italic">W</span>
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter">White Wolf Studio</span>
            </Link>
            <p className="text-zinc-400 max-w-sm text-lg leading-relaxed mb-8">
              Architecting the future of digital presence. We build products for market leaders who demand precision and performance.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://x.com/SAcreative10" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-zinc-900 rounded-full hover:bg-cyan-400 hover:text-zinc-950 transition-all"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ascreative0/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-zinc-900 rounded-full hover:bg-cyan-400 hover:text-zinc-950 transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/Whitewolfwebstudio" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-zinc-900 rounded-full hover:bg-cyan-400 hover:text-zinc-950 transition-all"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-zinc-100 font-bold uppercase tracking-widest text-sm mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Contact', 'Services'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-zinc-500 hover:text-cyan-400 transition-colors flex items-center group">
                    {item} <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-100 font-bold uppercase tracking-widest text-sm mb-8">Contact</h4>
            <ul className="space-y-4">
              <li className="text-zinc-500 italic">ceo.whitewolfwebstudio@outlook.com</li>
              <li className="text-zinc-500">+1 (555) 902-1234</li>
              <li className="text-zinc-500">221 Wolf Run Blvd,<br />Aspen, CO 81611</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-zinc-600 text-xs font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} White Wolf Web Studio. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
