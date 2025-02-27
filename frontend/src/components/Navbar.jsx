import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/faqs.png'
import { 
  HomeIcon, 
  PlusCircleIcon, 
  CogIcon 
} from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-300 to-blue-800 shadow-md">
      <div className="container mx-auto px-20 py-4 flex justify-between items-center">
        
        <div className="text-4xl flex font-bold text-blue-900">
        ThinkFAQ
        
        </div>

        
        <div className="hidden md:flex space-x-6">
          <NavLink to="/"  label="FAQ Dashboard" />
          <NavLink to="/create"  label="Create FAQ" />
          <NavLink to="/admin"  label="Admin" />
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <MobileNavLinks />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 text-white hover:bg-blue-700 px-4 py-2 rounded transition duration-200"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLinks = () => (
  <div className="px-4 pt-2 pb-4 space-y-2 bg-grey">
    <NavLink to="/"  label="Dashboard" />
    <NavLink to="/create" label="Create FAQ" />
    <NavLink to="/admin"  label="Admin" />
  </div>
);

export default Navbar;
