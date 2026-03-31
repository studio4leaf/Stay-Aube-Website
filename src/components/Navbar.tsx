import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
    scrolled || !isHome ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 py-4' : 'bg-transparent py-6'
  }`;

  const textClass = scrolled || !isHome ? 'text-zinc-900' : 'text-white';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`font-serif text-2xl tracking-widest ${textClass}`}>
          STAY AUBE
        </Link>
        <div className={`hidden md:flex space-x-8 font-sans text-xs uppercase tracking-[0.15em] ${textClass}`}>
          <Link to="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <Link to="/rooms" className="hover:opacity-70 transition-opacity">Rooms</Link>
          <Link to="/promotion" className="hover:opacity-70 transition-opacity">Promotion</Link>
          <Link to="/reservation" className="hover:opacity-70 transition-opacity">Reservation</Link>
          {user ? (
            <>
              <Link to="/mypage" className="hover:opacity-70 transition-opacity">My Page</Link>
              {isAdmin && <Link to="/admin" className="hover:opacity-70 transition-opacity text-amber-600">Admin</Link>}
            </>
          ) : (
            <Link to="/login" className="hover:opacity-70 transition-opacity">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
