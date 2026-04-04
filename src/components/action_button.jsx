import React from 'react'
import { Link } from 'react-router-dom'

export default function ActionButton({ label, icon: Icon, onClick, to, variant = 'indigo', className = '', fullWidth = false, iconAnimation = 'hover:rotate-90' }) {
  const baseClasses = `flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-bold transition-all shadow-xl shadow-opacity-20 active:scale-95 group 
  ${fullWidth ? 'w-full' : 'w-fit'}`;
  
  const variants = {
    indigo: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100 hover:shadow-indigo-200',
    green: 'bg-green-600 text-white hover:bg-green-700 shadow-emerald-100 hover:shadow-emerald-200',
    red: 'bg-red-600 text-white hover:bg-red-700 shadow-red-100 hover:shadow-red-200',
    ghost: 'bg-gray-100/50 text-gray-700 hover:bg-gray-100 shadow-none'
  };

  const content = (
    <>
      {Icon && <Icon size={20} className={`${iconAnimation} transition-transform duration-300`} />}
      <span>{label}</span>
    </>
  );

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
