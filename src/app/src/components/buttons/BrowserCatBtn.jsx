'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const BrowserCatBtn = () => {
  const pathname = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY); // triggers re-render if scrollY changes
    };

    // Add scroll listener on mount
    window.addEventListener('scroll', handleScroll);

    // Initial scroll position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition >= 370) {
      setIsMenuVisible(false);
      document.querySelector('#sticky-header')?.classList.add('sticky-menu');
      document.querySelector('.scroll-to-target')?.classList.add('open');
      document.querySelector('.category-menu')?.style.setProperty('display', 'none');
    } else {
      if (pathname === '/') {
        setIsMenuVisible(true);
        document.querySelector('.category-menu')?.style.setProperty('display', 'block');
      } else {
        setIsMenuVisible(false);
        document.querySelector('.category-menu')?.style.setProperty('display', 'none');
      }

      document.querySelector('#sticky-header')?.classList.remove('sticky-menu');
      document.querySelector('.scroll-to-target')?.classList.remove('open');
    }
  }, [scrollPosition, pathname]);

  const toggleMenu = () => {
    const newVisibility = !isMenuVisible;
    setIsMenuVisible(newVisibility);
    document.querySelector('.category-menu')?.style.setProperty('display', newVisibility ? 'block' : 'none');
  };

  return (
    <button style={{ border: 'none' }} className="cat-toggle browse" onClick={toggleMenu}>
      <i className="fas fa-bars"></i>
      Browse Categories
      <i className="fas fa-angle-down"></i>
    </button>
  );
};

export default BrowserCatBtn;
