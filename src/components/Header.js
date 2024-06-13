import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setHidden(prevScrollpos < currentScrollPos && currentScrollPos > 100);
    setPrevScrollpos(currentScrollPos);
  }, [prevScrollpos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.hash === '#ideas';
    } else {
      return location.pathname === path;
    }
  };

  return (
    <header className={`fixed w-full top-0 bg-orange-500 transition-all duration-300 ${hidden ? '-top-20' : 'top-0'} z-50`}>
      <nav className="flex justify-between items-center p-4 mx-20 font-sans text-2xl">
        <div className="flex items-center">
          <img src={logo} alt="Suitmedia Logo" className="h-8" style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
        <div className="hidden lg:flex space-x-4 text-white">
          <a href="#work" className={`block cursor-pointer mb-2 ${isActive('#work') ? 'border-b-2 border-white' : ''}`}>Work</a>
          <a href="#about" className={`block cursor-pointer mb-2 ${isActive('#about') ? 'border-b-2 border-white' : ''}`}>About</a>
          <a href="#services" className={`block cursor-pointer mb-2 ${isActive('#services') ? 'border-b-2 border-white' : ''}`}>Services</a>
          <Link to="/" className={`block cursor-pointer mb-2 ${isActive('/') ? 'border-b-2 border-white' : ''}`}>Ideas</Link>
          <a href="#careers" className={`block cursor-pointer mb-2 ${isActive('#careers') ? 'border-b-2 border-white' : ''}`}>Careers</a>
          <a href="#contact" className={`block cursor-pointer mb-2 ${isActive('#contact') ? 'border-b-2 border-white' : ''}`}>Contact</a>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden bg-orange-500 text-white p-4">
          <a href="#work" className={`block cursor-pointer mb-2 ${isActive('#work') ? 'border-b-2 border-white' : ''}`}>Work</a>
          <a href="#about" className={`block cursor-pointer mb-2 ${isActive('#about') ? 'border-b-2 border-white' : ''}`}>About</a>
          <a href="#services" className={`block cursor-pointer mb-2 ${isActive('#services') ? 'border-b-2 border-white' : ''}`}>Services</a>
          <Link to="/" className={`block cursor-pointer mb-2 ${isActive('/') ? 'border-b-2 border-white' : ''}`}>Ideas</Link>
          <a href="#careers" className={`block cursor-pointer mb-2 ${isActive('#careers') ? 'border-b-2 border-white' : ''}`}>Careers</a>
          <a href="#contact" className={`block cursor-pointer mb-2 ${isActive('#contact') ? 'border-b-2 border-white' : ''}`}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
