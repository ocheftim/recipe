// src/components/Navigation.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/',
    icon: '/Toque_Logo_Black.png',
    label: 'Dashboard',
    alt: 'Dashboard Icon',
  },
  {
    to: '/recipes',
    icon: '/RecipesIcon.svg',
    label: 'Recipes',
    alt: 'Recipes Icon',
  },
  {
    to: '/ingredients',
    icon: '/IngredientsIcon.svg',
    label: 'Ingredients',
    alt: 'Ingredients Icon',
  },
  {
    to: '/menus',
    icon: '/MenusIcon.svg',
    label: 'Menus',
    alt: 'Menus Icon',
  },
  {
    to: '/recipe-books',
    icon: '/RecipeBooksIcon.svg',
    label: 'Recipe Books',
    alt: 'Recipe Books Icon',
  },
  {
    to: '/settings',
    icon: '/Toque_Logo_Gear.svg', // Updated settings icon
    label: 'Settings',
    alt: 'Settings Icon',
  },
];

const Navigation = () => {
  return (
    <nav className="h-screen w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 fixed top-0 left-0 z-50">
      {navItems.map((item, index) => (
        <NavLink
          to={item.to}
          key={index}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center mb-6 text-gray-600 hover:text-black ${
              isActive ? 'text-black font-semibold' : ''
            }`
          }
        >
          <img
            src={item.icon}
            alt={item.alt}
            className="w-10 h-10 mb-1 object-contain"
          />
          <span className="text-[10px] text-center">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
